import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[appToUppercase]',
	standalone: false,
})
export class ToUppercaseDirective {
	@HostListener('focusout', ['$event.target'])
	public onBlur(input: HTMLInputElement): void {
		input.value = input.value.toUpperCase();
		input.dispatchEvent(new Event('input'));
	}
}
