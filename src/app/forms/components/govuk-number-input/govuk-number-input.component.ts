import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, inject, input, model, output } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'govuk-number-input',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './govuk-number-input.component.html',
	styleUrls: ['./govuk-number-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GovukNumberInputComponent),
			multi: true,
		},
	],
})
export class GovukNumberInputComponent implements ControlValueAccessor {
	blur = output<FocusEvent>();
	focus = output<FocusEvent>();
	value = model<string | null>(null);
	disabled = model<boolean>(false);
	prefix = input<string>('');
	suffix = input<string>('');
	controlHint = input<string>('', { alias: 'hint' });
	controlName = input<string>('', { alias: 'formControlName' });
	controlLabel = input<string>('', { alias: 'label' });
	controlContainer = inject(ControlContainer);
	control = computed(() => this.controlContainer.control?.get(this.controlName()));
	controlId = input<string>('', { alias: 'id' });

	onChange = (_: any) => {};
	onTouched = () => {};

	writeValue(obj: any): void {
		this.value.set(obj);
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
