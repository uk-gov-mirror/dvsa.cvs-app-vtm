import { Component, inject } from '@angular/core';
import { VehicleTypes } from '@models/vehicle-tech-record.model';
import { Store } from '@ngrx/store';
import { techRecord } from '@store/technical-records';

@Component({
	selector: 'app-documents-section-view',
	templateUrl: './documents-section-view.component.html',
	styleUrls: ['./documents-section-view.component.scss'],
})
export class DocumentsSectionViewComponent {
	protected readonly VehicleTypes = VehicleTypes;
	store = inject(Store);
	techRecord = this.store.selectSignal(techRecord);
}
