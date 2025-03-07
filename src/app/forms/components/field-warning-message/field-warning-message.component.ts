import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-field-warning-message',
	templateUrl: './field-warning-message.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgIf],
})
export class FieldWarningMessageComponent {
	@Input() warningMessage: string | undefined;
}
