import { DatePipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultNullOrEmpty } from '../../../pipes/default-null-or-empty/default-null-or-empty.pipe';
import { BaseControlComponent } from '../base-control/base-control.component';

@Component({
	selector: 'app-read-only',
	templateUrl: './read-only.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: ReadOnlyComponent,
			multi: true,
		},
	],
	imports: [NgIf, DatePipe, DefaultNullOrEmpty],
})
export class ReadOnlyComponent extends BaseControlComponent {
	@Input() readOnlySuffix?: string;
	@Input() date?: boolean = false;
}
