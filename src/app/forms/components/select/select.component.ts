import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormNodeOption } from '@services/dynamic-forms/dynamic-form.types';
import { TagComponent } from '../../../components/tag/tag.component';
import { BaseControlComponent } from '../base-control/base-control.component';
import { FieldErrorMessageComponent } from '../field-error-message/field-error-message.component';

@Component({
	selector: 'app-select[options]',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: SelectComponent,
			multi: true,
		},
	],
	imports: [NgClass, NgIf, NgFor, TagComponent, FieldErrorMessageComponent, FormsModule],
})
export class SelectComponent extends BaseControlComponent {
	@Input() options!: Array<FormNodeOption<string | number | boolean>>;
	@Output() blur = new EventEmitter<FocusEvent>();

	get style(): string {
		return `govuk-select ${this.width ? `govuk-input--width-${this.width}` : ''}`;
	}
}
