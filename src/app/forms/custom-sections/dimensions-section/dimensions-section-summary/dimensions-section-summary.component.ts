import { VehicleTypes } from '@/src/app/models/vehicle-tech-record.model';
import { TechnicalRecordChangesService } from '@/src/app/services/technical-record/technical-record-changes.service';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { editingTechRecord } from '@store/technical-records';

@Component({
	selector: 'app-dimensions-section-summary',
	templateUrl: './dimensions-section-summary.component.html',
	styleUrls: ['./dimensions-section-summary.component.scss'],
})
export class DimenionsSectionSummaryComponent {
	readonly VehicleTypes = VehicleTypes;

	store = inject(Store);
	tcs = inject(TechnicalRecordChangesService);
	amendedTechRecord = this.store.selectSignal(editingTechRecord);
}
