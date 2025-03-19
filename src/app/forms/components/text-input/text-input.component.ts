import { Component, input, output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlComponent } from '../base-control/base-control.component';

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
	standalone: false,
})
export class TextInputComponent extends BaseControlComponent {
	readonly numeric = input(false);
	readonly uppercase = input<boolean | undefined>(false);
	readonly blur = output<FocusEvent>();

	get style(): string {
		const width = this.width();
		return `govuk-input ${width ? `govuk-input--width-${width}` : ''}`;
	}
}
