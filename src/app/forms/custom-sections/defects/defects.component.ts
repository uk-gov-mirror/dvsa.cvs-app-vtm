import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Defect } from '@models/defects/defect.model';
import { TestResultDefect } from '@models/test-results/test-result-defect.model';
import { TestResultModel } from '@models/test-results/test-result.model';
import { TruncatePipe } from '@pipes/truncate/truncate.pipe';
import { DynamicFormService } from '@services/dynamic-forms/dynamic-form.service';
import { CustomFormArray, CustomFormGroup, FormNode } from '@services/dynamic-forms/dynamic-form.types';
import { Subscription, debounceTime } from 'rxjs';
import { ButtonComponent } from '../../../components/button/button.component';
import { TagComponent } from '../../../components/tag/tag.component';

@Component({
	selector: 'app-defects[defects][template]',
	templateUrl: './defects.component.html',
	imports: [NgIf, FormsModule, ReactiveFormsModule, NgFor, RouterLink, TagComponent, ButtonComponent, TruncatePipe],
})
export class DefectsComponent implements OnInit, OnDestroy {
	@Input() isEditing = false;
	@Input() defects!: Defect[] | null;
	@Input() template!: FormNode;
	@Input() data: Partial<TestResultModel> = {};

	@Output() formChange = new EventEmitter();

	public form!: CustomFormGroup;
	private formSubscription = new Subscription();
	private defectsFormArray?: CustomFormArray;

	constructor(private dfs: DynamicFormService) {}

	ngOnInit(): void {
		this.form = this.dfs.createForm(this.template, this.data) as CustomFormGroup;
		this.formSubscription = this.form.cleanValueChanges.pipe(debounceTime(400)).subscribe((event) => {
			this.formChange.emit(event);
		});
	}

	ngOnDestroy(): void {
		this.formSubscription.unsubscribe();
	}

	get defectsForm(): CustomFormArray {
		if (!this.defectsFormArray) {
			this.defectsFormArray = this.form?.get(['testTypes', '0', 'defects']) as CustomFormArray;
		}
		return this.defectsFormArray;
	}

	get defectCount(): number {
		return this.defectsForm?.controls.length;
	}

	get testDefects(): TestResultDefect[] {
		return this.defectsForm.controls.map((control) => {
			const formGroup = control as CustomFormGroup;
			return formGroup.getCleanValue(formGroup) as TestResultDefect;
		});
	}

	categoryColor(category: CategoryColorKey): CategoryColor {
		return categoryColors[`${category}`];
	}
}

const categoryColors = {
	major: 'orange',
	minor: 'yellow',
	dangerous: 'red',
	advisory: 'blue',
} as const;

type CategoryColors = typeof categoryColors;
type CategoryColorKey = keyof CategoryColors;
type CategoryColor = CategoryColors[CategoryColorKey];
