import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgIf, KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-control-errors',
    templateUrl: './control-errors.component.html',
    imports: [NgIf, KeyValuePipe],
})
export class ControlErrorsComponent {
	readonly elementId = input.required<string>();

	readonly control = input.required<FormControl>();
}
