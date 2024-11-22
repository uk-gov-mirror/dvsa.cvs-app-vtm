import { NumberOnlyDirective } from '@/src/app/directives/app-number-only/app-number-only.directive';
import { DateFocusNextDirective } from '@/src/app/directives/date-focus-next/date-focus-next.directive';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, forwardRef, inject, input, model, output } from '@angular/core';
import {
	ControlContainer,
	ControlValueAccessor,
	FormBuilder,
	FormsModule,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
	selector: 'govuk-date',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, DateFocusNextDirective, NumberOnlyDirective],
	templateUrl: './govuk-date.component.html',
	styleUrls: ['./govuk-date.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GovukDateComponent),
			multi: true,
		},
	],
})
export class GovukDateComponent implements ControlValueAccessor, OnInit, OnDestroy {
	blur = output<FocusEvent>();
	focus = output<FocusEvent>();
	value = model<string | null>(null);
	disabled = model<boolean>(false);
	mode = input<Format>('yyyy-mm-dd');
	controlHint = input<string>('', { alias: 'hint' });
	controlName = input<string>('', { alias: 'formControlName' });
	controlLabel = input<string>('', { alias: 'label' });
	fb = inject(FormBuilder);
	controlContainer = inject(ControlContainer);
	control = computed(() => this.controlContainer.control?.get(this.controlName()));
	controlId = input<string>('', { alias: 'id' });

	form = this.fb.group({
		year: this.fb.nonNullable.control<null | number>(null),
		month: this.fb.nonNullable.control<null | number>(null),
		day: this.fb.nonNullable.control<null | number>(null),
		hours: this.fb.nonNullable.control<null | number>(null),
		minutes: this.fb.nonNullable.control<null | number>(null),
		seconds: this.fb.nonNullable.control<null | number>(null),
	});

	destroy = new ReplaySubject<boolean>(1);

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
		isDisabled ? this.form.disable() : this.form.enable();
	}

	ngOnInit(): void {
		// Ensure events of children are propagated to the parent
		this.form.events.pipe(takeUntil(this.destroy)).subscribe((value) => {
			if ('touched' in value && value.touched) {
				this.onTouched();
			}
		});

		// Map the seperate form controls to a single date string
		this.form.valueChanges.pipe(takeUntil(this.destroy)).subscribe(() => {
			const { year, month, day, hours, minutes, seconds } = this.form.value;

			if (year === null && month === null && day === null) {
				this.onChange(null);
				return;
			}

			const monthStr = month?.toString().padStart(2, '0');
			const dayStr = day?.toString().padStart(2, '0');
			const hoursStr = hours?.toString().padStart(2, '0');
			const minsStr = minutes?.toString().padStart(2, '0');
			const secsStr = seconds?.toString().padStart(2, '0');

			switch (this.mode()) {
				case 'iso':
					this.onChange(`${year}-${monthStr}-${dayStr}T${hoursStr || '00'}:${minsStr || '00'}:${secsStr || '00'}`);
					break;
				default:
					this.onChange(`${year}-${monthStr}-${dayStr}`);
			}
		});
	}

	ngOnDestroy(): void {
		this.destroy.next(true);
		this.destroy.complete();
	}
}

type Format = 'iso' | 'yyyy-mm-dd';
