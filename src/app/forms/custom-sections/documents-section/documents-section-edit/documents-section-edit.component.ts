import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';
import { CommonValidatorsService } from '@forms/validators/common-validators.service';
import { V3TechRecordModel } from '@models/vehicle-tech-record.model';
import { ReplaySubject, map, of } from 'rxjs';
import { DOCUMENT_TYPES } from '../../../templates/general/document-types';

@Component({
	selector: 'app-documents-section-edit',
	templateUrl: './documents-section-edit.component.html',
	styleUrls: ['./documents-section-edit.component.scss'],
})
export class DocumentsSectionEditComponent implements OnInit, OnDestroy {
	fb = inject(FormBuilder);
	controlContainer = inject(ControlContainer);
	commonValidators = inject(CommonValidatorsService);
	techRecord = input.required<V3TechRecordModel>();

	destroy$ = new ReplaySubject<boolean>(1);

	readonly DOCUMENT_TYPES = of(DOCUMENT_TYPES).pipe(map((options) => options.map((option) => option.value)));

	form: FormGroup = this.fb.group({
		techRecord_microfilm_microfilmDocumentType: this.fb.control<string | null>(null),
		techRecord_microfilm_microfilmRollNumber: this.fb.control<string | null>(null, [
			this.commonValidators.maxLength(5, 'Microfilm roll number must be less than or equal to 5 characters'),
		]),
		techRecord_microfilm_microfilmSerialNumber: this.fb.control<string | null>(null, [
			this.commonValidators.maxLength(4, 'Microfilm serial number must be less than or equal to 4 characters'),
		]),
	});

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
}
