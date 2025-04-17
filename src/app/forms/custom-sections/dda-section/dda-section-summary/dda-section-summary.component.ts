import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
	selector: 'app-dda-section-summary',
	templateUrl: './dda-section-summary.component.html',
	styleUrls: ['./dda-section-summary.component.scss'],
	imports: [FormsModule, ReactiveFormsModule],
})
export class DDASectionSummaryComponent implements OnInit, OnDestroy {
	ngOnDestroy(): void {}

	ngOnInit(): void {}
}
