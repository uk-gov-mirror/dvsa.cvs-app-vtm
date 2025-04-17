import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
	selector: 'app-dda-section-view',
	templateUrl: './dda-section-view.component.html',
	styleUrls: ['./dda-section-view.component.scss'],
	imports: [FormsModule, ReactiveFormsModule],
})
export class DDASectionViewComponent implements OnInit, OnDestroy {
	ngOnDestroy(): void {}

	ngOnInit(): void {}
}
