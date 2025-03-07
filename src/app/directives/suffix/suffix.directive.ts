import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[appSuffix]',
	standalone: false,
})
export class SuffixDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
