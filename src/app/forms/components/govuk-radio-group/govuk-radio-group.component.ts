import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { ControlContainer, FormsModule } from '@angular/forms';

@Component({
	selector: 'govuk-radio-group',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './govuk-radio-group.component.html',
	styleUrls: ['./govuk-radio-group.component.scss'],
})
export class GovukRadioGroupComponent {
	controlHint = input<string>('', { alias: 'hint' });
	controlName = input<string>('', { alias: 'for' });
	controlLabel = input<string>('', { alias: 'label' });
	controlContainer = inject(ControlContainer);
	control = computed(() => this.controlContainer.control?.get(this.controlName()));
	controlId = input<string>('', { alias: 'id' });
}
