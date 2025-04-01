import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-field-warning-message',
    templateUrl: './field-warning-message.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf],
})
export class FieldWarningMessageComponent {
	readonly warningMessage = input<string>();
}
