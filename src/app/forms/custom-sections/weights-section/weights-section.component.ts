import { V3TechRecordModel } from '@/src/app/models/vehicle-tech-record.model';
import { Component, input } from '@angular/core';

@Component({
	selector: 'app-weights-section',
	templateUrl: './weights-section.component.html',
	styleUrls: ['./weights-section.component.scss'],
})
export class WeightsSectionComponent {
	mode = input<Mode>('edit');
	techRecord = input.required<V3TechRecordModel>();
}

type Mode = 'view' | 'edit' | 'summary';
