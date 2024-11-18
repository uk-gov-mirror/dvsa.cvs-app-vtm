import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import validateDate from 'validate-govuk-date';

@Injectable({ providedIn: 'root' })
export class CommonValidatorsService {
	max(size: number, message: string): ValidatorFn {
		return (control) => {
			if (control.value && control.value > size) {
				return { max: message };
			}

			return null;
		};
	}

	min(size: number, message: string): ValidatorFn {
		return (control) => {
			if (control.value && control.value < size) {
				return { min: message };
			}

			return null;
		};
	}

	maxLength(length: number, message: string): ValidatorFn {
		return (control) => {
			if (control.value && control.value.length > length) {
				return { maxLength: message };
			}

			return null;
		};
	}

	pattern(pattern: string | RegExp, message: string): ValidatorFn {
		return (control) => {
			if (control.value && !new RegExp(pattern).test(control.value)) {
				return { pattern: message };
			}

			return null;
		};
	}

	pastDate(message: string): ValidatorFn {
		return (control) => {
			if (control.value && new Date(control.value) > new Date()) {
				return { pastDate: message };
			}

			return null;
		};
	}

	pastOrCurrentYear(message: string): ValidatorFn {
		return (control) => {
			if (control.value && +control.value > new Date().getFullYear()) {
				return { pastOrCurrentYear: message };
			}

			return null;
		};
	}

	invalidDate(message: string): ValidatorFn {
		return (control) => {
			if (control.value && Number.isNaN(Date.parse(control.value))) {
				return { invalidDate: message };
			}

			return null;
		};
	}

	date(label: string): ValidatorFn {
		return (control) => {
			if (!control.value) return null;

			const parts = (control.value || '').split('-');

			const years = Number.parseInt(parts[0]);
			const months = Number.parseInt(parts[1]);
			const days = Number.parseInt(parts[2]);
			const errors = validateDate(days, months, years, label);

			if (errors.error) {
				// Only validate the day/month/year element if it has a value
				const sortedErrors = errors.errors?.sort((a, b) => a.index - b.index);

				if (days && sortedErrors?.[0].index === 0) {
					return { date: sortedErrors[0].reason };
				}

				if (months && sortedErrors?.[0].index === 1) {
					return { date: sortedErrors[0].reason };
				}

				if (sortedErrors?.[0].index === 2) {
					return { date: sortedErrors[0].reason };
				}
			}

			return null;
		};
	}
}
