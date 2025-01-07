import { addAxle, removeAxle } from '@/src/app/store/technical-records';
import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { CommonValidatorsService } from '@forms/validators/common-validators.service';
import { VehicleTypes } from '@models/vehicle-tech-record.model';
import { Store } from '@ngrx/store';
import { FormNodeWidth } from '@services/dynamic-forms/dynamic-form.types';
import { TechnicalRecordService } from '@services/technical-record/technical-record.service';
import { ReplaySubject } from 'rxjs';

@Component({
	selector: 'app-weights-section-edit',
	templateUrl: './weights-section-edit.component.html',
	styleUrls: ['./weights-section-edit.component.scss'],
})
export class WeightsSectionEditComponent implements OnInit, OnDestroy {
	protected readonly VehicleTypes = VehicleTypes;
	protected readonly FormNodeWidth = FormNodeWidth;
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
		this.prepopulateAxles();

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

	get techRecordAxles() {
		return this.form.get('techRecord_axles') as FormArray;
	}

	getAxleForm() {
		const techRecord = this.techRecord();
		if (techRecord.techRecord_vehicleType === VehicleTypes.PSV) return this.addPsvAxleWeights();
		return this.addHgvTrlAxleWeights();
	}

	prepopulateAxles() {
		this.techRecord().techRecord_axles?.forEach(() => this.techRecordAxles.push(this.getAxleForm()));
	}

	addHgvTrlAxleWeights() {
		return this.fb.group({
			weights_gbWeight: this.fb.control<number | null>(null),
			weights_eecWeight: this.fb.control<number | null>(null),
			weights_designWeight: this.fb.control<number | null>(null),
		});
	}

	addPsvAxleWeights() {
		return this.fb.group({
			weights_kerbWeight: this.fb.control<number | null>(null),
			weights_ladenWeight: this.fb.control<number | null>(null),
			weights_gbWeight: this.fb.control<number | null>(null),
			weights_designWeight: this.fb.control<number | null>(null),
		});
	}

	addControlsBasedOffVehicleType() {
		const vehicleControls = this.controlsBasedOffVehicleType;
		for (const [key, control] of Object.entries(vehicleControls)) {
			this.form.addControl(key, control, { emitEvent: false });
		}
	}

	get controlsBasedOffVehicleType() {
		switch (this.techRecord().techRecord_vehicleType) {
			case VehicleTypes.HGV:
				return this.hgvControls;
			case VehicleTypes.TRL:
				return this.trlControls;
			case VehicleTypes.PSV:
				return this.psvControls;
			default:
				return {};
		}
	}

	get hgvControls() {
		return {
			techRecord_axles: this.fb.array([]),
			techRecord_grossGbWeight: this.fb.control<number | null>(null),
			techRecord_grossEecWeight: this.fb.control<number | null>(null),
			techRecord_grossDesignWeight: this.fb.control<number | null>(null),
			techRecord_trainGbWeight: this.fb.control<number | null>(null),
			techRecord_trainEecWeight: this.fb.control<number | null>(null),
			techRecord_trainDesignWeight: this.fb.control<number | null>(null),
			techRecord_maxTrainGbWeight: this.fb.control<number | null>(null),
			techRecord_maxTrainEecWeight: this.fb.control<number | null>(null),
			techRecord_maxTrainDesignWeight: this.fb.control<number | null>(null),
		};
	}

	get trlControls() {
		return {
			techRecord_axles: this.fb.array([]),
			techRecord_grossGbWeight: this.fb.control<number | null>(null),
			techRecord_grossEecWeight: this.fb.control<number | null>(null),
			techRecord_grossDesignWeight: this.fb.control<number | null>(null),
		};
	}

	get psvControls() {
		return {
			techRecord_unladenWeight: this.fb.control<number | null>(null),
			techRecord_axles: this.fb.array([]),
			techRecord_grossKerbWeight: this.fb.control<number | null>(null),
			techRecord_grossLadenWeight: this.fb.control<number | null>(null),
			techRecord_grossGbWeight: this.fb.control<number | null>(null),
			techRecord_grossDesignWeight: this.fb.control<number | null>(null),
			techRecord_maxTrainGbWeight: this.fb.control<number | null>(null),
			techRecord_trainDesignWeight: this.fb.control<number | null>(null),
		};
	}

	addAxle() {
		const techRecord = this.techRecord();
		if (!techRecord.techRecord_axles || techRecord.techRecord_axles.length < 10) {
			this.techRecordAxles.setErrors(null);
			this.store.dispatch(addAxle());
			return;
		}

		this.techRecordAxles.setErrors({ length: 'Cannot have more than 10 axles' });
	}

	removeAxle(index: number) {
		const techRecord = this.techRecord();
		const minLength = techRecord.techRecord_vehicleType === VehicleTypes.TRL ? 1 : 2;

		if (techRecord.techRecord_axles && techRecord.techRecord_axles.length > minLength) {
			this.techRecordAxles.setErrors(null);
			this.store.dispatch(removeAxle({ index }));
			return;
		}

		this.techRecordAxles.setErrors({ length: `Cannot have less than ${minLength} axles` });
	}
}
