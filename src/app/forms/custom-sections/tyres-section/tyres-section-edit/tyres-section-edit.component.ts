import { FormNodeWidth } from '@/src/app/services/dynamic-forms/dynamic-form.types';
import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { CommonValidatorsService } from '@forms/validators/common-validators.service';
import { VehicleTypes } from '@models/vehicle-tech-record.model';
import { Store } from '@ngrx/store';
import { TechnicalRecordService } from '@services/technical-record/technical-record.service';
import { ReplaySubject } from 'rxjs';

@Component({
	selector: 'app-tyres-section-edit',
	templateUrl: './tyres-section-edit.component.html',
	styleUrls: ['./tyres-section-edit.component.scss'],
})
export class TyresSectionEditComponent implements OnInit, OnDestroy {
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

	get techRecordAxles() {
		return this.form.get('techRecord_axles') as FormArray;
	}

	addHGVAxle() {
		this.techRecordAxles.push(
			this.fb.group({
				axleNumber: this.fb.control<number | null>(null),
				tyres_tyreCode: this.fb.control<number | null>(null, [
					this.commonValidators.max(99999, 'Tyre Code must be less than or equal to 99999'),
					this.commonValidators.min(0, 'Tyre Code must be greater than or equal to 0'),
				]),
				tyres_tyreSize: this.fb.control<string | null>(null, [
					this.commonValidators.maxLength(12, 'Tyre Size must be less than or equal to 12 characters'),
					this.commonValidators.minLength(0, 'Tyre Size must be greater than or equal to 0'),
				]),
				tyres_plyRating: this.fb.control<string | null>(null, [
					this.commonValidators.maxLength(2, 'Ply Rating must be less than or equal to 2 characters'),
					this.commonValidators.minLength(0, 'Ply Rating must be greater than or equal to 0'),
				]),
				tyres_fitmentCode: this.fb.control<number | null>(null),
				tyres_dataTrAxles: this.fb.control<number | null>(null, [
					this.commonValidators.max(999, 'Data TR Axles must be less than or equal to 999'),
					this.commonValidators.min(0, 'Data TR Axles must be greater than or equal to 0'),
				]),
			})
		);
	}

	addPSVAxle() {
		this.techRecordAxles.push(
			this.fb.group({
				axleNumber: this.fb.control<number | null>(null),
				tyres_tyreCode: this.fb.control<number | null>(null, [
					this.commonValidators.max(99999, 'Tyre Code must be less than or equal to 99999'),
					this.commonValidators.min(0, 'Tyre Code must be greater than or equal to 0'),
				]),
				tyres_tyreSize: this.fb.control<number | null>(null, [
					this.commonValidators.maxLength(12, 'Tyre Size must be less than or equal to 12 characters'),
					this.commonValidators.min(0, 'Tyre Size must be greater than or equal to 0'),
				]),
				tyres_plyRating: this.fb.control<number | null>(null, [
					this.commonValidators.maxLength(2, 'Ply Rating must be less than or equal to 2 characters'),
					this.commonValidators.min(0, 'Ply Rating must be greater than or equal to 0'),
				]),
				tyres_speedCategorySymbol: this.fb.control<string | null>(null),
				tyres_fitmentCode: this.fb.control<string | null>(null),
				tyres_dataTrAxles: this.fb.control<number | null>(null, [
					this.commonValidators.max(999, 'Load index must be less than or equal to 999'),
					this.commonValidators.min(0, 'Load index must be greater than or equal to 0'),
				]),
			})
		);
	}

	addTRLAxle() {
		this.techRecordAxles.push(
			this.fb.group({
				axleNumber: this.fb.control<number | null>(null),
				tyres_tyreCode: this.fb.control<number | null>(null, [
					this.commonValidators.max(99999, 'Tyre Code must be less than or equal to 99999'),
					this.commonValidators.min(0, 'Tyre Code must be greater than or equal to 0'),
				]),
				tyres_tyreSize: this.fb.control<number | null>(null, [
					this.commonValidators.max(12, 'Tyre Size must be less than or equal to 12'),
					this.commonValidators.min(0, 'Tyre Size must be greater than or equal to 0'),
				]),
				tyres_plyRating: this.fb.control<number | null>(null, [
					this.commonValidators.max(2, 'Ply rating must be less than or equal to 2'),
					this.commonValidators.min(0, 'Ply rating must be greater than or equal to 0'),
				]),
				tyres_fitmentCode: this.fb.control<string | null>(null),
				tyres_dataTrAxles: this.fb.control<number | null>(null),
			})
		);
	}

	prepopulateAxles() {
		const techRecord = this.techRecord();
		techRecord.techRecord_axles?.forEach(() => {
			if (techRecord.techRecord_vehicleType === VehicleTypes.HGV) this.addHGVAxle();
			if (techRecord.techRecord_vehicleType === VehicleTypes.TRL) this.addTRLAxle();
			if (techRecord.techRecord_vehicleType === VehicleTypes.PSV) this.addPSVAxle();
		});
	}
}
