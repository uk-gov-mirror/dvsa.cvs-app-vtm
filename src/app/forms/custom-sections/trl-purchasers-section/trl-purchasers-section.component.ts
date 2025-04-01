import { Component, input } from '@angular/core';
import { V3TechRecordModel } from '@models/vehicle-tech-record.model';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { TRLPurchasersSectionViewComponent } from './trl-purchasers-section-view/trl-purchasers-section-view.component';
import { TRLPurchasersSectionEditComponent } from './trl-purchasers-section-edit/trl-purchasers-section-edit.component';
import { TRLPurchasersSectionSummaryComponent } from './trl-purchasers-section-summary/trl-purchasers-section-summary.component';

@Component({
    selector: 'app-trl-purchasers-section',
    templateUrl: './trl-purchasers-section.component.html',
    styleUrls: ['./trl-purchasers-section.component.scss'],
    imports: [
        NgSwitch,
        NgSwitchCase,
        TRLPurchasersSectionViewComponent,
        TRLPurchasersSectionEditComponent,
        TRLPurchasersSectionSummaryComponent,
    ],
})
export class TRLPurchasersSectionComponent {
	mode = input<Mode>('edit');
	techRecord = input.required<V3TechRecordModel>();
}

type Mode = 'view' | 'edit' | 'summary';
