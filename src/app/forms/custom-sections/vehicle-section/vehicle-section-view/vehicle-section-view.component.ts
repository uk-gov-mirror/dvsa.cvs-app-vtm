import { Component, inject } from '@angular/core';
import { VehicleTypes } from '@models/vehicle-tech-record.model';
import { Store } from '@ngrx/store';
import { techRecord } from '@store/technical-records';

@Component({
	selector: 'app-vehicle-section-view',
	templateUrl: './vehicle-section-view.component.html',
	styleUrls: ['./vehicle-section-view.component.scss'],
})
export class VehicleSectionViewComponent {
	store = inject(Store);

	techRecord = this.store.selectSignal(techRecord);
	protected readonly VehicleTypes = VehicleTypes;
}
