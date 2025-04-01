import { V3TechRecordModel } from '@/src/app/models/vehicle-tech-record.model';
import { Component, input } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { NotesSectionViewComponent } from './notes-section-view/notes-section-view.component';
import { NotesSectionEditComponent } from './notes-section-edit/notes-section-edit.component';
import { NotesSectionSummaryComponent } from './notes-section-summary/notes-section-summary.component';

@Component({
    selector: 'app-notes-section',
    templateUrl: './notes-section.component.html',
    styleUrls: ['./notes-section.component.scss'],
    imports: [
        NgSwitch,
        NgSwitchCase,
        NotesSectionViewComponent,
        NotesSectionEditComponent,
        NotesSectionSummaryComponent,
    ],
})
export class NotesSectionComponent {
	mode = input<Mode>('edit');
	techRecord = input.required<V3TechRecordModel>();
}

type Mode = 'view' | 'edit' | 'summary';
