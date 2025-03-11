import { TechnicalRecordChangesService } from '@/src/app/services/technical-record/technical-record-changes.service';
import { editingTechRecord } from '@/src/app/store/technical-records';
import { Component, inject } from '@angular/core';
import { VehicleTypes } from '@models/vehicle-tech-record.model';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-body-section-summary',
	templateUrl: './body-section-summary.component.html',
	styleUrls: ['./body-section-summary.component.scss'],
})
export class BodySectionSummaryComponent {
	protected readonly VehicleTypes = VehicleTypes;
	store = inject(Store);
	amendedTechRecord = this.store.selectSignal(editingTechRecord);
	tcs = inject(TechnicalRecordChangesService);
}
