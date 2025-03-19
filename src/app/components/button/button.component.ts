import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
})
export class ButtonComponent extends RouterLinkWithHref {
	readonly id = input<string>();
	readonly disabled = input(false);
	readonly type = input<'link' | 'button'>('button');
	readonly design = input<'' | 'secondary' | 'warning' | 'link'>('');

	readonly clicked = output();
}
