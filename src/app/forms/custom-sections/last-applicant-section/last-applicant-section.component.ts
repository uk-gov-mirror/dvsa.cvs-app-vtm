import { V3TechRecordModel } from '@/src/app/models/vehicle-tech-record.model';
import { Component, input } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { LastApplicantSectionViewComponent } from './last-applicant-section-view/last-applicant-section-view.component';
import { LastApplicantSectionEditComponent } from './last-applicant-section-edit/last-applicant-section-edit.component';
import { LastApplicantSectionSummaryComponent } from './last-applicant-section-summary/last-applicant-section-summary.component';

@Component({
    selector: 'app-last-applicant-section',
    templateUrl: './last-applicant-section.component.html',
    styleUrls: ['./last-applicant-section.component.scss'],
    imports: [
        NgSwitch,
        NgSwitchCase,
        LastApplicantSectionViewComponent,
        LastApplicantSectionEditComponent,
        LastApplicantSectionSummaryComponent,
    ],
})
export class LastApplicantSectionComponent {
	mode = input<Mode>('edit');
	techRecord = input.required<V3TechRecordModel>();
}

type Mode = 'view' | 'edit' | 'summary';
