import { ButtonGroupComponent } from '@/src/app/components/button-group/button-group.component';
import { ButtonComponent } from '@/src/app/components/button/button.component';
import { Component } from '@angular/core';

@Component({
	selector: 'app-create-tech-record-v2',
	templateUrl: './create-tech-record-v2.component.html',
	styleUrls: ['./create-tech-record-v2.component.scss'],
	imports: [ButtonGroupComponent, ButtonComponent],
})
export class CreateTechRecordV2Component {}
