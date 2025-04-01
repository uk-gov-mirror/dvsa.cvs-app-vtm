import { Component, input } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
    selector: 'app-input-spinner',
    templateUrl: './input-spinner.component.html',
    styleUrls: ['./input-spinner.component.scss'],
    imports: [NgSwitch, NgSwitchCase],
})
export class InputSpinnerComponent {
	readonly isValid = input('');
}
