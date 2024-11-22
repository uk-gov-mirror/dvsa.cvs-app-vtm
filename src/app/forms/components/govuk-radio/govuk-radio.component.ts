import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, inject, input, model } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'govuk-radio',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './govuk-radio.component.html',
	styleUrls: ['./govuk-radio.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GovukRadioComponent),
			multi: true,
		},
	],
	host: { class: 'govuk-radios__item' },
})
export class GovukRadioComponent implements ControlValueAccessor {
	model = model<string | null>(null);
	disabled = model<boolean>(false);
	controlName = input<string>('', { alias: 'formControlName' });
	controlValue = input.required({ alias: 'value' });
	controlContainer = inject(ControlContainer);
	control = computed(() => this.controlContainer.control?.get(this.controlName()));
	controlId = input<string>('', { alias: 'id' });

	onChange = (_: any) => {};
	onTouched = () => {};

	writeValue(obj: any): void {
		this.model.set(obj);
		this.onChange(obj);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}
}
