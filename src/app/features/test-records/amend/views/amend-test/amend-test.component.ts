import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-amend-test',
	templateUrl: './amend-test.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
})
export class AmendTestComponent {}
