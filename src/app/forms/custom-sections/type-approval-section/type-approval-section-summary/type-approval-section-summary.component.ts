import { VehicleTypes } from '@/src/app/models/vehicle-tech-record.model';
import { TechnicalRecordChangesService } from '@/src/app/services/technical-record/technical-record-changes.service';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { editingTechRecord } from '@store/technical-records';

@Component({
	selector: 'app-type-approval-section-summary',
	templateUrl: './type-approval-section-summary.component.html',
	styleUrls: ['./type-approval-section-summary.component.scss'],
})
export class TypeApprovalSectionSummaryComponent {
	store = inject(Store);
	tcs = inject(TechnicalRecordChangesService);
	amendedTechRecord = this.store.selectSignal(editingTechRecord);

	protected readonly VehicleTypes = VehicleTypes;
}
