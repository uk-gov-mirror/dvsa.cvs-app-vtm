import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
	selector: 'govuk-option',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './govuk-option.component.html',
	styleUrls: ['./govuk-option.component.scss'],
})
export class GovukOptionComponent {
	optionValue = input.required({ alias: 'value' });
}
