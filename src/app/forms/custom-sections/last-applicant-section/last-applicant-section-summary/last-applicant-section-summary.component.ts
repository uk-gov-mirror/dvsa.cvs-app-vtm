import { VehicleTypes } from '@/src/app/models/vehicle-tech-record.model';
import { TechnicalRecordChangesService } from '@/src/app/services/technical-record/technical-record-changes.service';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { editingTechRecord } from '@store/technical-records';

@Component({
	selector: 'app-last-applicant-section-summary',
	templateUrl: './last-applicant-section-summary.component.html',
	styleUrls: ['./last-applicant-section-summary.component.scss'],
})
export class LastApplicantSectionSummaryComponent {
	store = inject(Store);
	tcs = inject(TechnicalRecordChangesService);
	amendedTechRecord = this.store.selectSignal(editingTechRecord);

	protected readonly VehicleTypes = VehicleTypes;
}
