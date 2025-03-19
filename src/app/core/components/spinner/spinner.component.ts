import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
})
export class SpinnerComponent {
	readonly loading = input<boolean | null>(false);
}
