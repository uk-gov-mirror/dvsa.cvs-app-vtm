import { RouterReducerState } from '@ngrx/router-store';
import { initialVehicleTechRecordModelState, IVehicleTechRecordModelState } from './VehicleTechRecordModel.state';
import { initialVehicleTestResultModelState, IVehicleTestResultModelState } from './VehicleTestResultModel.state';
import { initialUserDetailsState, IUserDetailsState } from './../../shell/store/user-details.state';

export interface IAppState {
  router?: RouterReducerState;
  vehicleTechRecordModel: IVehicleTechRecordModelState;
  vehicleTestResultModel: IVehicleTestResultModelState;
  userDetails: IUserDetailsState;
  error?: string | null; // track errors
}

export const initialAppState: IAppState = {
  vehicleTechRecordModel: initialVehicleTechRecordModelState,
  vehicleTestResultModel: initialVehicleTestResultModelState,
  userDetails: initialUserDetailsState,
};

export const getInitialState = (): IAppState => initialAppState;
