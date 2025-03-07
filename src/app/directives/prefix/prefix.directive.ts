import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[appPrefix]',
	standalone: false,
})
export class PrefixDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
