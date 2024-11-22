import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, inject, input, model, output } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'govuk-checkbox',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './govuk-checkbox.component.html',
	styleUrls: ['./govuk-checkbox.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GovukCheckboxComponent),
			multi: true,
		},
	],
})
export class GovukCheckboxComponent implements ControlValueAccessor {
	model = model<string | null>(null);
	blur = output<FocusEvent>();
	focus = output<FocusEvent>();
	value = model<any>(null);
	disabled = model<boolean>(false);
	controlHint = input<string>('', { alias: 'hint' });
	controlName = input<string>('', { alias: 'formControlName' });
	controlLabel = input<string>('', { alias: 'label' });
	controlValue = input.required({ alias: 'value' });
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
