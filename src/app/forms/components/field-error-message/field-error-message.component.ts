import { Component, input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-field-error-message',
    templateUrl: './field-error-message.component.html',
    imports: [NgIf],
})
export class FieldErrorMessageComponent {
	readonly name = input('');
	readonly error = input<string | null>();
}
