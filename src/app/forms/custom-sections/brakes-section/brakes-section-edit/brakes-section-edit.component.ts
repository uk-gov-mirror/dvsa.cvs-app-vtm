import { FormNodeEditTypes, FormNodeWidth, TagTypeLabels } from '@/src/app/services/dynamic-forms/dynamic-form.types';
import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TagType } from '@components/tag/tag.component';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { GovukFormGroupAutocompleteComponent } from '@forms/components/govuk-form-group-autocomplete/govuk-form-group-autocomplete.component';
import { GovukFormGroupCheckboxComponent } from '@forms/components/govuk-form-group-checkbox/govuk-form-group-checkbox.component';
import { GovukFormGroupInputComponent } from '@forms/components/govuk-form-group-input/govuk-form-group-input.component';
import { GovukFormGroupRadioComponent } from '@forms/components/govuk-form-group-radio/govuk-form-group-radio.component';
import { getOptionsFromEnum } from '@forms/utils/enum-map';
import { EXEMPT_OR_NOT_OPTIONS, MultiOptions, YES_NO_OPTIONS } from '@models/options.model';
import { ReferenceDataResourceType } from '@models/reference-data.model';
import { Retarders, V3TechRecordModel, VehicleTypes } from '@models/vehicle-tech-record.model';
import { MultiOptionsService } from '@services/multi-options/multi-options.service';
import { TechnicalRecordService } from '@services/technical-record/technical-record.service';
import { Observable, ReplaySubject, of } from 'rxjs';

@Component({
	selector: 'app-brakes-section-edit',
	templateUrl: './brakes-section-edit.component.html',
	styleUrls: ['./brakes-section-edit.component.scss'],
	imports: [
		ReactiveFormsModule,
		GovukFormGroupAutocompleteComponent,
		GovukFormGroupInputComponent,
		GovukFormGroupRadioComponent,
		GovukFormGroupCheckboxComponent,
	],
})
export class BrakesSectionEditComponent implements OnInit, OnDestroy {
	fb = inject(FormBuilder);
	controlContainer = inject(ControlContainer);
	technicalRecordService = inject(TechnicalRecordService);
	optionsService = inject(MultiOptionsService);

	FormNodeWidth = FormNodeWidth;
	VehicleTypes = VehicleTypes;
	TagType = TagType;
	TagTypeLabels = TagTypeLabels;
	brakeCodeOptions$ = of<MultiOptions>([]);

	booleanOptions = YES_NO_OPTIONS;
	booleanOptions$ = of(YES_NO_OPTIONS);

	techRecord = input.required<V3TechRecordModel>();

	destroy$ = new ReplaySubject<boolean>(1);

	form = this.fb.group({});

	ngOnInit(): void {
		this.loadBrakeCodeOptions();
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

	private addControlsBasedOffVehicleType() {
		const vehicleControls = this.controlsBasedOffVehicleType;

		for (const [key, control] of Object.entries(vehicleControls ?? {})) {
			this.form?.addControl(key, control, { emitEvent: false });
		}
	}

	shouldDisplayFormControl(formControlName: string) {
		return !!this.form.get(formControlName);
	}

	get vehicleType(): VehicleTypes {
		return this.technicalRecordService.getVehicleTypeWithSmallTrl(this.techRecord());
	}

	get controlsBasedOffVehicleType() {
		if (this.vehicleType === VehicleTypes.TRL) {
			return this.trlOnlyFields;
		}
		if (this.vehicleType === VehicleTypes.PSV) {
			return this.psvOnlyFields;
		}
		return null;
	}

	private get psvOnlyFields(): Partial<Record<keyof TechRecordType<'psv'>, FormControl>> {
		return {};
	}

	private get trlOnlyFields(): Partial<Record<keyof TechRecordType<'trl'>, FormControl>> {
		return {};
	}

	get retarderOptions(): MultiOptions {
		return getOptionsFromEnum(Retarders);
	}

	loadBrakeCodeOptions() {
		this.brakeCodeOptions$ = this.optionsService.getOptions(
			ReferenceDataResourceType.Brakes
		) as Observable<MultiOptions>;
	}

	get editTypes(): typeof FormNodeEditTypes {
		return FormNodeEditTypes;
	}

	get widths(): typeof FormNodeWidth {
		return FormNodeWidth;
	}

	get brakeCodePrefix(): string {
		const vehicleTechRecord = this.techRecord();
		if (vehicleTechRecord.techRecord_vehicleType !== 'psv' || !vehicleTechRecord?.techRecord_grossLadenWeight) {
			return '';
		}
		const prefix = `${Math.round(vehicleTechRecord.techRecord_grossLadenWeight / 100)}`;

		return prefix.length <= 2 ? `0${prefix}` : prefix;
	}

	get axles(): FormArray {
		return this.form.get(['techRecord_axles']) as FormArray;
	}

	protected readonly EXEMPT_OR_NOT_OPTIONS = EXEMPT_OR_NOT_OPTIONS;
}
