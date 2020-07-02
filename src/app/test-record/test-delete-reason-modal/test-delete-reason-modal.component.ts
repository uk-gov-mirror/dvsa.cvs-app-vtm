import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  response: string;
}

@Component({
  selector: 'vtm-test-delete-reason-modal',
  templateUrl: './test-delete-reason-modal.component.html',
  styleUrls: ['./test-delete-reason-modal.component.scss']
})
export class TestDeleteReasonModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TestDeleteReasonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  save(reason: string): void {
    this.dialogRef.close(reason);
  }
}
