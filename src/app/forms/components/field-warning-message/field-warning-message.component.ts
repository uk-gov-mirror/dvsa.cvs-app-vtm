import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'app-field-warning-message',
	templateUrl: './field-warning-message.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
})
export class FieldWarningMessageComponent {
	readonly warningMessage = input<string>();
}
