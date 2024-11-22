import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, inject, input, model, output } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'govuk-checkbox-group',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './govuk-checkbox-group.component.html',
	styleUrls: ['./govuk-checkbox-group.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GovukCheckboxGroupComponent),
			multi: true,
		},
	],
})
export class GovukCheckboxGroupComponent implements ControlValueAccessor {
	blur = output<FocusEvent>();
	focus = output<FocusEvent>();
	value = model<unknown[] | null>(null);
	disabled = model<boolean>(false);
	options = input.required<{ value: any; label: string }[]>();
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

	toggle(option: any) {
		const value = this.value();

		if (!value) {
			this.value.set([option]);
			this.onChange(this.value());
			return;
		}

		const arr = [...value];
		arr.includes(option) ? arr.splice(arr.indexOf(option), 1) : arr.push(option);
		this.value.set(arr);
		this.onChange(this.value());
	}

	isChecked(value: unknown) {
		return this.value()?.includes(value?.toString());
	}
}
