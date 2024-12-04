import {
	ALL_VEHICLE_CLASS_DESCRIPTION_OPTIONS,
	HGV_VEHICLE_CLASS_DESCRIPTION_OPTIONS,
	PSV_VEHICLE_CLASS_DESCRIPTION_OPTIONS,
	TRL_VEHICLE_CLASS_DESCRIPTION_OPTIONS,
} from '@/src/app/models/options.model';
import { VehicleTypes } from '@/src/app/models/vehicle-tech-record.model';
import { TechnicalRecordService } from '@/src/app/services/technical-record/technical-record.service';
import { Component, inject } from '@angular/core';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-verb';
import { Store } from '@ngrx/store';
import { editingTechRecord, techRecord } from '@store/technical-records';
import { isEqual } from 'lodash';

@Component({
	selector: 'app-vehicle-section-summary',
	templateUrl: './vehicle-section-summary.component.html',
	styleUrls: ['./vehicle-section-summary.component.scss'],
})
export class VehicleSectionSummaryComponent {
	readonly VehicleTypes = VehicleTypes;
	readonly HGV_VEHICLE_CLASS_DESCRIPTION_OPTIONS = HGV_VEHICLE_CLASS_DESCRIPTION_OPTIONS;
	readonly TRL_VEHICLE_CLASS_DESCRIPTION_OPTIONS = TRL_VEHICLE_CLASS_DESCRIPTION_OPTIONS;
	readonly PSV_VEHICLE_CLASS_DESCRIPTION_OPTIONS = PSV_VEHICLE_CLASS_DESCRIPTION_OPTIONS;
	readonly ALL_VEHICLE_CLASS_DESCRIPTION_OPTIONS = ALL_VEHICLE_CLASS_DESCRIPTION_OPTIONS;

	store = inject(Store);
	technicalRecordService = inject(TechnicalRecordService);

	currentTechRecord = this.store.selectSignal(techRecord);
	amendedTechRecord = this.store.selectSignal(editingTechRecord);

	hasChanged(property: string) {
		const current = this.currentTechRecord();
		const amended = this.amendedTechRecord();
		if (!current || !amended) return true;

		return !isEqual(current[property as keyof TechRecordType<'put'>], amended[property as keyof TechRecordType<'put'>]);
	}
}
