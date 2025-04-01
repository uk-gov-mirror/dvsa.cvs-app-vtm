import { Component } from '@angular/core';
import { GlobalWarning } from './global-warning.interface';
import { GlobalWarningService } from './global-warning.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-global-warning',
    templateUrl: './global-warning.component.html',
    imports: [
        NgIf,
        NgFor,
        RouterLink,
        AsyncPipe,
    ],
})
export class GlobalWarningComponent {
	constructor(public globalWarningService: GlobalWarningService) {}

	goto(warning: GlobalWarning) {
		if (warning.anchorLink) {
			const el = document.getElementById(warning.anchorLink);
			el?.focus({ preventScroll: false });
		}
	}
}
