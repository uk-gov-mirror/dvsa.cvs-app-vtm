import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { ValidatorNames } from '@models/validators.enum';
import { BaseControlComponent } from '../base-control/base-control.component';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { TagComponent } from '../../../components/tag/tag.component';
import { FieldErrorMessageComponent } from '../field-error-message/field-error-message.component';

@Component({
    selector: 'app-text-area',
    templateUrl: './text-area.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TextAreaComponent,
            multi: true,
        },
    ],
    imports: [
        NgIf,
        NgFor,
        TagComponent,
        FieldErrorMessageComponent,
        FormsModule,
        NgClass,
    ],
})
export class TextAreaComponent extends BaseControlComponent {
	get maxLength(): number | undefined {
		return this.control?.meta.validators?.find((v) => v.name === ValidatorNames.MaxLength)?.args as number | undefined;
	}
}
