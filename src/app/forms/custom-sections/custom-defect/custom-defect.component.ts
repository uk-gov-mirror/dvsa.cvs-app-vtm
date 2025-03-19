import { Component, Input, output } from '@angular/core';
import { CustomFormGroup } from '@services/dynamic-forms/dynamic-form.types';

@Component({
	selector: 'app-custom-defect[index][form]',
	templateUrl: './custom-defect.component.html',
	styleUrls: ['./custom-defect.component.scss'],
	standalone: false,
})
export class CustomDefectComponent {
	@Input() form!: CustomFormGroup;
	@Input() index!: number;
	@Input() isEditing = false;
	@Input() templateName?: string;
	readonly removeCustomDefect = output<number>();
}
