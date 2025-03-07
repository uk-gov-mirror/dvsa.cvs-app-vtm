import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
})
export class IconComponent {
	@Input() icon = '';
}
