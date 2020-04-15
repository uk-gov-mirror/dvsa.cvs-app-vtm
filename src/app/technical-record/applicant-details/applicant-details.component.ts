import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// needs to be technical-record.component in fact, we should not be duplicating the component
// or we might want to create an HGV one but that will be a page level
// need to check how hgv, psv differ
import { TechnicalRecordFieldsComponent } from '../technical-record-fields/technical-record-fields.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'vtm-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicantDetailsComponent extends TechnicalRecordFieldsComponent implements OnInit {
  technicalRecord: FormGroup;

  ngOnInit() {
    this.technicalRecord = super.setUp();

    this.technicalRecord.addControl('applicantDetails',
      this.fb.group({
        name: this.fb.control('name'),
        address1: this.fb.control('address1'),
        address2: this.fb.control('address2'),
        postTown: this.fb.control('postTown'),
        address3: this.fb.control('address3'),
        postCode: this.fb.control('postCode'),
        telephoneNumber: this.fb.control('telephoneNumber'),
        emailAddress: this.fb.control('emailAddress'),
      }));
  }

}
