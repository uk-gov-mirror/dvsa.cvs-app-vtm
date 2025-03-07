import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-base-dialog',
	template: '',
	standalone: false,
})
export class BaseDialogComponent {
	@Output() action = new EventEmitter<string>();

	handleAction(action: string) {
		this.action.emit(action);
	}
}
