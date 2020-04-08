import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TechnicalRecordFieldsComponent } from '../technical-record-fields.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'vtm-weights-fields',
  templateUrl: './weights-fields.component.html',
  styleUrls: ['./weights-fields.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeightsFieldsComponent extends TechnicalRecordFieldsComponent implements OnInit {
  technicalRecord: FormGroup;

  ngOnInit() {
    this.technicalRecord = super.setUp();

    this.technicalRecord.addControl('grossGbWeight', this.fb.control(''));
    this.technicalRecord.addControl('grossEecWeight', this.fb.control(''));
    this.technicalRecord.addControl('grossDesignWeight', this.fb.control(''));

    this.technicalRecord.addControl('trainGbWeight', this.fb.control(''));
    this.technicalRecord.addControl('trainEecWeight', this.fb.control(''));
    this.technicalRecord.addControl('trainDesignWeight', this.fb.control(''));

    this.technicalRecord.addControl('maxTrainGbWeight', this.fb.control(''));
    this.technicalRecord.addControl('maxTrainEecWeight', this.fb.control(''));
    this.technicalRecord.addControl('maxTrainDesignWeight', this.fb.control(''));

  }

}
