import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault,
    ],
})
export class IconComponent {
	readonly icon = input('');
}
