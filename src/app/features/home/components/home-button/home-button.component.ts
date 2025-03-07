import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-home-button',
	templateUrl: './home-button.component.html',
	styleUrls: ['./home-button.component.scss'],
	standalone: false,
})
export class HomeButtonComponent {
	@Input() url = '';
	@Input() linkText = '';
	@Input() description = '';
	@Input() linkId = '';
}
