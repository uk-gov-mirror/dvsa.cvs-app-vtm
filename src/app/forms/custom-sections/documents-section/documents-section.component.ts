import { V3TechRecordModel } from '@/src/app/models/vehicle-tech-record.model';
import { Component, input } from '@angular/core';

@Component({
	selector: 'app-documents-section',
	templateUrl: './documents-section.component.html',
	styleUrls: ['./documents-section.component.scss'],
})
export class DocumentsSectionComponent {
	mode = input<Mode>('edit');
	techRecord = input.required<V3TechRecordModel>();
}

type Mode = 'view' | 'edit' | 'summary';
