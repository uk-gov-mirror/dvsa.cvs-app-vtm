import { ApprovalTypeFocusNextDirective } from '@/src/app/directives/approval-type-focus-next/approval-type-focus-next.directive';
import { CommonValidatorsService } from '@/src/app/forms/validators/common-validators.service';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges, inject } from '@angular/core';
import {
	AbstractControl,
	ControlContainer,
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { ApprovalType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/enums/approvalType.enum';
import { FormNodeWidth } from '@services/dynamic-forms/dynamic-form.types';
import { SharedModule } from '@shared/shared.module';
import { Subscription } from 'rxjs';

@Component({
	selector: 'approval-type-number-input',
	templateUrl: 'approval-type-number.html',
	styleUrls: ['./approval-type-number.scss'],
	standalone: true,
	imports: [
		FormsModule,
		NgSwitchCase,
		SharedModule,
		NgIf,
		NgSwitch,
		NgSwitchDefault,
		ReactiveFormsModule,
		ReactiveFormsModule,
		ApprovalTypeFocusNextDirective,
	],
})
export class ApprovalTypeNumber implements OnChanges, OnDestroy {
	@Input({ required: true })
	width!: FormNodeWidth;

	@Input({ alias: 'label', required: true })
	controlLabel = '';

	@Input({ alias: 'formControlName', required: true })
	controlName = '';

	@Input()
	disabled = false;

	@Input({ required: true })
	approvalType!: string;

	@Input()
	value: string | null | undefined = null;

	readonly FormNodeWidth = FormNodeWidth;

	fb = inject(FormBuilder);
	controlContainer = inject(ControlContainer);
	commonValidators = inject(CommonValidatorsService);

	form?: FormGroup;
	formSub?: Subscription;

	get id() {
		return this.controlName;
	}

	get control() {
		return this.controlContainer.control?.get(this.controlName) as AbstractControl;
	}

	onChange = (_: any) => {};
	onTouched = () => {};

	writeValue(obj: string): void {
		this.value = obj;
		this.onChange(obj);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['approvalType']) {
			this.form = this.onApprovalTypeChange();
			this.formSub = this.form.valueChanges.subscribe(() => {
				const approvalTypeNumber1 = this.form?.get('approvalTypeNumber1')?.value;
				const approvalTypeNumber2 = this.form?.get('approvalTypeNumber2')?.value;
				const approvalTypeNumber3 = this.form?.get('approvalTypeNumber3')?.value;
				const approvalTypeNumber4 = this.form?.get('approvalTypeNumber4')?.value;

				const approvalTypeNumber = this.processApprovalTypeNumber(
					approvalTypeNumber1,
					approvalTypeNumber2,
					approvalTypeNumber3,
					approvalTypeNumber4
				);

				console.log(approvalTypeNumber);
				this.onChange(approvalTypeNumber);
			});
		}
	}

	ngOnDestroy(): void {
		this.formSub?.unsubscribe();
	}

	onApprovalTypeChange() {
		// construct form based on approval type
		switch (this.approvalType) {
			case ApprovalType.ECTA:
				return this.fb.group({
					approvalTypeNumber1: this.fb.control<string>(''),
					approvalTypeNumber2: this.fb.control<string>(''),
					approvalTypeNumber3: this.fb.control<string>(''),
					approvalTypeNumber4: this.fb.control<string>(''),
				});
			default:
				return this.fb.group({
					approvalTypeNumber1: this.fb.control<string>(''),
				});
		}
	}

	processApprovalTypeNumber(
		approvalTypeNumber1: string | undefined,
		approvalTypeNumber2: string | undefined,
		approvalTypeNumber3: string | undefined,
		approvalTypeNumber4: string | undefined
	) {
		switch (this.approvalType) {
			case ApprovalType.NTA:
				return approvalTypeNumber1 || null;

			case ApprovalType.ECTA:
				return approvalTypeNumber1 && approvalTypeNumber2 && approvalTypeNumber3 && approvalTypeNumber4
					? `e${approvalTypeNumber1}*${approvalTypeNumber2}/${approvalTypeNumber3}*${approvalTypeNumber4}`
					: null;

			case ApprovalType.IVA:
				return approvalTypeNumber1 || null;

			case ApprovalType.NSSTA:
				return approvalTypeNumber1 && approvalTypeNumber2 ? `e${approvalTypeNumber1}*NKS*${approvalTypeNumber2}` : null;

			case ApprovalType.ECSSTA:
				return approvalTypeNumber1 && approvalTypeNumber2 && approvalTypeNumber3 && approvalTypeNumber4
					? `e${approvalTypeNumber1}*KS${approvalTypeNumber2}/${approvalTypeNumber3}*${approvalTypeNumber4}`
					: null;

			case ApprovalType.GB_WVTA:
				return approvalTypeNumber1 && approvalTypeNumber2 && approvalTypeNumber3 && approvalTypeNumber4
					? `${approvalTypeNumber1}*${approvalTypeNumber2}/${approvalTypeNumber3}*${approvalTypeNumber4}`
					: null;

			case ApprovalType.UKNI_WVTA:
				return approvalTypeNumber1 && approvalTypeNumber2 && approvalTypeNumber3 && approvalTypeNumber4
					? `${approvalTypeNumber1}11*${approvalTypeNumber2}/${approvalTypeNumber3}*${approvalTypeNumber4}`
					: null;

			case ApprovalType.EU_WVTA_PRE_23:
				return approvalTypeNumber1 && approvalTypeNumber2 && approvalTypeNumber3 && approvalTypeNumber4
					? `e${approvalTypeNumber1}*${approvalTypeNumber2}/${approvalTypeNumber3}*${approvalTypeNumber4}`
					: null;

			case ApprovalType.EU_WVTA_23_ON:
				return approvalTypeNumber1 && approvalTypeNumber2 && approvalTypeNumber3 && approvalTypeNumber4
					? `e${approvalTypeNumber1}*${approvalTypeNumber2}/${approvalTypeNumber3}*${approvalTypeNumber4}`
					: null;

			case ApprovalType.QNIG:
				return approvalTypeNumber1 && approvalTypeNumber2 && approvalTypeNumber3 && approvalTypeNumber4
					? `e${approvalTypeNumber1}*${approvalTypeNumber2}/${approvalTypeNumber3}*${approvalTypeNumber4}`
					: null;

			case ApprovalType.PROV_GB_WVTA:
				return approvalTypeNumber1 && approvalTypeNumber2 && approvalTypeNumber3 && approvalTypeNumber4
					? `${approvalTypeNumber1}*${approvalTypeNumber2}/${approvalTypeNumber3}*${approvalTypeNumber4}`
					: null;

			case ApprovalType.SMALL_SERIES_NKSXX:
				return approvalTypeNumber1 && approvalTypeNumber2 && approvalTypeNumber3
					? `${approvalTypeNumber1}11*NKS${approvalTypeNumber2}/${approvalTypeNumber3}*${approvalTypeNumber4}`
					: null;

			case ApprovalType.SMALL_SERIES_NKS:
				return approvalTypeNumber1 && approvalTypeNumber2
					? `${approvalTypeNumber1}11*NKS*${approvalTypeNumber2}`
					: null;

			case ApprovalType.IVA_VCA:
				return approvalTypeNumber1 && approvalTypeNumber2 && approvalTypeNumber3
					? `n11*NIV${approvalTypeNumber1}/${approvalTypeNumber2}*${approvalTypeNumber3}`
					: null;

			case ApprovalType.IVA_DVSA_NI:
				return approvalTypeNumber1 || null;
			default:
				return 'Unknown approval type';
		}
	}
}
