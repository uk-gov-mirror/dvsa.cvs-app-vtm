import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { NgSwitch, NgSwitchCase, NgClass, NgTemplateOutlet, NgSwitchDefault } from '@angular/common';
import { PreventDoubleClickDirective } from '../../directives/prevent-double-click/prevent-double-click.directive';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgSwitch,
        NgSwitchCase,
        NgClass,
        NgTemplateOutlet,
        NgSwitchDefault,
        PreventDoubleClickDirective,
    ],
})
export class ButtonComponent extends RouterLinkWithHref {
	readonly id = input<string>();
	readonly disabled = input(false);
	readonly type = input<'link' | 'button'>('button');
	readonly design = input<'' | 'secondary' | 'warning' | 'link'>('');

	readonly clicked = output();
}
