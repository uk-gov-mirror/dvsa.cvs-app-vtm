import { V3TechRecordModel } from '@/src/app/models/vehicle-tech-record.model';
import { Component, input } from '@angular/core';
import { BrakesSectionEditComponent } from '@forms/custom-sections/brakes-section/brakes-section-edit/brakes-section-edit.component';
import { BrakesSectionSummaryComponent } from '@forms/custom-sections/brakes-section/brakes-section-summary/brakes-section-summary.component';
import { BrakesSectionViewComponent } from '@forms/custom-sections/brakes-section/brakes-section-view/brakes-section-view.component';

@Component({
	selector: 'app-brakes-section',
	templateUrl: './brakes-section.component.html',
	styleUrls: ['./brakes-section.component.scss'],
	imports: [BrakesSectionViewComponent, BrakesSectionEditComponent, BrakesSectionSummaryComponent],
})
export class BrakesSectionComponent {
	mode = input<Mode>('edit');
	techRecord = input.required<V3TechRecordModel>();
}

type Mode = 'view' | 'edit' | 'summary';
