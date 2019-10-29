import {VehicleTechRecordModel} from '../../models/vehicle-tech-record.model';

export interface IVehicleTechRecordModelState {
  vehicleTechRecordModel: VehicleTechRecordModel;
  selectedVehicleTechRecordModel: VehicleTechRecordModel;
}

export const initialVehicleTechRecordModelState: IVehicleTechRecordModelState = {
  vehicleTechRecordModel: null,
  selectedVehicleTechRecordModel: null
}
