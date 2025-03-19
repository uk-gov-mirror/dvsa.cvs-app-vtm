import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
})
export class ButtonComponent extends RouterLinkWithHref {
	@Input() id?: string;
	@Input() disabled = false;
	@Input() type: 'link' | 'button' = 'button';
	@Input() design: '' | 'secondary' | 'warning' | 'link' = '';

	readonly clicked = output();
}
