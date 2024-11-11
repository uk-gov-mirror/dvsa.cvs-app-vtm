import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { GlobalErrorService } from '@core/components/global-error/global-error.service';

@Component({
	selector: 'app-control-errors',
	templateUrl: './control-errors.component.html',
})
export class ControlErrorsComponent {
	errorService = inject(GlobalErrorService);
	controlContainer = inject(ControlContainer);

	@Input({ required: true })
	for!: string;

	@Input({ required: false })
	forms: FormGroup[] = [];
}
