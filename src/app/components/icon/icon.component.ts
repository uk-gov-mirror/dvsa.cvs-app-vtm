import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
})
export class IconComponent {
	@Input() icon = '';
}
