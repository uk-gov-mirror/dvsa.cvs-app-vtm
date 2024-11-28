import { Component, inject } from '@angular/core';
import { VehicleTypes } from '@models/vehicle-tech-record.model';
import { Store } from '@ngrx/store';
import { TechnicalRecordService } from '@services/technical-record/technical-record.service';
import { techRecord } from '@store/technical-records';

@Component({
	selector: 'app-vehicle-section-view',
	templateUrl: './vehicle-section-view.component.html',
	styleUrls: ['./vehicle-section-view.component.scss'],
})
export class VehicleSectionViewComponent {
	store = inject(Store);
	technicalRecordService = inject(TechnicalRecordService);

	techRecord = this.store.selectSignal(techRecord);
	protected readonly VehicleTypes = VehicleTypes;
}
