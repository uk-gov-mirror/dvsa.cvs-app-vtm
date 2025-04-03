import { Component, input } from '@angular/core';
import { BrakesSectionEditComponent } from '@forms/custom-sections/brakes-section/brakes-section-edit/brakes-section-edit.component';
import { BrakesSectionSummaryComponent } from '@forms/custom-sections/brakes-section/brakes-section-summary/brakes-section-summary.component';
import { BrakesSectionViewComponent } from '@forms/custom-sections/brakes-section/brakes-section-view/brakes-section-view.component';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';

@Component({
	selector: 'app-brakes-section',
	templateUrl: './brakes-section.component.html',
	styleUrls: ['./brakes-section.component.scss'],
	imports: [BrakesSectionViewComponent, BrakesSectionEditComponent, BrakesSectionSummaryComponent],
})
export class BrakesSectionComponent {
	mode = input<Mode>('edit');
  techRecord = input.required<TechRecordType<'trl' | 'psv'>>();
}

type Mode = 'view' | 'edit' | 'summary';
