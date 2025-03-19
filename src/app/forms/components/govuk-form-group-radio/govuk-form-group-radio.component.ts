import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, input, output } from '@angular/core';
import {
	ControlContainer,
	ControlValueAccessor,
	FormsModule,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { MultiOption } from '@models/options.model';
import { CustomTag } from '@services/dynamic-forms/dynamic-form.types';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'govuk-form-group-radio',
	imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
	templateUrl: './govuk-form-group-radio.component.html',
	styleUrls: ['./govuk-form-group-radio.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GovukFormGroupRadioComponent),
			multi: true,
		},
	],
})
export class GovukFormGroupRadioComponent implements ControlValueAccessor {
	readonly blur = output<FocusEvent>();
	readonly focus = output<FocusEvent>();

	readonly value = input<string | number | boolean | null>(null);

	readonly disabled = input(false);

	readonly tags = input<CustomTag[]>([]);

	readonly options = input.required<MultiOption[]>();

	readonly controlHint = input('', { alias: 'hint' });

	readonly controlName = input.required<string>({ alias: 'formControlName' });

	readonly controlLabel = input.required<string>({ alias: 'label' });

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
}
