import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TagComponent } from '../../../components/tag/tag.component';
import { NumberOnlyDirective } from '../../../directives/app-number-only/app-number-only.directive';
import { BaseControlComponent } from '../base-control/base-control.component';
import { FieldErrorMessageComponent } from '../field-error-message/field-error-message.component';

@Component({
	selector: 'app-text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: TextInputComponent,
			multi: true,
		},
	],
	imports: [
		NgClass,
		NgIf,
		NgFor,
		TagComponent,
		FieldErrorMessageComponent,
		NgTemplateOutlet,
		FormsModule,
		NumberOnlyDirective,
	],
})
export class TextInputComponent extends BaseControlComponent {
	@Input() numeric = false;
	@Output() blur = new EventEmitter<FocusEvent>();

	get style(): string {
		return `govuk-input ${this.width ? `govuk-input--width-${this.width}` : ''}`;
	}

	handleChange(event: unknown) {
		if (typeof event === 'string') {
			this.value = this.formatString(event);
		}
		this.onChange(this.value);
	}
}
