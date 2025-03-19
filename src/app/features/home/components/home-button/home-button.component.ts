import { Component, input } from '@angular/core';

@Component({
	selector: 'app-home-button',
	templateUrl: './home-button.component.html',
	styleUrls: ['./home-button.component.scss'],
	standalone: false,
})
export class HomeButtonComponent {
	readonly url = input('');
	readonly linkText = input('');
	readonly description = input('');
	readonly linkId = input('');
}
