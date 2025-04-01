import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { BaseControlComponent } from '../base-control/base-control.component';
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { FieldErrorMessageComponent } from '../field-error-message/field-error-message.component';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: CheckboxComponent, multi: true }],
    imports: [
        NgClass,
        NgIf,
        FieldErrorMessageComponent,
        NgTemplateOutlet,
        FormsModule,
    ],
})
export class CheckboxComponent extends BaseControlComponent {}
