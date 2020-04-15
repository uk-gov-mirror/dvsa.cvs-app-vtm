import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { TestRecordTestType } from '@app/models/test-record-test-type';
import { TestTypeCategory } from '@app/models/test-type-category';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'vtm-select-test-type',
  templateUrl: './select-test-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTestTypeComponent implements OnInit {
  @Input() testResultObj: TestRecordTestType;
  @Input() filteredCategories: TestTypeCategory[];
  @Output() selectTypeHandler = new EventEmitter<KeyValue<string, string>>();
  newTestTypeData: KeyValue<string, string>;

  constructor() {}

  ngOnInit() {}

  setNewTestTypeData(newTestTypeData: KeyValue<string, string>) {
    this.newTestTypeData = newTestTypeData;
  }

  updateSelectedTestResult() {
    this.selectTypeHandler.emit(this.newTestTypeData);
  }
}
