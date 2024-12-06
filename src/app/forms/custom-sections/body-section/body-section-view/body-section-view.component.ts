import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TechnicalRecordService } from '@services/technical-record/technical-record.service';
import { techRecord } from '@store/technical-records';

@Component({
	selector: 'app-body-section-view',
	templateUrl: './body-section-view.component.html',
	styleUrls: ['./body-section-view.component.scss'],
})
export class BodySectionViewComponent {
	store = inject(Store);
	technicalRecordService = inject(TechnicalRecordService);
	techRecord = this.store.selectSignal(techRecord);
}
