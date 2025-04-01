import { Component, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlComponent } from '../base-control/base-control.component';
import { NgIf, DatePipe } from '@angular/common';
import { DefaultNullOrEmpty } from '../../../pipes/default-null-or-empty/default-null-or-empty.pipe';

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
    imports: [
        NgIf,
        DatePipe,
        DefaultNullOrEmpty,
    ],
})
export class ReadOnlyComponent extends BaseControlComponent {
	readonly readOnlySuffix = input<string>();
	readonly date = input<boolean | undefined>(false);
}
