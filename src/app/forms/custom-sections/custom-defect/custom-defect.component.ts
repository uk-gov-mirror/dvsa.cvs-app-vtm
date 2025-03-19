import { Component, input, output } from '@angular/core';
import { CustomFormGroup } from '@services/dynamic-forms/dynamic-form.types';

@Component({
	selector: 'app-custom-defect[index][form]',
	templateUrl: './custom-defect.component.html',
	styleUrls: ['./custom-defect.component.scss'],
	standalone: false,
})
export class CustomDefectComponent {
	readonly form = input.required<CustomFormGroup>();
	readonly index = input.required<number>();
	readonly isEditing = input(false);
	readonly templateName = input<string>();
	readonly removeCustomDefect = output<number>();
}
