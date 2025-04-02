import { FormNodeWidth, TagTypeLabels } from '@/src/app/services/dynamic-forms/dynamic-form.types';
import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TagType } from '@components/tag/tag.component';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { V3TechRecordModel, VehicleTypes } from '@models/vehicle-tech-record.model';
import { TechnicalRecordService } from '@services/technical-record/technical-record.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-brakes-section-edit',
  templateUrl: './brakes-section-edit.component.html',
  styleUrls: ['./brakes-section-edit.component.scss'],
})
export class BrakesSectionEditComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly controlContainer = inject(ControlContainer);
  private readonly technicalRecordService = inject(TechnicalRecordService);

  protected readonly FormNodeWidth = FormNodeWidth;
  protected readonly VehicleTypes = VehicleTypes;
  protected readonly TagType = TagType;
  protected readonly TagTypeLabels = TagTypeLabels;

  techRecord = input.required<V3TechRecordModel>();

  destroy$ = new ReplaySubject<boolean>(1);

  form = this.fb.group({});

  ngOnInit(): void {
    this.addControlsBasedOffVehicleType();

    // Attach all form controls to parent
    const parent = this.controlContainer.control;

    if (parent instanceof FormGroup) {
      for (const [key, control] of Object.entries(this.form.controls)) {
        parent.addControl(key, control, { emitEvent: false });
      }
    }
  }

  ngOnDestroy(): void {
    // Detach all form controls from parent
    const parent = this.controlContainer.control;

    if (parent instanceof FormGroup) {
      for (const key of Object.keys(this.form.controls)) {
        parent.removeControl(key, { emitEvent: false });
      }
    }

    // Clear subscriptions
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private addControlsBasedOffVehicleType() {
    const vehicleControls = this.controlsBasedOffVehicleType;

    for (const [key, control] of Object.entries(vehicleControls ?? {})) {
      this.form?.addControl(key, control, { emitEvent: false });
    }
  }

  shouldDisplayFormControl(formControlName: string) {
    return !!this.form.get(formControlName);
  }

  get vehicleType(): VehicleTypes {
    return this.technicalRecordService.getVehicleTypeWithSmallTrl(this.techRecord());
  }

  get controlsBasedOffVehicleType() {
    if (this.vehicleType === VehicleTypes.TRL) {
      return this.trlOnlyFields;
    }
    if (this.vehicleType === VehicleTypes.PSV) {
      return this.psvOnlyFields;
    }
    return null;
  }

  private get psvOnlyFields(): Partial<Record<keyof TechRecordType<'psv'>, FormControl>> {
    return {};
  }

  private get trlOnlyFields(): Partial<Record<keyof TechRecordType<'trl'>, FormControl>> {
    return {};
  }
}
