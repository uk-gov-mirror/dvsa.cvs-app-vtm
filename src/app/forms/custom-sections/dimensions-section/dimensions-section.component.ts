import { Component, input } from '@angular/core';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { DimensionsSectionViewComponent } from './dimensions-section-view/dimensions-section-view.component';
import { DimensionsSectionEditComponent } from './dimensions-section-edit/dimensions-section-edit.component';
import { DimenionsSectionSummaryComponent } from './dimensions-section-summary/dimensions-section-summary.component';

@Component({
    selector: 'app-dimensions-section',
    templateUrl: './dimensions-section.component.html',
    styleUrls: ['./dimensions-section.component.scss'],
    imports: [
        NgSwitch,
        NgSwitchCase,
        DimensionsSectionViewComponent,
        DimensionsSectionEditComponent,
        DimenionsSectionSummaryComponent,
    ],
})
export class DimensionsSectionComponent {
	mode = input<Mode>('edit');
	techRecord = input.required<TechRecordType<'hgv' | 'psv' | 'trl'>>();
}

type Mode = 'view' | 'edit' | 'summary';
