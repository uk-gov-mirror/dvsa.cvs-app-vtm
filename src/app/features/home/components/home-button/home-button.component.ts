import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-home-button',
	templateUrl: './home-button.component.html',
	styleUrls: ['./home-button.component.scss'],
	imports: [RouterLink],
})
export class HomeButtonComponent {
	@Input() url = '';
	@Input() linkText = '';
	@Input() description = '';
	@Input() linkId = '';
}
