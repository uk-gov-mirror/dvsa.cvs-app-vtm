import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormGroup } from '@services/dynamic-forms/dynamic-form.types';
import { ButtonComponent } from '../../../components/button/button.component';
import { DefaultNullOrEmpty } from '../../../pipes/default-null-or-empty/default-null-or-empty.pipe';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { TextInputComponent } from '../../components/text-input/text-input.component';

@Component({
	selector: 'app-custom-defect[index][form]',
	templateUrl: './custom-defect.component.html',
	styleUrls: ['./custom-defect.component.scss'],
	imports: [
		NgTemplateOutlet,
		NgIf,
		ButtonComponent,
		FormsModule,
		ReactiveFormsModule,
		TextInputComponent,
		TextAreaComponent,
		DefaultNullOrEmpty,
	],
})
export class CustomDefectComponent {
	@Input() form!: CustomFormGroup;
	@Input() index!: number;
	@Input() isEditing = false;
	@Input() templateName?: string;
	@Output() removeCustomDefect = new EventEmitter<number>();
}
