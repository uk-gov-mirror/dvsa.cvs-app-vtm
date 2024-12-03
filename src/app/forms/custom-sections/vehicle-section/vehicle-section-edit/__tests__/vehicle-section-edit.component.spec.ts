import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	AbstractControl,
	ControlContainer,
	FormControl,
	FormGroup,
	FormGroupDirective,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehicleClassDescription } from '@dvsa/cvs-type-definitions/types/v3/tech-record/enums/vehicleClassDescription.enum.js';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { VehicleSectionEditComponent } from '@forms/custom-sections/vehicle-section/vehicle-section-edit/vehicle-section-edit.component';
import { DynamicFormsModule } from '@forms/dynamic-forms.module';
import { mockVehicleTechnicalRecord } from '@mocks/mock-vehicle-technical-record.mock';
import {
	ALL_VEHICLE_CLASS_DESCRIPTION_OPTIONS,
	PSV_EU_VEHICLE_CATEGORY_OPTIONS,
	TRL_VEHICLE_CONFIGURATION_OPTIONS,
} from '@models/options.model';
import { V3TechRecordModel, VehicleSizes, VehicleTypes } from '@models/vehicle-tech-record.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TechnicalRecordService } from '@services/technical-record/technical-record.service';
import { initialAppState } from '@store/index';
import { of } from 'rxjs';

describe('VehicleSectionEditComponent', () => {
	let controlContainer: ControlContainer;
	let component: VehicleSectionEditComponent;
	let componentRef: ComponentRef<VehicleSectionEditComponent>;
	let fixture: ComponentFixture<VehicleSectionEditComponent>;
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
			declarations: [VehicleSectionEditComponent],
			imports: [DynamicFormsModule, FormsModule, ReactiveFormsModule],
			providers: [
				provideMockStore({ initialState: initialAppState }),
				provideHttpClient(),
				provideHttpClientTesting(),
				{ provide: ControlContainer, useValue: formGroupDirective },
				{ provide: ActivatedRoute, useValue: { params: of([{ id: 1 }]) } },
				TechnicalRecordService,
			],
		}).compileComponents();

		store = TestBed.inject(MockStore);
		controlContainer = TestBed.inject(ControlContainer);
		technicalRecordService = TestBed.inject(TechnicalRecordService);

		fixture = TestBed.createComponent(VehicleSectionEditComponent);
		component = fixture.componentInstance;
		componentRef = fixture.componentRef;
		componentRef.setInput('techRecord', mockTechRecord);
		component.form.reset();
		fixture.detectChanges();
	});

	describe('ngOnInit', () => {
		it('should attach its form to its parent form', () => {
			const vehicleTypeControlsSpy = jest.spyOn(component, 'addControlsBasedOffVehicleType');
			const parentFormSpy = jest.spyOn(controlContainer.control as FormGroup, 'addControl');
			component.ngOnInit();
			expect(vehicleTypeControlsSpy).toHaveBeenCalled();
			expect(parentFormSpy).toHaveBeenCalled();
		});
	});

	describe('ngOnDestroy', () => {
		it('should unsubscribe from all subscriptions', () => {
			const spy = jest.spyOn(component.destroy$, 'complete');
			component.ngOnDestroy();
			expect(spy).toHaveBeenCalled();
		});

		it('should detach its form from its parent form', () => {
			const spy = jest.spyOn(controlContainer.control as FormGroup, 'removeControl');
			component.ngOnDestroy();
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('getVehicleType', () => {
		it('should return the vehicle type', () => {
			const mockTechRecord = { techRecord_vehicleType: VehicleTypes.HGV } as V3TechRecordModel;
			jest.spyOn(component.technicalRecordService, 'getVehicleTypeWithSmallTrl').mockReturnValue(VehicleTypes.HGV);
			componentRef.setInput('techRecord', mockTechRecord);
			expect(component.getVehicleType()).toBe(VehicleTypes.HGV);
		});

		it('should return the small trailer type', () => {
			const mockTechRecord = {
				techRecord_vehicleType: VehicleTypes.TRL,
				techRecord_euVehicleCategory: 'o1',
			} as V3TechRecordModel;
			jest.spyOn(component.technicalRecordService, 'getVehicleTypeWithSmallTrl').mockReturnValue(VehicleTypes.HGV);
			componentRef.setInput('techRecord', mockTechRecord);
			expect(component.getVehicleType()).toBe(VehicleTypes.HGV);
		});
	});

	describe('shouldDisplayFormControl', () => {
		it('should return true if the form control exists', () => {
			component.form.patchValue({ techRecord_vehicleType: VehicleTypes.HGV });
			const result = component.shouldDisplayFormControl('techRecord_vehicleType');
			expect(result).toBe(true);
		});

		it('should return false if the form control does not exist', () => {
			component.form = new FormGroup({});
			const result = component.shouldDisplayFormControl('techRecord_vehicleType');
			expect(result).toBe(false);
		});
	});

	describe('get EUCategoryOptions', () => {
		it('should return the eu category that belongs to the vehicle type', () => {
			const mockTechRecord = { techRecord_vehicleType: VehicleTypes.PSV } as V3TechRecordModel;
			componentRef.setInput('techRecord', mockTechRecord);
			expect(component.EUCategoryOptions).toEqual(PSV_EU_VEHICLE_CATEGORY_OPTIONS);
		});
	});

	describe('get vehicleClassDescriptionOptions', () => {
		it('should return the class descriptions that belong to the vehicle type', () => {
			const mockTechRecord = { techRecord_vehicleType: VehicleTypes.MOTORCYCLE } as V3TechRecordModel;
			componentRef.setInput('techRecord', mockTechRecord);
			expect(component.vehicleClassDescriptionOptions).toEqual(ALL_VEHICLE_CLASS_DESCRIPTION_OPTIONS);
		});
	});

	describe('get vehicleConfigurationOptions', () => {
		it('should return the configuration options based off vehicle type', () => {
			const mockTechRecord = { techRecord_vehicleType: VehicleTypes.TRL } as V3TechRecordModel;
			componentRef.setInput('techRecord', mockTechRecord);
			expect(component.vehicleConfigurationOptions).toEqual(TRL_VEHICLE_CONFIGURATION_OPTIONS);
		});
	});

	describe('get controlsBasedOffVehicleType', () => {
		it('should return the controls that belong to the matched vehicle type', () => {
			const mockTechRecord = { techRecord_vehicleType: VehicleTypes.PSV } as V3TechRecordModel;
			componentRef.setInput('techRecord', mockTechRecord);
			jest.spyOn(technicalRecordService, 'getVehicleTypeWithSmallTrl').mockReturnValue(VehicleTypes.PSV);
			expect(component.controlsBasedOffVehicleType).toEqual(expect.objectContaining(component.psvFields));
		});
	});

	describe('get shouldShowSubclass', () => {
		it('should return true if vehicle is either small trl/lgv/car', () => {
			jest.spyOn(component, 'getVehicleType').mockReturnValue(VehicleTypes.LGV);
			expect(component.shouldShowSubclass).toBe(true);
		});

		it('should return false if vehicle is not either small trl/lgv/car', () => {
			jest.spyOn(component, 'getVehicleType').mockReturnValue(VehicleTypes.HGV);
			expect(component.shouldShowSubclass).toBe(false);
		});
	});

	describe('get shouldShowClass', () => {
		it('should return true if vehicle is either small trl/hgv/trl/motorcycle', () => {
			jest.spyOn(component, 'getVehicleType').mockReturnValue(VehicleTypes.HGV);
			expect(component.shouldShowClass).toBe(true);
		});

		it('should return false if vehicle is not either small trl/hgv/trl/motorcycle', () => {
			jest.spyOn(component, 'getVehicleType').mockReturnValue(VehicleTypes.LGV);
			expect(component.shouldShowClass).toBe(false);
		});
	});

	describe('addControlsBasedOffVehicleType', () => {
		it('should add vehicle specific controls to the form', () => {
			jest.spyOn(component, 'controlsBasedOffVehicleType', 'get').mockReturnValue(component.motorcycleFields);
			const mockTechRecord = { techRecord_vehicleType: VehicleTypes.MOTORCYCLE } as V3TechRecordModel;
			componentRef.setInput('techRecord', mockTechRecord);
			expect(component.form.controls).not.toHaveProperty('techRecord_numberOfWheelsDriven');
			component.addControlsBasedOffVehicleType();
			expect(component.controlsBasedOffVehicleType).toHaveBeenCalled();
			expect(component.form.controls).toHaveProperty('techRecord_numberOfWheelsDriven');
		});
	});

	describe('handleUpdateFunctionCode', () => {
		it('should ', () => {});
	});

	describe('handlePsvPassengersChange', () => {
		it('should set vehicle size to SMALL and class to SmallPsvIeLessThanOrEqualTo22Seats when total passengers are less than or equal to 22', () => {
			const control = new FormControl(10);
			// component.form.patchValue({
			// 	techRecord_seatsUpperDeck: 5,
			// 	techRecord_seatsLowerDeck: 10,
			// 	techRecord_standingCapacity: 5,
			// });
			const validatorFn = component.handlePsvPassengersChange();
			validatorFn(control);
			expect(component.form.get('techRecord_vehicleSize')?.value).toBe(VehicleSizes.SMALL);
			expect(component.form.get('techRecord_vehicleClass_description')?.value).toBe(
				VehicleClassDescription.SmallPsvIeLessThanOrEqualTo22Seats
			);
		});

		it('should set vehicle size to LARGE and class to LargePsvIeGreaterThan23Seats when total passengers are greater than 22', () => {
			const control = new FormControl(30) as AbstractControl;
			// component.form.patchValue({
			// 	techRecord_seatsUpperDeck: 10,
			// 	techRecord_seatsLowerDeck: 10,
			// 	techRecord_standingCapacity: 10,
			// });
			const validatorFn = component.handlePsvPassengersChange();
			validatorFn(control);
			expect(component.form.get('techRecord_vehicleSize')?.value).toBe(VehicleSizes.LARGE);
			expect(component.form.get('techRecord_vehicleClass_description')?.value).toBe(
				VehicleClassDescription.LargePsvIeGreaterThan23Seats
			);
		});

		it('should mark control as pristine after validation', () => {
			const control = new FormControl(10);
			control.markAsDirty();
			// component.form.patchValue({
			// 	techRecord_seatsUpperDeck: 5,
			// 	techRecord_seatsLowerDeck: 10,
			// 	techRecord_standingCapacity: 5,
			// });
			const validatorFn = component.handlePsvPassengersChange();
			validatorFn(control);
			expect(control.pristine).toBe(true);
		});
	});
});
