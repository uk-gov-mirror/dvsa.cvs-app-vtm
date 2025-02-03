import { TagType } from '@/src/app/components/tag/tag.component';
import { FormNodeWidth, TagTypeLabels } from '@/src/app/services/dynamic-forms/dynamic-form.types';
import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { CommonValidatorsService } from '@forms/validators/common-validators.service';
import { VehicleTypes } from '@models/vehicle-tech-record.model';
import { Store } from '@ngrx/store';
import { TechnicalRecordService } from '@services/technical-record/technical-record.service';
import { ReplaySubject } from 'rxjs';

@Component({
	selector: 'app-plates-section-edit',
	templateUrl: './plates-section-edit.component.html',
	styleUrls: ['./plates-section-edit.component.scss'],
})
export class PlatesSectionEditComponent implements OnInit, OnDestroy {
	protected readonly VehicleTypes = VehicleTypes;
	protected readonly FormNodeWidth = FormNodeWidth;
	protected readonly TagType = TagType;
	protected readonly TagTypeLabels = TagTypeLabels;

	fb = inject(FormBuilder);
	store = inject(Store);
	controlContainer = inject(ControlContainer);
	commonValidators = inject(CommonValidatorsService);
	technicalRecordService = inject(TechnicalRecordService);
	techRecord = input.required<TechRecordType<'hgv' | 'trl' | 'psv'>>();

	destroy$ = new ReplaySubject<boolean>(1);

	form: FormGroup = this.fb.group({});

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

	addControlsBasedOffVehicleType() {
		const vehicleControls = this.controlsBasedOffVehicleType;
		for (const [key, control] of Object.entries(vehicleControls)) {
			this.form.addControl(key, control, { emitEvent: false });
		}
	}

	get controlsBasedOffVehicleType() {
		switch (this.techRecord()?.techRecord_vehicleType) {
			case VehicleTypes.HGV:
				return this.hgvControls;
			case VehicleTypes.PSV:
				return this.psvControls;
			case VehicleTypes.TRL:
				return this.trlControls;
			default:
				return {};
		}
	}

	get hgvControls() {
		return {
			techRecord_tyreUseCode: this.fb.control(null),
			techRecord_axles: this.fb.array([]),
		};
	}

	get psvControls() {
		return {
			techRecord_speedRestriction: this.fb.control<number | null>(null, [
				this.commonValidators.min(0, 'Speed Restriction must be greater than or equal to 0'),
				this.commonValidators.max(99, 'Speed Restriction must be less than or equal to 99'),
			]),
			techRecord_axles: this.fb.array([]),
		};
	}

	get trlControls() {
		return {
			techRecord_tyreUseCode: this.fb.control<string | null>(null),
			techRecord_axles: this.fb.array([]),
		};
	}
}
