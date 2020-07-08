import { Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalPayload, ModalContent } from '@app/modal/modal.model';
import { EmissionDetailsComponent } from '../emission-details/emission-details.component';


@Component({
  selector: 'vtm-test-delete-reason-modal',
  templateUrl: './test-delete-reason-modal.component.html',
  styleUrls: ['./test-delete-reason-modal.component.scss']
})
export class TestDeleteReasonModalComponent {
  @Output() okCancelAction = new EventEmitter<ModalPayload>();
  @Input() modalContent: ModalContent;
  constructor() {}

  close(): void {
    // this.dialogRef.close();
    this.okCancelAction.emit({ isOk: false });
  }

  save(reason: string): void {
    // this.dialogRef.close(reason);
    this.okCancelAction.emit({ isOk: true, payload: reason });
  }
}
