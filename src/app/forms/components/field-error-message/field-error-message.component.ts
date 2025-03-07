import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-field-error-message',
	templateUrl: './field-error-message.component.html',
	imports: [NgIf],
})
export class FieldErrorMessageComponent {
	@Input() name = '';
	@Input() error?: string | null;
}
