import { CustomTag } from '@/src/app/services/dynamic-forms/dynamic-form.types';
import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, input, output } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@Component({
	selector: 'govuk-checkbox-group',
	imports: [CommonModule, FormsModule, SharedModule],
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
	readonly blur = output<FocusEvent>();
	readonly focus = output<FocusEvent>();

	readonly value = input<unknown[] | null>(null);

	readonly disabled = input(false);

	readonly tags = input<CustomTag[]>([]);

	readonly options =
		input.required<
			{
				value: any;
				label: string;
			}[]
		>();

	readonly controlHint = input('', { alias: 'hint' });

	readonly controlName = input('', { alias: 'formControlName' });

	readonly controlLabel = input('', { alias: 'label' });

	readonly controlId = input('', { alias: 'id' });

	controlContainer = inject(ControlContainer);

	get control() {
		return this.controlContainer.control?.get(this.controlName());
	}

	get id() {
		return this.controlId() || this.controlName();
	}

	get hintId() {
		return `${this.id}-hint`;
	}

	get labelId() {
		return `${this.id}-label`;
	}

	get errorId() {
		return `${this.id}-error`;
	}

	get hasError() {
		return this.control?.invalid && this.control?.touched && this.control?.errors;
	}

	onChange = (_: any) => {};
	onTouched = () => {};

	writeValue(obj: any): void {
		this.value = obj;
		this.onChange(obj);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	toggle(option: any) {
		const value = this.value();

		if (!value) {
			this.value = [option];
			this.onChange(this.value());
			return;
		}

		const arr = [...value];
		arr.includes(option) ? arr.splice(arr.indexOf(option), 1) : arr.push(option);
		this.value = arr;
		this.onChange(this.value());
	}

	isChecked(value: unknown) {
		return this.value()?.includes(value?.toString());
	}
}
