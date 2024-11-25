import { Directive, ElementRef, inject, input } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';

@Directive({
	selector: '[govukSelect]',
})
export class GovukSelectDirective {
	elementRef = inject<ElementRef<HTMLSelectElement>>(ElementRef);
	controlContainer = inject(ControlContainer);

	controlName = input.required<string>({ alias: 'formControlName' });

	destroy$ = new ReplaySubject<boolean>(1);

	ngOnInit(): void {
		const controlName = this.controlName();
		const control = this.controlContainer.control?.get(controlName);
		if (control) {
			this.elementRef.nativeElement.setAttribute('id', controlName);
			this.elementRef.nativeElement.setAttribute('name', controlName);
			this.elementRef.nativeElement.setAttribute('aria-labelledby', `${controlName}-label`);
			this.elementRef.nativeElement.classList.add('govuk-select');

			control.statusChanges.pipe(takeUntil(this.destroy$)).subscribe((statusChange) => {
				if (statusChange === 'INVALID' && control.touched) {
					this.elementRef.nativeElement.classList.add('govuk-select--error');
					this.elementRef.nativeElement.setAttribute('aria-describedby', `${controlName}-error`);
				}

				if (statusChange === 'VALID') {
					this.elementRef.nativeElement.classList.remove('govuk-select--error');
					this.elementRef.nativeElement.setAttribute('aria-describedby', '');
				}
			});
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
