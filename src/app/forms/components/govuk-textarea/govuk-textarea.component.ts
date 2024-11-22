import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, inject, input, model, output } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'govuk-textarea',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './govuk-textarea.component.html',
	styleUrls: ['./govuk-textarea.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GovukTextareaComponent),
			multi: true,
		},
	],
})
export class GovukTextareaComponent implements ControlValueAccessor {
	blur = output<FocusEvent>();
	focus = output<FocusEvent>();
	value = model<string | null>(null);
	disabled = model<boolean>(false);
	rows = input<number>(5);
	controlHint = input<string>('', { alias: 'hint' });
	controlName = input<string>('', { alias: 'formControlName' });
	controlLabel = input<string>('', { alias: 'label' });
	controlLimit = input<number | null>(null, { alias: 'limit' });
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
