import { Component, OnInit, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MultiOptions } from '@models/options.model';
import { FormNodeEditTypes, FormNodeWidth } from '@services/dynamic-forms/dynamic-form.types';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'app-switchable-input[form][type][name][isEditing]',
	templateUrl: './switchable-input.component.html',
	standalone: false,
})
export class SwitchableInputComponent implements OnInit {
	readonly type = input.required<FormNodeEditTypes>();
	readonly form = input.required<FormGroup>();
	readonly name = input.required<string>();

	readonly isEditing = input(true);

	readonly customId = input<string>();
	readonly idExtension = input<number>();
	readonly label = input<string>();
	readonly prefix = input<string>();
	readonly suffix = input<string>();
	readonly width = input<FormNodeWidth>();
	readonly options = input<MultiOptions | undefined>([]);
	readonly propOptions$ = input<Observable<MultiOptions>>();
	readonly hint = input<string>();
	readonly approvalType = input<string>();
	readonly approvalTypeChange = input<boolean | undefined>(false);

	readonly readOnlyDate = input<boolean>();
	readonly vehicleType = input<string | null>();
	delimiter = { regex: '\\. (?<!\\..\\. )', separator: '. ' };

	ngOnInit(): void {
		if (this.requiresOptions && !this.options() && !this.propOptions$()) {
			throw new Error('Cannot use autocomplete or radio control without providing an options array.');
		}
	}

	get requiresOptions(): boolean {
		const type = this.type();
		return (
			type === this.types.AUTOCOMPLETE ||
			type === this.types.CHECKBOXGROUP ||
			type === this.types.DROPDOWN ||
			type === this.types.RADIO
		);
	}

	get options$(): Observable<MultiOptions> {
		return this.propOptions$() ?? of(this.options() ?? []);
	}

	get types(): typeof FormNodeEditTypes {
		return FormNodeEditTypes;
	}
}
