import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TagType } from '@components/tag/tag.component';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { CommonValidatorsService } from '@forms/validators/common-validators.service';
import { V3TechRecordModel } from '@models/vehicle-tech-record.model';
import { Store } from '@ngrx/store';
import { FormNodeWidth, TagTypeLabels } from '@services/dynamic-forms/dynamic-form.types';
import { TechnicalRecordService } from '@services/technical-record/technical-record.service';
import { ReplaySubject } from 'rxjs';

@Component({
	selector: 'app-body-section-edit',
	templateUrl: './body-section-edit.component.html',
	styleUrls: ['./body-section-edit.component.scss'],
})
export class BodySectionEditComponent implements OnInit, OnDestroy {
	fb = inject(FormBuilder);
	store = inject(Store);
	controlContainer = inject(ControlContainer);
	commonValidators = inject(CommonValidatorsService);
	technicalRecordService = inject(TechnicalRecordService);
	techRecord = input.required<V3TechRecordModel>();

	destroy$ = new ReplaySubject<boolean>(1);

	form = this.fb.group({});

	ngOnInit(): void {
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
		return {};
	}

	get psvFields(): Partial<Record<keyof TechRecordType<'psv'>, FormControl>> {
		return {};
	}

	get trlFields(): Partial<Record<keyof TechRecordType<'trl'>, FormControl>> {
		return {};
	}

	get smallTrlFields(): Partial<Record<any, FormControl>> {
		return {};
	}

	get lgvAndCarFields(): Partial<Record<keyof TechRecordType<'lgv' | 'car'>, FormControl>> {
		return {};
	}

	// currently typed as string due to wrong typing of motorcycle, as it has a skeleton car in its place
	// get motorcycleFields(): Partial<Record<keyof TechRecordType<'motorcycle'>, FormControl>> {
	get motorcycleFields(): Partial<Record<string, FormControl>> {
		return {};
	}

	protected readonly FormNodeWidth = FormNodeWidth;
	protected readonly TagTypeLabels = TagTypeLabels;
	protected readonly TagType = TagType;
}
