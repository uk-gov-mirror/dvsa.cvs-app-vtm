import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	ControlContainer,
	FormControl,
	FormGroup,
	FormGroupDirective,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { DynamicFormsModule } from '@forms/dynamic-forms.module';
import { mockVehicleTechnicalRecord } from '@mocks/mock-vehicle-technical-record.mock';
import { ReferenceDataModelBase, ReferenceDataResourceType } from '@models/reference-data.model';
import { VehicleTypes } from '@models/vehicle-tech-record.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MultiOptionsService } from '@services/multi-options/multi-options.service';
import { ReferenceDataService } from '@services/reference-data/reference-data.service';
import { TechnicalRecordService } from '@services/technical-record/technical-record.service';
import { initialAppState } from '@store/index';
import { selectReferenceDataByResourceKey } from '@store/reference-data';
import { of } from 'rxjs';
import { BodySectionEditComponent } from '../body-section-edit.component';

const mockReferenceDataService = {
	addSearchInformation: jest.fn(),
	getTyreSearchReturn$: jest.fn(),
	getTyreSearchCriteria$: jest.fn(),
	loadReferenceDataByKeySearch: jest.fn(),
	loadTyreReferenceDataByKeySearch: jest.fn(),
	loadReferenceData: jest.fn(),
	getReferenceDataOptions: jest.fn(),
};

describe('BodySectionEditComponent', () => {
	let controlContainer: ControlContainer;
	let component: BodySectionEditComponent;
	let componentRef: ComponentRef<BodySectionEditComponent>;
	let fixture: ComponentFixture<BodySectionEditComponent>;
	let formGroupDirective: FormGroupDirective;
	let technicalRecordService: TechnicalRecordService;
	let store: MockStore;

	beforeEach(async () => {
		formGroupDirective = new FormGroupDirective([], []);
		formGroupDirective.form = new FormGroup<
			Partial<Record<keyof TechRecordType<'hgv' | 'car' | 'psv' | 'lgv' | 'trl'>, FormControl>>
		>({});
		const mockTechRecord = mockVehicleTechnicalRecord('hgv');

		await TestBed.configureTestingModule({
			declarations: [BodySectionEditComponent],
			imports: [DynamicFormsModule, FormsModule, ReactiveFormsModule],
			providers: [
				provideMockStore({ initialState: initialAppState }),
				provideHttpClient(),
				provideHttpClientTesting(),
				{ provide: ControlContainer, useValue: formGroupDirective },
				{ provide: ActivatedRoute, useValue: { params: of([{ id: 1 }]) } },
				TechnicalRecordService,
				{ provide: ReferenceDataService, useValue: mockReferenceDataService },
				ChangeDetectorRef,
				MultiOptionsService,
			],
		}).compileComponents();

		store = TestBed.inject(MockStore);
		controlContainer = TestBed.inject(ControlContainer);
		technicalRecordService = TestBed.inject(TechnicalRecordService);

		fixture = TestBed.createComponent(BodySectionEditComponent);
		component = fixture.componentInstance;
		componentRef = fixture.componentRef;
		componentRef.setInput('techRecord', mockTechRecord);
		component.form.reset();
		fixture.detectChanges();
	});

	describe('ngOnInit', () => {
		it('should call addControlsBasedOffVehicleType', () => {
			const addControlsBasedOffVehicleTypeSpy = jest.spyOn(component, 'addControlsBasedOffVehicleType');
			component.ngOnInit();
			expect(addControlsBasedOffVehicleTypeSpy).toHaveBeenCalled();
		});

		it('should attach all form controls to parent', () => {
			const parent = controlContainer.control as FormGroup;
			component.ngOnInit();
			expect(parent.controls).toEqual(component.form.controls);
		});

		it('should call loadOptions', () => {
			const loadOptionsSpy = jest.spyOn(component, 'loadOptions');
			component.ngOnInit();
			expect(loadOptionsSpy).toHaveBeenCalled();
		});
		it('should patch the form when dtpNumber changes', () => {
			const form = new FormGroup({
				techRecord_brakes_dtpNumber: new FormControl(''),
			});
			const spy = jest.spyOn(form.get('techRecord_brakes_dtpNumber')!.valueChanges, 'subscribe');
			jest.spyOn(component, 'handleDTpNumberChange');
			const mockTechRecord = mockVehicleTechnicalRecord('psv');
			mockTechRecord.techRecord_vehicleType = VehicleTypes.PSV;
			componentRef.setInput('techRecord', mockTechRecord);
			component.form = form;
			component.ngOnInit();

			form.patchValue({
				techRecord_brakes_dtpNumber: '1234',
			});
			// form.updateValueAndValidity({ onlySelf: false, emitEvent: true });
			expect(spy).toHaveBeenCalled();
			expect(component.handleDTpNumberChange).toHaveBeenCalled();
		});
	});

	describe('handleDTpNumberChange', () => {
		it('should patch the form and call cdr.detectChanges', () => {
			let psvMake: ReferenceDataModelBase;
			store
				.select(selectReferenceDataByResourceKey(ReferenceDataResourceType.PsvMake, '1234'))
				.subscribe((value: ReferenceDataModelBase) => {
					const cdrSpy = jest.spyOn(component.cdr, 'detectChanges');
					const formSpy = jest.spyOn(component.form, 'patchValue');
					psvMake = value;
					component.handleDTpNumberChange(psvMake);
					expect(cdrSpy).toHaveBeenCalled();
					expect(formSpy).toHaveBeenCalled();
				});
		});
	});

	describe('ngOnDestroy', () => {
		it('should detach all form controls from parent', () => {
			const parent = controlContainer.control as FormGroup;
			component.ngOnDestroy();
			expect(Object.keys(parent.controls)).toEqual([]);
		});

		it('should complete destroy$ subject', () => {
			const completeSpy = jest.spyOn(component.destroy$, 'complete');
			component.ngOnDestroy();
			expect(completeSpy).toHaveBeenCalled();
		});

		it('should emit true to destroy$ subject', () => {
			let emittedValue: boolean | undefined;
			component.destroy$.subscribe((value) => (emittedValue = value));
			component.ngOnDestroy();
			expect(emittedValue).toBe(true);
		});
	});
});
