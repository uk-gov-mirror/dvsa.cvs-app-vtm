import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { routerReducer } from '@ngrx/router-store';
import { VehicleTechRecordModelReducers } from './VehicleTechRecordModel.reducers';
import { VehicleTestResultModelReducers } from './VehicleTestResultModel.reducers';
import { UserDetailsReducers } from './../../shell/store/user-details.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  vehicleTechRecordModel: VehicleTechRecordModelReducers,
  vehicleTestResultModel: VehicleTestResultModelReducers,
  userDetails: UserDetailsReducers,
};
