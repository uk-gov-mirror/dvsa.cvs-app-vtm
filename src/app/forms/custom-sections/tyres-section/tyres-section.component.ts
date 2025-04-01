import { Component, input } from '@angular/core';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { TyresSectionViewComponent } from './tyres-section-view/tyres-section-view.component';
import { TyresSectionEditComponent } from './tyres-section-edit/tyres-section-edit.component';
import { TyresSectionSummaryComponent } from './tyres-section-summary/tyres-section-summary.component';

@Component({
    selector: 'app-tyres-section',
    templateUrl: './tyres-section.component.html',
    styleUrls: ['./tyres-section.component.scss'],
    imports: [
        NgSwitch,
        NgSwitchCase,
        TyresSectionViewComponent,
        TyresSectionEditComponent,
        TyresSectionSummaryComponent,
    ],
})
export class TyresSectionComponent {
	mode = input<Mode>('edit');
	techRecord = input.required<TechRecordType<'hgv' | 'psv' | 'trl'>>();
}

type Mode = 'view' | 'edit' | 'summary';
