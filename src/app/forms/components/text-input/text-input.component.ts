import { Component, input, output } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { BaseControlComponent } from '../base-control/base-control.component';
import { NgClass, NgIf, NgFor, NgTemplateOutlet } from '@angular/common';
import { TagComponent } from '../../../components/tag/tag.component';
import { FieldErrorMessageComponent } from '../field-error-message/field-error-message.component';
import { ToUppercaseDirective } from '../../../directives/app-to-uppercase/app-to-uppercase.directive';
import { NumberOnlyDirective } from '../../../directives/app-number-only/app-number-only.directive';

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
        ToUppercaseDirective,
        NumberOnlyDirective,
    ],
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
