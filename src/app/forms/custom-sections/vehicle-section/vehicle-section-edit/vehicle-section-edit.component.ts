import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import {
	AbstractControl,
	ControlContainer,
	FormBuilder,
	FormControl,
	FormGroup,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';
import { TagType } from '@components/tag/tag.component';
import { EUVehicleCategory } from '@dvsa/cvs-type-definitions/types/v3/tech-record/enums/euVehicleCategory.enum.js';
import { EUVehicleCategory as HGVCategories } from '@dvsa/cvs-type-definitions/types/v3/tech-record/enums/euVehicleCategoryHgv.enum.js';
import { EUVehicleCategory as PSVCategories } from '@dvsa/cvs-type-definitions/types/v3/tech-record/enums/euVehicleCategoryPsv.enum.js';
import { FuelPropulsionSystem } from '@dvsa/cvs-type-definitions/types/v3/tech-record/get/hgv/complete';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { getOptionsFromEnum } from '@forms/utils/enum-map';
import { CommonValidatorsService } from '@forms/validators/common-validators.service';
import { CouplingTypeOptions } from '@models/coupling-type-enum';
import { MultiOption, MultiOptions } from '@models/options.model';
import { EmissionStandard } from '@models/test-types/emissions.enum';
import {
	HgvPsvVehicleConfiguration,
	TrlVehicleConfiguration,
	VehicleConfiguration,
} from '@models/vehicle-configuration.enum';
import { VehicleSize } from '@models/vehicle-size.enum';
import {
	FrameDescriptions,
	FuelTypes,
	V3TechRecordModel,
	VehicleSubclass,
	VehicleTypes,
} from '@models/vehicle-tech-record.model';
import { Store } from '@ngrx/store';
import { FormNodeWidth, TagTypeLabels } from '@services/dynamic-forms/dynamic-form.types';
import { TechnicalRecordService } from '@services/technical-record/technical-record.service';
import { ReplaySubject } from 'rxjs';

type VehicleSectionForm = Partial<Record<keyof TechRecordType<'hgv' | 'car' | 'psv' | 'lgv' | 'trl'>, FormControl>>;

@Component({
	selector: 'app-vehicle-section-edit',
	templateUrl: './vehicle-section-edit.component.html',
	styleUrls: ['./vehicle-section-edit.component.scss'],
})
export class VehicleSectionEditComponent implements OnInit, OnDestroy {
	protected readonly CouplingTypeOptions = CouplingTypeOptions;
	protected readonly FormNodeWidth = FormNodeWidth;
	protected readonly TagType = TagType;
	protected readonly TagTypeLabels = TagTypeLabels;
	protected readonly VehicleTypes = VehicleTypes;
	fb = inject(FormBuilder);
	store = inject(Store);
	controlContainer = inject(ControlContainer);
	commonValidators = inject(CommonValidatorsService);
	technicalRecordService = inject(TechnicalRecordService);
	techRecord = input.required<V3TechRecordModel>();

	destroy$ = new ReplaySubject<boolean>(1);

	form = this.fb.group<VehicleSectionForm>(
		{
			// base properties that belong to all vehicle types
			techRecord_euVehicleCategory: this.fb.control<string | null>(null),
			techRecord_manufactureYear: this.fb.control<number | null>(null, [
				this.commonValidators.min(1000, 'Year of manufacture must be greater than or equal to 1000'),
				this.commonValidators.pastYear('Year of manufacture must be the current or a past year'),
			]),
			techRecord_statusCode: this.fb.control<string | null>(null),
			techRecord_vehicleConfiguration: this.fb.control<VehicleConfiguration | null>(null, [this.updateFunctionCode]),
			techRecord_vehicleType: this.fb.control<VehicleTypes | null>({ value: null, disabled: true }),
		},
		{ validators: [] }
	);

	ExemptOrNotOptions: MultiOption[] = [
		{ value: true, label: 'Exempt' },
		{ value: false, label: 'Not exempt' },
	];

	euroStandardOptions = [
		{ label: '0.10 g/kWh Euro III PM', value: '0.10 g/kWh Euro 3 PM' },
		...getOptionsFromEnum(EmissionStandard),
	];

	fuelPropulsionSystemOptions = [...getOptionsFromEnum(FuelTypes)];

	YesNoOptions = [
		{ value: true, label: 'Yes' },
		{ value: false, label: 'No' },
	];

	ngOnInit(): void {
		this.addControlsBasedOffVehicleType();

		// Attach all form controls to parent
		const parent = this.controlContainer.control;
		if (parent instanceof FormGroup) {
			for (const [key, control] of Object.entries(this.form.controls)) {
				parent.addControl(key, control, { emitEvent: false });
			}
		}
	}

	ngOnDestroy(): void {
		// Detach all form controls from parent
		const parent = this.controlContainer.control;
		if (parent instanceof FormGroup) {
			for (const key of Object.keys(this.form.controls)) {
				parent.removeControl(key, { emitEvent: false });
			}
		}

		// Clear subscriptions
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	get hgvFields(): Partial<Record<keyof TechRecordType<'hgv'>, FormControl>> {
		return {
			techRecord_alterationMarker: this.fb.control<boolean | null>(null),
			techRecord_departmentalVehicleMarker: this.fb.control<boolean | null>(null),
			techRecord_drawbarCouplingFitted: this.fb.control<boolean | null>(null),
			techRecord_emissionsLimit: this.fb.control<number | null>(null, [
				this.commonValidators.max(99, 'Emission limit (m-1) (plate value) must be less than or equal to 99'),
				this.commonValidators.pattern(/^\d*(\.\d{0,5})?$/, 'Emission limit (m-1) (plate value) Max 5 decimal places'),
			]),
			techRecord_euroStandard: this.fb.control<string | null>(null),
			techRecord_fuelPropulsionSystem: this.fb.control<FuelPropulsionSystem | null>(null),
			techRecord_offRoad: this.fb.control<boolean | null>(null),
			techRecord_roadFriendly: this.fb.control<boolean | null>(null),
			techRecord_speedLimiterMrk: this.fb.control<boolean | null>(null),
			techRecord_tachoExemptMrk: this.fb.control<boolean | null>(null),
			techRecord_vehicleClass_description: this.fb.control<string | null>(null, [
				this.commonValidators.required('Vehicle class is required'),
			]),
			techRecord_regnDate: this.fb.control<string | null>(null),
			techRecord_noOfAxles: this.fb.control<number | null>({ value: null, disabled: true }),
		};
	}

	get psvFields(): Partial<Record<keyof TechRecordType<'psv'>, FormControl>> {
		return {
			techRecord_speedLimiterMrk: this.fb.control<boolean | null>(null),
			techRecord_tachoExemptMrk: this.fb.control<boolean | null>(null),
			techRecord_euroStandard: this.fb.control<string | null>(null),
			techRecord_alterationMarker: this.fb.control<boolean | null>(null),
			techRecord_departmentalVehicleMarker: this.fb.control<boolean | null>(null),
			techRecord_emissionsLimit: this.fb.control<number | null>(null, [
				this.commonValidators.max(99, 'Emission limit (m-1) (plate value) must be less than or equal to 99'),
				this.commonValidators.pattern(/^\d*(\.\d{0,5})?$/, 'Emission limit (m-1) (plate value) Max 5 decimal places'),
			]),
			techRecord_fuelPropulsionSystem: this.fb.control<FuelPropulsionSystem | null>(null),
			techRecord_vehicleClass_description: this.fb.control<string | null>(null, [
				this.commonValidators.required('Vehicle class is required'),
			]),
			techRecord_seatsUpperDeck: this.fb.control<number | null>(null, [
				this.commonValidators.required('Upper deck is required'),
			]),
			techRecord_seatsLowerDeck: this.fb.control<number | null>(null, [
				this.commonValidators.required('Lower deck is required'),
			]),
			techRecord_standingCapacity: this.fb.control<number | null>(null, [
				this.commonValidators.required('Standing capacity is required'),
			]),
			techRecord_vehicleSize: this.fb.control<string | null>(null, [
				this.commonValidators.required('Vehicle size is required'),
			]),
			techRecord_numberOfSeatbelts: this.fb.control<number | null>(null, [
				this.commonValidators.max(99, 'Number of seatbelts must be less than or equal to 99'),
			]),
			techRecord_seatbeltInstallationApprovalDate: this.fb.control<string | null>(null, [
				this.commonValidators.pastDate('Seatbelt installation approval date / type approved must be in the past'),
			]),
			techRecord_regnDate: this.fb.control<string | null>(null),
			techRecord_noOfAxles: this.fb.control<number | null>({ value: null, disabled: true }),
		};
	}

	get trlFields(): Partial<Record<keyof TechRecordType<'trl'>, FormControl>> {
		return {
			techRecord_vehicleClass_description: this.fb.control<string | null>(null, [
				this.commonValidators.required('Vehicle class is required'),
			]),
			techRecord_alterationMarker: this.fb.control<boolean | null>(null),
			techRecord_departmentalVehicleMarker: this.fb.control<boolean | null>(null),
			techRecord_roadFriendly: this.fb.control<boolean | null>(null),
			techRecord_firstUseDate: this.fb.control<string | null>(null),
			techRecord_suspensionType: this.fb.control<string | null>(null),
			techRecord_couplingType: this.fb.control<string | null>(null),
			techRecord_maxLoadOnCoupling: this.fb.control<number | null>(null, [
				this.commonValidators.max(99999, 'Max load on coupling (optional) must be less than or equal to 99999'),
			]),
			techRecord_frameDescription: this.fb.control<string | null>(null),
			techRecord_regnDate: this.fb.control<string | null>(null),
			techRecord_noOfAxles: this.fb.control<number | null>({ value: null, disabled: true }),
			techRecord_manufactureMonth: this.fb.control<string | null>(null, [
				this.commonValidators.max(9999, 'Year of manufacture must be less than or equal to 9999'),
				this.commonValidators.min(1000, 'Year of manufacture must be greater than or equal to 1000'),
				this.commonValidators.xYearsAfterCurrent(
					1,
					`Year of manufacture must be equal to or before ${new Date().getFullYear() + 1}`
				),
			]),
		};
	}

	get smallTrlFields(): Partial<Record<any, FormControl>> {
		return {
			techRecord_vehicleSubclass: this.fb.control<string[] | null>(null),
			techRecord_manufactureMonth: this.fb.control<string | null>(null, [
				this.commonValidators.max(9999, 'Year of manufacture must be less than or equal to 9999'),
				this.commonValidators.min(1000, 'Year of manufacture must be greater than or equal to 1000'),
				this.commonValidators.xYearsAfterCurrent(
					1,
					`Year of manufacture must be equal to or before ${new Date().getFullYear() + 1}`
				),
			]),
			techRecord_vehicleClass_description: this.fb.control<string | null>(null, [
				this.commonValidators.required('Vehicle class is required'),
			]),
			techRecord_noOfAxles: this.fb.control<number | null>(null),
		};
	}

	get lgvAndCarFields(): Partial<Record<keyof TechRecordType<'lgv' | 'car'>, FormControl>> {
		return {
			techRecord_vehicleSubclass: this.fb.control<string[] | null>(null),
			techRecord_regnDate: this.fb.control<string | null>(null),
			techRecord_noOfAxles: this.fb.control<number | null>({ value: null, disabled: true }),
		};
	}

	// get motorcycleFields(): Partial<Record<keyof TechRecordType<'motorcycle'>, FormControl>> {
	get motorcycleFields(): Partial<Record<string, FormControl>> {
		return {
			techRecord_numberOfWheelsDriven: this.fb.control<number | null>(null),
			techRecord_vehicleClass_description: this.fb.control<string | null>(null, [
				this.commonValidators.required('Vehicle class is required'),
			]),
			techRecord_regnDate: this.fb.control<string | null>(null),
			techRecord_noOfAxles: this.fb.control<number | null>({ value: null, disabled: true }),
		};
	}

	updateFunctionCode(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (control?.parent) {
				const vehicleFunctionCode = control.parent.get('techRecord_functionCode');
				const functionCodes: Record<string, string> = {
					rigid: 'R',
					articulated: 'A',
					'semi-trailer': 'A',
				};

				if (vehicleFunctionCode && control.dirty) {
					vehicleFunctionCode.setValue(functionCodes[control.value]);
					control.markAsPristine();
				}
			}
			return null;
		};
	}

	get EUCategoryOptions() {
		switch (this.techRecord()?.techRecord_vehicleType.toLowerCase()) {
			case VehicleTypes.HGV:
				return getOptionsFromEnum(HGVCategories);
			case VehicleTypes.PSV:
				return getOptionsFromEnum(PSVCategories);
			case VehicleTypes.TRL:
			case VehicleTypes.SMALL_TRL:
			case VehicleTypes.LGV:
			case VehicleTypes.CAR:
			case VehicleTypes.MOTORCYCLE:
				return getOptionsFromEnum(EUVehicleCategory);
			default:
				return getOptionsFromEnum(EUVehicleCategory);
		}
	}

	get vehicleClassDescriptionOptions() {
		switch (this.techRecord()?.techRecord_vehicleType.toLowerCase()) {
			case VehicleTypes.HGV:
				return [{ label: 'heavy goods vehicle', value: 'heavy goods vehicle' }];
			case VehicleTypes.PSV:
				return [
					{
						label: 'small psv (ie: less than or equal to 22 passengers)',
						value: 'small psv (ie: less than or equal to 22 seats)',
					},
					{
						label: 'large psv(ie: greater than or equal to 23 passengers)',
						value: 'large psv(ie: greater than 23 seats)',
					},
				];
			case VehicleTypes.TRL:
			case VehicleTypes.SMALL_TRL:
			case VehicleTypes.LGV:
			case VehicleTypes.CAR:
				return null;
			case VehicleTypes.MOTORCYCLE:
				return [
					{ label: 'motorbikes over 200cc or with a sidecar', value: 'motorbikes over 200cc or with a sidecar' },
					{ label: 'not applicable', value: 'not applicable' },
					{
						label: 'small psv (ie: less than or equal to 22 passengers)',
						value: 'small psv (ie: less than or equal to 22 seats)',
					},
					{ label: 'motorbikes up to 200cc', value: 'motorbikes up to 200cc' },
					{ label: 'trailer', value: 'trailer' },
					{
						label: 'large psv(ie: greater than or equal to 23 passengers)',
						value: 'large psv(ie: greater than 23 seats)',
					},
					{ label: '3 wheelers', value: '3 wheelers' },
					{ label: 'heavy goods vehicle', value: 'heavy goods vehicle' },
					{ label: 'MOT class 4', value: 'MOT class 4' },
					{ label: 'MOT class 7', value: 'MOT class 7' },
					{ label: 'MOT class 5', value: 'MOT class 5' },
				];
			default:
				return null;
		}
	}

	get vehicleConfigurationOptions() {
		switch (this.techRecord()?.techRecord_vehicleType.toLowerCase()) {
			case VehicleTypes.HGV:
			case VehicleTypes.PSV:
				return getOptionsFromEnum(HgvPsvVehicleConfiguration);
			case VehicleTypes.TRL:
			case VehicleTypes.SMALL_TRL:
				return getOptionsFromEnum(TrlVehicleConfiguration);
			default:
				return getOptionsFromEnum(VehicleConfiguration);
		}
	}

	get months(): MultiOptions {
		return [
			{ value: 'January', label: 'January' },
			{ value: 'February', label: 'Febraury' },
			{ value: 'March', label: 'March' },
			{ value: 'April', label: 'April' },
			{ value: 'May', label: 'May' },
			{ value: 'June', label: 'June' },
			{ value: 'July', label: 'July' },
			{ value: 'August', label: 'August' },
			{ value: 'September', label: 'September' },
			{ value: 'October', label: 'October' },
			{ value: 'November', label: 'November' },
			{ value: 'December', label: 'December' },
		];
	}

	get suspensionTypeOptions(): MultiOptions {
		return [
			{ value: 'S', label: 'Steel' },
			{ value: 'R', label: 'Rubber' },
			{ value: 'A', label: 'Air' },
			{ value: 'H', label: 'Hydraulic' },
			{ value: 'O', label: 'Other' },
		];
	}

	get subClassOptions(): MultiOptions {
		return getOptionsFromEnum(VehicleSubclass);
	}

	get vehicleSizeOptions(): MultiOptions {
		return getOptionsFromEnum(VehicleSize);
	}

	get frameDescriptionOptions(): MultiOptions {
		return getOptionsFromEnum(FrameDescriptions);
	}

	get controlsBasedOffVehicleType() {
		switch (this.technicalRecordService.getVehicleTypeWithSmallTrl(this.techRecord())) {
			case VehicleTypes.HGV:
				return this.hgvFields;
			case VehicleTypes.PSV:
				return this.psvFields;
			case VehicleTypes.TRL:
				return this.trlFields;
			case VehicleTypes.SMALL_TRL:
				return this.smallTrlFields;
			case VehicleTypes.LGV:
			case VehicleTypes.CAR:
				return this.lgvAndCarFields;
			case VehicleTypes.MOTORCYCLE:
				return this.motorcycleFields;
			default:
				return {};
		}
	}

	addControlsBasedOffVehicleType() {
		const vehicleControls = this.controlsBasedOffVehicleType;
		for (const [key, control] of Object.entries(vehicleControls)) {
			this.form.addControl(key, control, { emitEvent: false });
		}
	}

	shouldDisplayFormControl(formControlName: string) {
		return !!this.form.get(formControlName);
	}

	getVehicleType(): VehicleTypes {
		return this.technicalRecordService.getVehicleTypeWithSmallTrl(this.techRecord());
	}

	get shouldShowSubclass(): boolean {
		return (
			this.getVehicleType() === VehicleTypes.SMALL_TRL ||
			this.getVehicleType() === VehicleTypes.LGV ||
			this.getVehicleType() === VehicleTypes.CAR
		);
	}

	get shouldShowClass(): boolean {
		return (
			this.getVehicleType() === VehicleTypes.TRL ||
			this.getVehicleType() === VehicleTypes.SMALL_TRL ||
			this.getVehicleType() === VehicleTypes.HGV ||
			this.getVehicleType() === VehicleTypes.MOTORCYCLE
		);
	}
}
