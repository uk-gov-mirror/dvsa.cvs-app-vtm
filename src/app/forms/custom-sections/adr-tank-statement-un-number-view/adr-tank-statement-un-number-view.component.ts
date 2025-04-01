import { Component } from '@angular/core';
import { BaseControlComponent } from '@forms/components/base-control/base-control.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-adr-tank-statement-un-number-view',
    templateUrl: './adr-tank-statement-un-number-view.component.html',
    styleUrls: ['./adr-tank-statement-un-number-view.component.scss'],
    imports: [NgIf, NgFor],
})
export class AdrTankStatementUnNumberViewComponent extends BaseControlComponent {}
