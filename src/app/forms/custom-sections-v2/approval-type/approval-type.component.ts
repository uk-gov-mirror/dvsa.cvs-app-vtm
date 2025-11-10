import { Component, OnDestroy, OnInit, input } from '@angular/core';
import { type AbstractControl, ReactiveFormsModule, type ValidationErrors, type ValidatorFn } from '@angular/forms';
import { GlobalError } from '@core/components/global-error/global-error.interface';
import { ApprovalType as TRLApprovalTypes } from '@dvsa/cvs-type-definitions/types/v3/tech-record/enums/approvalType.enum.js';
import { ApprovalType as HGVAndPSVApprovalTypes } from '@dvsa/cvs-type-definitions/types/v3/tech-record/enums/approvalTypeHgvOrPsv.enum.js';
import { GovukFormGroupInputComponent } from '@forms/components/govuk-form-group-input/govuk-form-group-input.component';
import { GovukFormGroupSelectComponent } from '@forms/components/govuk-form-group-select/govuk-form-group-select.component';
import { EditBaseComponent } from '@forms/custom-sections/edit-base-component/edit-base-component';
import { ApprovalTypeNumber } from '@forms/custom-sections/type-approval-section/type-approval-section-edit/components/approval-type-number/approval-type-number';
import { getOptionsFromEnum } from '@forms/utils/enum-map';
import { V3TechRecordModel, VehicleTypes } from '@models/vehicle-tech-record.model';
import { FormNodeWidth } from '@services/dynamic-forms/dynamic-form.types';
import { ReplaySubject } from 'rxjs';

@Component({
	selector: 'app-approval-type',
	templateUrl: './approval-type.component.html',
	styleUrls: ['./approval-type.component.scss'],
	imports: [ReactiveFormsModule, ApprovalTypeNumber, GovukFormGroupInputComponent, GovukFormGroupSelectComponent],
})
export class ApprovalTypeComponent extends EditBaseComponent implements OnInit, OnDestroy {
	destroy$ = new ReplaySubject<boolean>(1);
	techRecord = input.required<V3TechRecordModel>();
	trlApprovalTypes = getOptionsFromEnum(TRLApprovalTypes);
	hgvAndPsvApprovalTypes = getOptionsFromEnum(HGVAndPSVApprovalTypes);

	form = this.fb.group({
		techRecord_approvalType: this.fb.nonNullable.control<string | null>({
			value: null,
			disabled: false,
		}),
		techRecord_approvalTypeNumber: this.fb.control<string | null>({ value: null, disabled: false }, [
			this.requiredWithApprovalType('Approval type number is required with Approval type'),
		]),
		techRecord_ntaNumber: this.fb.control<string | null>({ value: null, disabled: false }, [
			this.commonValidators.maxLength(40, 'National type number must be less than or equal to 40 characters'),
		]),
		techRecord_variantNumber: this.fb.control<string | null>({ value: null, disabled: false }, [
			this.commonValidators.maxLength(35, 'Variant number must be less than or equal to 35 characters'),
		]),
		techRecord_variantVersionNumber: this.fb.control<string | null>({ value: null, disabled: false }, [
			this.commonValidators.maxLength(35, 'Variant version number must be less than or equal to 35 characters'),
		]),
	});

	ngOnInit(): void {
		this.init(this.form);

		// Prepopulate form with current tech record
		this.form.patchValue(this.techRecord() as any);
	}

	requiredWithApprovalType(message: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const approvalType = control.parent?.get('techRecord_approvalType')?.value;
			const approvalTypeNumber = control.value;

			if (approvalType && !approvalTypeNumber) {
				const error: GlobalError = {
					error: message,
					anchorLink: `techRecord_approvalTypeNumber1-${approvalType}`,
				};
				return { required: error };
			}

			return null;
		};
	}

	shouldDisplayFormControl(formControlName: string) {
		return !!this.form.get(formControlName);
	}

	ngOnDestroy(): void {
		// Detach all form controls from parent
		this.destroy(this.form);

		// Clear subscriptions
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	protected readonly VehicleTypes = VehicleTypes;
	protected readonly FormNodeWidth = FormNodeWidth;
}
