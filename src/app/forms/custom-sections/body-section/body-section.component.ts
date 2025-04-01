import { V3TechRecordModel } from '@/src/app/models/vehicle-tech-record.model';
import { Component, input } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { BodySectionViewComponent } from './body-section-view/body-section-view.component';
import { BodySectionEditComponent } from './body-section-edit/body-section-edit.component';
import { BodySectionSummaryComponent } from './body-section-summary/body-section-summary.component';

@Component({
    selector: 'app-body-section',
    templateUrl: './body-section.component.html',
    styleUrls: ['./body-section.component.scss'],
    imports: [
        NgSwitch,
        NgSwitchCase,
        BodySectionViewComponent,
        BodySectionEditComponent,
        BodySectionSummaryComponent,
    ],
})
export class BodySectionComponent {
	mode = input<Mode>('edit');
	techRecord = input.required<V3TechRecordModel>();
}

type Mode = 'view' | 'edit' | 'summary';
