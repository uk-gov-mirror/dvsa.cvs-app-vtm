import { NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-input-spinner',
	templateUrl: './input-spinner.component.html',
	styleUrls: ['./input-spinner.component.scss'],
	imports: [NgSwitch, NgSwitchCase],
})
export class InputSpinnerComponent {
	@Input() isValid = '';
}
