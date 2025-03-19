import { Component, input } from '@angular/core';

@Component({
	selector: 'app-input-spinner',
	templateUrl: './input-spinner.component.html',
	styleUrls: ['./input-spinner.component.scss'],
	standalone: false,
})
export class InputSpinnerComponent {
	readonly isValid = input('');
}
