import { VehicleTechRecordModel } from '@app/models/vehicle-tech-record.model';
import { VIEW_STATE } from '@app/app.enums';

export interface IVehicleTechRecordModelState {
  vehicleTechRecordModel: VehicleTechRecordModel[];
  selectedVehicleTechRecord: VehicleTechRecordModel;
  viewState: VIEW_STATE;
}

export const initialVehicleTechRecordModelState: IVehicleTechRecordModelState = {
  vehicleTechRecordModel: null,
  selectedVehicleTechRecord: null,
  viewState: VIEW_STATE.VIEW_ONLY
};
