import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiOptions } from '@models/options.model';
import { FormNodeEditTypes, FormNodeWidth } from '@services/dynamic-forms/dynamic-form.types';
import { Observable, of } from 'rxjs';
import { PrefixDirective } from '../../../directives/prefix/prefix.directive';
import { SuffixDirective } from '../../../directives/suffix/suffix.directive';
import { ApprovalTypeInputComponent } from '../approval-type/approval-type.component';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { CheckboxGroupComponent } from '../checkbox-group/checkbox-group.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { DateComponent } from '../date/date.component';
import { NumberInputComponent } from '../number-input/number-input.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { ReadOnlyComponent } from '../read-only/read-only.component';
import { SelectComponent } from '../select/select.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { TextInputComponent } from '../text-input/text-input.component';

@Component({
	selector: 'app-switchable-input[form][type][name][isEditing]',
	templateUrl: './switchable-input.component.html',
	imports: [
		NgIf,
		NgSwitch,
		FormsModule,
		ReactiveFormsModule,
		NgSwitchCase,
		AutocompleteComponent,
		PrefixDirective,
		CheckboxComponent,
		CheckboxGroupComponent,
		NgTemplateOutlet,
		DateComponent,
		ApprovalTypeInputComponent,
		NumberInputComponent,
		SuffixDirective,
		RadioGroupComponent,
		SelectComponent,
		TextAreaComponent,
		NgSwitchDefault,
		TextInputComponent,
		ReadOnlyComponent,
	],
})
export class SwitchableInputComponent implements OnInit {
	@Input() type!: FormNodeEditTypes;
	@Input() form!: FormGroup;
	@Input() name!: string;

	@Input() isEditing = true;

	@Input() customId?: string;
	@Input() idExtension?: number;
	@Input() label?: string;
	@Input() prefix?: string;
	@Input() suffix?: string;
	@Input() width?: FormNodeWidth;
	@Input() options?: MultiOptions = [];
	@Input() propOptions$?: Observable<MultiOptions>;
	@Input() hint?: string;
	@Input() approvalType?: string;
	@Input() approvalTypeChange?: boolean | undefined = false;

	@Input() readOnlyDate?: boolean;
	@Input() vehicleType?: string | null;
	delimiter = { regex: '\\. (?<!\\..\\. )', separator: '. ' };

	ngOnInit(): void {
		if (this.requiresOptions && !this.options && !this.propOptions$) {
			throw new Error('Cannot use autocomplete or radio control without providing an options array.');
		}
	}

	get requiresOptions(): boolean {
		return (
			this.type === this.types.AUTOCOMPLETE ||
			this.type === this.types.CHECKBOXGROUP ||
			this.type === this.types.DROPDOWN ||
			this.type === this.types.RADIO
		);
	}

	get options$(): Observable<MultiOptions> {
		return this.propOptions$ ?? of(this.options ?? []);
	}

	get types(): typeof FormNodeEditTypes {
		return FormNodeEditTypes;
	}
}
