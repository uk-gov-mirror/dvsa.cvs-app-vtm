import { TechnicalRecordChangesService } from '@/src/app/services/technical-record/technical-record-changes.service';
import { Component, Signal, inject } from '@angular/core';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { Axle, VehicleTypes } from '@models/vehicle-tech-record.model';
import { Store } from '@ngrx/store';
import { editingTechRecord, techRecord } from '@store/technical-records';
import { isEqual } from 'lodash';

@Component({
	selector: 'app-weights-section-summary',
	templateUrl: './weights-section-summary.component.html',
	styleUrls: ['./weights-section-summary.component.scss'],
})
export class WeightsSectionSummaryComponent {
	protected readonly VehicleTypes = VehicleTypes;

	store = inject(Store);
	tcs = inject(TechnicalRecordChangesService);

	currentTechRecord = this.store.selectSignal(techRecord) as Signal<TechRecordType<'hgv' | 'psv' | 'trl'>>;
	amendedTechRecord = this.store.selectSignal(editingTechRecord) as Signal<TechRecordType<'hgv' | 'psv' | 'trl'>>;

	hasAxleChanged(amended: Axle | null | undefined): boolean {
		if (!amended) return true;
		const current = this.currentTechRecord()?.techRecord_axles?.find((axle) => axle.axleNumber === amended.axleNumber);
		if (!current) return true;
		return !isEqual(current, amended);
	}

	hasHGVOrTRLGrossAxleChanged() {
		return this.tcs.hasChanged('techRecord_grossEecWeight', 'techRecord_grossDesignWeight', 'techRecord_grossGbWeight');
	}

	hasPsvGrossAxleChanged() {
		return this.tcs.hasChanged(
			'techRecord_grossKerbWeight',
			'techRecord_grossLadenWeight',
			'techRecord_grossGbWeight',
			'techRecord_grossDesignWeight'
		);
	}

	hasHgvTrainAxleChanged() {
		return this.tcs.hasChanged('techRecord_trainDesignWeight', 'techRecord_trainGbWeight', 'techRecord_trainEecWeight');
	}

	hasPsvTrainAxleChanged() {
		return (
			this.tcs.hasChanged('techRecord_maxTrainGbWeight') || this.hasAxleChanged('techRecord_trainDesignWeight' as any)
		);
	}

	hasMaxTrainAxleChanged() {
		return this.tcs.hasChanged(
			'techRecord_maxTrainDesignWeight',
			'techRecord_maxTrainEecWeight',
			'techRecord_maxTrainGbWeight'
		);
	}
}
