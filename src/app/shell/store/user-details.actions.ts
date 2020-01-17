import { Action } from '@ngrx/store';
import { UserDetailsModel } from './user-details.model';

export class GetUserDetailsAction implements Action {
  static readonly TYPE = 'UserDetails/GET_DETAILS_ACTION';
  readonly type = GetUserDetailsAction.TYPE;
  constructor(public payload: UserDetailsModel) {  }
}

export class GetUserDetailsActionSuccess implements Action {
  static readonly TYPE = 'UserDetails/GET_DETAILS_ACTION_SICCESS';
  readonly type = GetUserDetailsActionSuccess.TYPE;
  constructor(public payload: any) {  }
}

export class GetUserDetailsActionFailure implements Action {
  static readonly TYPE = 'UserDetails/GET_DETAILS_ACTION_FAILURE';
  readonly type = GetUserDetailsActionFailure.TYPE;
  constructor(public payload: any) {  }
};
