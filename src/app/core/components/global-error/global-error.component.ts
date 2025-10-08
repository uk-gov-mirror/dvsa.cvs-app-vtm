import { AsyncPipe } from '@angular/common';
import { Component, DOCUMENT, OnDestroy, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReplaySubject, takeUntil } from 'rxjs';
import { GlobalError } from './global-error.interface';
import { GlobalErrorService } from './global-error.service';

@Component({
	selector: 'app-global-error',
	templateUrl: './global-error.component.html',
	imports: [AsyncPipe],
})
export class GlobalErrorComponent implements OnInit, OnDestroy {
	title = inject(Title);
	document = inject(DOCUMENT);
	globalErrorService = inject(GlobalErrorService);

	destroy = new ReplaySubject<boolean>(1);

	goto(error: GlobalError) {
		if (error.anchorLink) {
			let focusCount = 0;

			document
				.querySelectorAll(`
          #${error.anchorLink},
          #${error.anchorLink} a[href]:not([tabindex='-1']),
          #${error.anchorLink} area[href]:not([tabindex='-1']),
          #${error.anchorLink} input:not([disabled]):not([tabindex='-1']),
          #${error.anchorLink} select:not([disabled]):not([tabindex='-1']),
          #${error.anchorLink} textarea:not([disabled]):not([tabindex='-1']),
          #${error.anchorLink} button:not([disabled]):not([tabindex='-1']),
          #${error.anchorLink} iframe:not([tabindex='-1']),
          #${error.anchorLink} [tabindex]:not([tabindex='-1']),
          #${error.anchorLink} [contentEditable=true]:not([tabindex='-1'])
      `)
				.forEach((el) => {
					if (el instanceof HTMLElement && focusCount < 2) {
						focusCount++;
						el.focus({ preventScroll: false });
					}
				});
		}
	}

	ngOnInit(): void {
		this.globalErrorService.errors$.pipe(takeUntil(this.destroy)).subscribe((errors) => {
			const title = this.title.getTitle();

			if (errors.length > 0) {
				// Set tab focus to the first error
				setTimeout(() => {
					this.document.getElementById(`${errors[0].anchorLink}-global-error`)?.focus({ preventScroll: true });
				}, 100);

				if (!title.startsWith('Error:')) {
					this.title.setTitle(`Error: ${title}`);
				}
			}

			if (errors.length === 0 && title.startsWith('Error:')) {
				this.title.setTitle(title.replace('Error: ', ''));
			}
		});
	}

	ngOnDestroy(): void {
		this.destroy.next(true);
		this.destroy.complete();
	}
}
