import {
	AfterViewInit,
	Component,
	Injector,
	OnDestroy,
	forwardRef,
	inject,
	input,
	model,
	signal,
	viewChild,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ReplaySubject, startWith, takeUntil } from 'rxjs';
import { NgxTypeaheadComponent } from './ngx-typeahead.component';

@Component({
	selector: 'govuk-typeahead',
	templateUrl: './typeahead.component.html',
	imports: [FormsModule, NgxTypeaheadComponent],
	styleUrls: ['./typeahead.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TypeaheadComponent),
			multi: true,
		},
	],
})
export class TypeaheadComponent<T> implements ControlValueAccessor, OnDestroy, AfterViewInit {
	id$ = input.required<string>({ alias: 'id' });
	name$ = input<string>('', { alias: 'name' });
	hint$ = input<string>('', { alias: 'hint' });
	label$ = input<string>('', { alias: 'label' });
	width$ = input<GovukWidth>('govuk-!-width-full', { alias: 'width' });
	options$ = input.required<TypeaheadOption<T>[]>({ alias: 'options' });
	debounce$ = input<number>(500, { alias: 'debounce' });
	placeholder$ = input<string>('', { alias: 'placeholder' });
	groupError$ = input<boolean>(false, { alias: 'groupError' });
	inputRef$ = viewChild<NgxTypeaheadComponent>('typeahead');

	value = model<string>();
	disabled = model<boolean>(false);

	injector = inject(Injector);

	error$ = signal<string>('');
	destroy$ = new ReplaySubject<boolean>(1);

	get control() {
		return this.injector.get(NgControl);
	}

	onChange: (value: any) => void = () => {};
	onTouched: () => void = () => {};

	writeValue(obj: any): void {
		this.value.set(obj);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}

	onBlur() {
		const inputRef = this.inputRef$();

		// if the value is an empty string, set its value to null, mark as invalid
		if (this.value() === '') {
			return this.onChange(null);
		}

		// if the value is not in the options, set it to null
		if (!this.options$().find((option) => option.value === this.value())) {
			return this.onChange(null);
		}

		if (inputRef?.showSuggestions()) return;
		this.onTouched();
	}

	handleSelection(event: TypeaheadOption<T>) {
		this.writeValue(event.value);
		this.onChange(event.value);
	}

	ngAfterViewInit(): void {
		const control = this.injector.get(NgControl);
		if (control.control?.statusChanges) {
			control.control.statusChanges
				.pipe(startWith(control.control.status), takeUntil(this.destroy$))
				.subscribe((status) => {
					if (status === 'VALID') {
						this.error$.set('');
					}

					if (status === 'INVALID' && control.control?.errors) {
						this.error$.set(Object.values(control.control.errors || {})[0]);
					}
				});
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}

export type GovukWidth =
	| 'govuk-input--width-20'
	| 'govuk-input--width-10'
	| 'govuk-input--width-5'
	| 'govuk-input--width-4'
	| 'govuk-input--width-3'
	| 'govuk-input--width-2'
	| 'govuk-!-width-full'
	| 'govuk-!-width-three-quarters'
	| 'govuk-!-width-two-thirds'
	| 'govuk-!-width-one-half'
	| 'govuk-!-width-one-third'
	| 'govuk-!-width-one-quarter'
	| (string & {});

export type TypeaheadOption<T> = {
	value: T;
	label: string;
	hint?: string;
};
