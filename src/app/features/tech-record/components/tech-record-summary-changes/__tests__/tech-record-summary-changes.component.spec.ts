import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-verb';
import { DynamicFormsModule } from '@forms/dynamic-forms.module';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterService } from '@services/router/router.service';
import { UserService } from '@services/user-service/user-service';
import { SharedModule } from '@shared/shared.module';
import { initialAppState } from '@store/index';
import {
	amendVrmSuccess,
	editingTechRecord,
	selectTechRecordChanges,
	selectTechRecordDeletions,
	techRecord,
} from '@store/technical-records';
import { ReplaySubject, of } from 'rxjs';
import { TechRecordSummaryChangesComponent } from '../tech-record-summary-changes.component';

let actions$: ReplaySubject<Action>;
let store: MockStore;
describe('TechRecordSummaryChangesComponent', () => {
	let component: TechRecordSummaryChangesComponent;
	let fixture: ComponentFixture<TechRecordSummaryChangesComponent>;
	let router: Router;

	beforeEach(async () => {
		actions$ = new ReplaySubject<Action>();
		await TestBed.configureTestingModule({
			declarations: [TechRecordSummaryChangesComponent],
			imports: [DynamicFormsModule, HttpClientTestingModule, RouterTestingModule, SharedModule],
			providers: [
				provideMockActions(() => actions$),
				provideMockStore({ initialState: initialAppState }),
				{
					provide: UserService,
					useValue: {
						name$: of('tester'),
					},
				},
				{
					provide: RouterService,
					useValue: {
						getRouteNestedParam$(param: string) {
							if (param === 'systemNumber') return of('123456');
							if (param === 'createdTimestamp') return of('123123123');
							return of('');
						},
					},
				},
			],
		}).compileComponents();
		router = TestBed.inject(Router);
		fixture = TestBed.createComponent(TechRecordSummaryChangesComponent);
		store = TestBed.inject(MockStore);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('navigateUponSuccess', () => {
		it('should handle state management', () => {
			const spy = jest.spyOn(component.actions$, 'pipe');
			component.navigateUponSuccess();
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('ngOnInit', () => {
		it('should call navigateOnSuccess and initSubscriptions', () => {
			const navigateOnSuccessSpy = jest.spyOn(component, 'navigateUponSuccess');
			const initSubscriptionsSpy = jest.spyOn(component, 'initSubscriptions');
			component.ngOnInit();
			expect(navigateOnSuccessSpy).toHaveBeenCalled();
			expect(initSubscriptionsSpy).toHaveBeenCalled();
		});
		it('should navigate when updateRecordSuccess dispatched', () => {
			const navigateSpy = jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));

			component.ngOnInit();

			actions$.next(
				amendVrmSuccess({
					vehicleTechRecord: {
						createdTimestamp: 'now',
						vin: 'testVin',
						systemNumber: 'testNumber',
					} as TechRecordType<'get'>,
				})
			);

			expect(navigateSpy).toHaveBeenCalled();
		});
	});

	describe('initSubscriptions', () => {
		let spy: unknown;

		beforeEach(() => {
			spy = jest.spyOn(store, 'select');
			component.ngOnInit();
		});
		it('should grab techRecord from the store', () => {
			expect(spy).toHaveBeenCalledWith(techRecord);
		});
		it('should grab editingTechRecord from the store', () => {
			expect(spy).toHaveBeenCalledWith(editingTechRecord);
		});
		it('should grab selectTechRecordChanges from the store', () => {
			expect(spy).toHaveBeenCalledWith(selectTechRecordChanges);
		});
		it('should grab selectTechRecordDeletions from the store', () => {
			expect(spy).toHaveBeenCalledWith(selectTechRecordDeletions);
		});
	});

	describe('ngOnDestroy', () => {
		it('should call the destroy.next and destroy.complete', () => {
			const nextSpy = jest.spyOn(component.destroy$, 'next');
			const completeSpy = jest.spyOn(component.destroy$, 'complete');
			component.ngOnDestroy();
			expect(nextSpy).toHaveBeenCalled();
			expect(completeSpy).toHaveBeenCalled();
		});
	});

	describe('submit', () => {
		it('should dispatch clearADRDetailsBeforeUpdate', () => {
			const dispatch = jest.spyOn(store, 'dispatch');
			component.submit();
			expect(dispatch).toHaveBeenCalled();
		});

		it('should dispatch updateTechRecords', () => {
			const dispatchSpy = jest.spyOn(store, 'dispatch');
			component.submit();
			expect(dispatchSpy).toHaveBeenCalled();
			expect(dispatchSpy).toHaveBeenCalledWith({
				systemNumber: '123456',
				createdTimestamp: '123123123',
				type: '[Technical Record Service] updateTechRecords',
			});
		});
	});

	describe('cancel', () => {
		it('should call globalErrorService.clearErrors and then navigate', () => {
			const clearErrorsSpy = jest.spyOn(component.globalErrorService, 'clearErrors');
			const navigateSpy = jest.spyOn(component.router, 'navigate');
			component.cancel();
			expect(clearErrorsSpy).toHaveBeenCalled();
			expect(navigateSpy).toHaveBeenCalled();
		});
	});
});
