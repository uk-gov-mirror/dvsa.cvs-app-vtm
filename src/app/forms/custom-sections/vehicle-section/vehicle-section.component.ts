import { V3TechRecordModel } from '@/src/app/models/vehicle-tech-record.model';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, input } from '@angular/core';
import { VehicleSectionEditComponent } from './vehicle-section-edit/vehicle-section-edit.component';
import { VehicleSectionSummaryComponent } from './vehicle-section-summary/vehicle-section-summary.component';
import { VehicleSectionViewComponent } from './vehicle-section-view/vehicle-section-view.component';

@Component({
	selector: 'app-vehicle-section',
	templateUrl: './vehicle-section.component.html',
	styleUrls: ['./vehicle-section.component.scss'],
	imports: [
		NgSwitch,
		NgSwitchCase,
		VehicleSectionViewComponent,
		VehicleSectionEditComponent,
		VehicleSectionSummaryComponent,
	],
})
export class VehicleSectionComponent {
	mode = input<Mode>('edit');
	techRecord = input.required<V3TechRecordModel>();
}

type Mode = 'view' | 'edit' | 'summary';
