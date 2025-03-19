import { Component, input } from '@angular/core';

@Component({
	selector: 'collapsible-text',
	templateUrl: './collapsible-text.component.html',
	styleUrls: ['./collapsible-text.component.scss'],
	standalone: false,
})
export class CollapsibleTextComponent {
	readonly text = input('');
	readonly maxChars = input(0);
	readonly isCollapsed = input(true);

	open() {
		this.isCollapsed = false;
	}

	close() {
		this.isCollapsed = true;
	}
}
