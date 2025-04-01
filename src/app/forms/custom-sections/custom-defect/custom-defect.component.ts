import { Component, input, output } from '@angular/core';
import { CustomFormGroup } from '@services/dynamic-forms/dynamic-form.types';
import { NgTemplateOutlet, NgIf } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { DefaultNullOrEmpty } from '../../../pipes/default-null-or-empty/default-null-or-empty.pipe';

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
	readonly form = input.required<CustomFormGroup>();
	readonly index = input.required<number>();
	readonly isEditing = input(false);
	readonly templateName = input<string>();
	readonly removeCustomDefect = output<number>();
}
