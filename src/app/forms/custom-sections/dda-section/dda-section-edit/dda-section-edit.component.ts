import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
	selector: 'app-dda-section-edit',
	templateUrl: './dda-section-edit.component.html',
	styleUrls: ['./dda-section-edit.component.scss'],
	imports: [FormsModule, ReactiveFormsModule],
})
export class DDASectionEditComponent implements OnInit, OnDestroy {
	ngOnDestroy(): void {}

	ngOnInit(): void {}
}
