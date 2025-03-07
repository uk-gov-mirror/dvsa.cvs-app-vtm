import { NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { PreventDoubleClickDirective } from '../../directives/prevent-double-click/prevent-double-click.directive';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgSwitch, NgSwitchCase, NgClass, NgTemplateOutlet, NgSwitchDefault, PreventDoubleClickDirective],
})
export class ButtonComponent extends RouterLinkWithHref {
	@Input() id?: string;
	@Input() disabled = false;
	@Input() type: 'link' | 'button' = 'button';
	@Input() design: '' | 'secondary' | 'warning' | 'link' = '';

	@Output() clicked = new EventEmitter();
}
