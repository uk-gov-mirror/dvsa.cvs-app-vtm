import { Component, input, model } from '@angular/core';
import { NgIf, SlicePipe } from '@angular/common';

@Component({
    selector: 'collapsible-text',
    templateUrl: './collapsible-text.component.html',
    styleUrls: ['./collapsible-text.component.scss'],
    imports: [NgIf, SlicePipe],
})
export class CollapsibleTextComponent {
	readonly text = input('');
	readonly maxChars = input(0);
	isCollapsed = model(true);

	open() {
		this.isCollapsed.set(false);
	}

	close() {
		this.isCollapsed.set(true);
	}
}
