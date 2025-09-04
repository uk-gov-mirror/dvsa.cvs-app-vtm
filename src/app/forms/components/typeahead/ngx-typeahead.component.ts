import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
	inject,
	input,
	model,
	output,
} from '@angular/core';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { concat, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { Key } from './typeahead.models';
import {
	NO_INDEX,
	createParamsForQuery,
	hasCharacters,
	isEnterKey,
	isEscapeKey,
	isIndexActive,
	resolveApiMethod,
	resolveItemValue,
	resolveNextIndex,
	toFormControlValue,
	toJsonpFinalResults,
	toJsonpSingleResult,
	validateArrowKeys,
	validateNonCharKeyCode,
} from './typeahead.utils';

@Component({
	selector: '[ngxTypeahead]',
	templateUrl: './ngx-typeahead.component.html',
	styleUrls: ['./ngx-typeahead.component.scss'],
	imports: [CommonModule],
})
export class NgxTypeaheadComponent implements OnInit, OnDestroy {
	showSuggestions = model<boolean>(false);
	results: string[] = [];
	taItemTpl = input.required<TemplateRef<any>>();
	id$ = input.required<string>({ alias: 'id' });
	taUrl = input('');
	taParams = input({});
	taQueryParam = input('q');
	taCallbackParamValue = input<any>();
	taApi = input('jsonp');
	taApiMethod = input('get');
	taList = input<any[]>([]);
	taListItemField = input([]);
	taListItemLabel = input('');
	taDebounce = input(300);
	taAllowEmpty = input(false);
	taCaseSensitive = input(false);
	taDisplayOnFocus = input(false);
	taSelected = output<any>();

	document = inject(DOCUMENT);

	@ViewChild(TemplateRef, { static: true })
	suggestionsTplRef!: TemplateRef<any>;

	suggestionIndex = -1;
	private subscriptions: Subscription[] = [];
	private activeResult = '';
	private searchQuery = '';
	private selectedItem: any = {};
	private resultsAsItems: any[] = [];
	private keydown$ = new Subject<KeyboardEvent>();
	private keyup$ = new Subject<KeyboardEvent>();

	constructor(
		public element: ElementRef,
		private viewContainer: ViewContainerRef,
		private http: HttpClient,
		private cdr: ChangeDetectorRef
	) {}

	@HostListener('document:keydown', ['$event'])
	handleKeydown(event: KeyboardEvent) {
		if (isEscapeKey(event) && this.showSuggestions()) {
			this.hideSuggestions();
			event.preventDefault();
		}

		if (validateArrowKeys(event.code) && this.showSuggestions()) {
			event.preventDefault();
			event.stopPropagation();

			this.keydown$.next(event);
		}
	}

	@HostListener('keydown', ['$event'])
	handleEsc(event: KeyboardEvent) {
		if (isEscapeKey(event)) {
			this.hideSuggestions();
			event.preventDefault();
		}

		this.keydown$.next(event);
	}

	@HostListener('keyup', ['$event'])
	onkeyup(event: KeyboardEvent) {
		event.preventDefault();
		event.stopPropagation();
		this.keyup$.next(event);
	}

	@HostListener('click')
	onClick() {
		if (this.taDisplayOnFocus()) {
			this.displaySuggestions();
		}
	}

	ngOnInit() {
		this.assignResults(this.taList());
		this.filterEnterEvent(this.keydown$);
		this.listenAndSuggest(this.keyup$);
		this.navigateWithArrows(this.keydown$);
		this.renderTemplate();
	}

	ngOnDestroy() {
		this.keydown$.complete();
		this.keyup$.complete();
	}

	renderTemplate() {
		if (!this.suggestionsTplRef) {
			console.error('NO NGXTA Template Found. Requires NG9');
			return;
		}
		this.viewContainer.createEmbeddedView(this.suggestionsTplRef);
		this.cdr.markForCheck();
	}

	listenAndSuggest(obs: Subject<KeyboardEvent>) {
		obs
			.pipe(
				// tslint:disable-next-line: deprecation
				filter((e: KeyboardEvent) => validateNonCharKeyCode(e.code)),
				map(toFormControlValue),
				debounceTime(this.taDebounce()),
				// tslint:disable-next-line: deprecation
				concat(),
				distinctUntilChanged(),
				filter((query: string) => this.taAllowEmpty() || hasCharacters(query)),
				tap((query: string) => (this.searchQuery = query)),
				switchMap((query: string) => this.suggest(query))
			)
			.subscribe((results: string[] | any) => {
				this.assignResults(results);
				this.updateIndex(Key.ArrowDown);
				this.displaySuggestions();
			});
	}

	assignResults(results: any[]) {
		const labelForDisplay = this.taListItemLabel();
		this.resultsAsItems = results;
		this.results = results.map((item: string | any) => {
			return labelForDisplay ? item[labelForDisplay] : item;
		});
		this.suggestionIndex = NO_INDEX;
		if (!results || !results.length) {
			this.activeResult = this.searchQuery;
		}
	}

	filterEnterEvent(elementObs: Subject<KeyboardEvent>) {
		elementObs.pipe(filter(isEnterKey)).subscribe((event: KeyboardEvent) => {
			this.handleSelectSuggestion(this.activeResult);
		});
	}

	navigateWithArrows(elementObs: Subject<KeyboardEvent>) {
		elementObs
			.pipe(
				map((e: any) => e.key),
				filter((key: Key) => validateArrowKeys(key))
			)
			.subscribe((key: Key) => {
				this.updateIndex(key);
				this.displaySuggestions();
			});
	}

	updateIndex(keyCode: string) {
		this.suggestionIndex = resolveNextIndex(this.suggestionIndex, keyCode === Key.ArrowDown, this.results.length);

		if (this.suggestionIndex === NO_INDEX) return;
		this.document.getElementById(`${this.id$()}-item-${this.suggestionIndex}`)?.closest('button')?.focus();
	}

	displaySuggestions() {
		if (this.showSuggestions()) return;
		this.suggestionIndex = NO_INDEX;
		this.showSuggestions.set(true);
		this.cdr.markForCheck();
	}

	suggest(query: string) {
		const list = this.taList();
		return list.length ? this.createListSource(list, query) : this.request(query);
	}

	/**
	 * peforms a jsonp/http request to search with query and params
	 * @param query the query to search from the remote source
	 */
	request(query: string) {
		const url = this.taUrl();
		const queryParam = this.taQueryParam();
		const searchConfig = createParamsForQuery(query, queryParam, this.taParams());
		const options = {
			params: searchConfig,
		};
		const isJsonpApi = this.taApi() === 'jsonp';
		return isJsonpApi ? this.requestJsonp(url, options, this.taCallbackParamValue()) : this.requestHttp(url, options);
	}

	requestHttp(url: string, options: any) {
		const apiMethod = resolveApiMethod(this.taApiMethod());
		// @ts-ignore
		return this.http[apiMethod](url, options);
	}

	requestJsonp(url: string, options: any, callback = 'callback') {
		const params = options.params.toString();
		return this.http.jsonp(`${url}?${params}`, callback).pipe(map(toJsonpSingleResult), map(toJsonpFinalResults));
	}

	markIsActive(index: number, result: string) {
		const isActive = isIndexActive(index, this.suggestionIndex);
		if (isActive) {
			this.activeResult = result;
		}
		return isActive;
	}

	handleSelectionClick(suggestion: string, index: number) {
		this.suggestionIndex = index;
		this.handleSelectSuggestion(suggestion);
	}

	handleSelectSuggestion(suggestion: string) {
		const result = this.resultsAsItems.length ? this.resultsAsItems[this.suggestionIndex] : suggestion;
		this.hideSuggestions();
		const resolvedResult = this.suggestionIndex === NO_INDEX ? this.searchQuery : result;
		this.taSelected.emit(resolvedResult);
	}

	hideSuggestions() {
		this.showSuggestions.set(false);
	}

	hasItemTemplate() {
		return this.taItemTpl !== undefined;
	}

	createListSource(list: any[], query: string): Observable<string[]> {
		const caseSensitive = this.taCaseSensitive();
		const sanitizedQuery = caseSensitive ? query : query.toLowerCase();
		const fieldsToExtract = this.taListItemField();
		return of(
			list.filter((item: string | any) => {
				return resolveItemValue(item, fieldsToExtract, caseSensitive).includes(sanitizedQuery);
			})
		);
	}
}
