import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TechnicalRecordFieldsComponent } from '../technical-record-fields.component';
import { FormGroup, FormControl } from '@angular/forms';
import { TechRecord } from '@app/models/tech-record.model';

@Component({
  selector: 'vtm-vehicle-summary-fields',
  templateUrl: './vehicle-summary.component.html',
  styleUrls: ['./vehicle-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleSummaryFieldsComponent extends TechnicalRecordFieldsComponent implements OnInit  {
  technicalRecord: FormGroup;
  options = { ['HGV']: 'hgv', ['PSV']: 'psv', ['Trailer']: 'trl' };

  ngOnInit() {
    this.technicalRecord = super.setUp();

    const summary: TechRecord = {} as TechRecord;

    this.technicalRecord.addControl('vehicleType', this.fb.control(''));
    this.technicalRecord.addControl('manufactureYear', this.fb.control(''));
    this.technicalRecord.addControl('', this.fb.control(''));




    
    // this.technicalRecord.addControl(
    //   'vehicleSummary',
    //   this.fb.group({
    //     vehicleType: this.fb.control(summary.vehicleSummary),
    //     regnDate: this.fb.control(summary.regnDate),
    //     manufactureYear: this.fb.control(summary.manufactureYear),
    //     noOfAxles: this.fb.control(summary.noOfAxles),
    //     dtpNumber: this.fb.control(summary.dtpNumber),
    //     parkingBrakeMrk: this.fb.control(summary.parkingBrakeMrk),

    //   })
    // );
  }

}
// summary.noOfAxles
// summary.dtpNumber
// summary.[axles].parkingBrakeMrk
// summary.speedLimiterMrk
// summary.tachoExemptMrk
// summary.euroStandard
// summary.fuelPropulsionSystem
// summary.roadFriendly
// summary.drawbarCouplingFitted
// summary.[vehicleClass].description
// summary.vehicleConfiguration
// summary.offRoad
// summary.numberOfWheelsDriven
// summary.euVehicleCategory
// summary.emissionsLimit
// summary.departmentalVehicleMarker