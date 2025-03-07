import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsModule } from '@forms/dynamic-forms.module';
import { SharedModule } from '@shared/shared.module';
import { TechRecordSummaryComponent } from './components/tech-record-summary/tech-record-summary.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		DynamicFormsModule,
		SharedModule,
		TechRecordSummaryComponent,
	],
	exports: [TechRecordSummaryComponent],
})
export class SharedTechRecordsModule {}
