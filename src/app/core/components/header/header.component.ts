import { Component, Input, output } from '@angular/core';
import packageInfo from '../../../../../package.json';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: false,
})
export class HeaderComponent {
	readonly logOutEvent = output<void>();
	@Input() username: string | null = '';
	protected readonly version = packageInfo.version;

	logout() {
		this.logOutEvent.emit();
	}
}
