import { Action } from '@ngrx/store';
import { GetUserDetailsAction, GetUserDetailsActionSuccess, GetUserDetailsActionFailure } from './user-details.actions';
import { initialUserDetailsState, IUserDetailsState } from './user-details.state';


export function UserDetailsReducers(state = initialUserDetailsState, 
  action: GetUserDetailsAction | GetUserDetailsActionSuccess | GetUserDetailsActionFailure): IUserDetailsState {
  switch (action.type) {
    case GetUserDetailsAction.TYPE: {
      return {
        ...state,
        msOid: action.payload.msOid,
        msUser: action.payload.msUser,
        error: null
      };
    }

    case GetUserDetailsActionSuccess.TYPE: {
      return {
        ...state,
        error: null
      }
    }

    case GetUserDetailsActionFailure.TYPE: {
      return {
        ...state,
        error: action.payload
      }
    }

    default:
      return state;
  }
}
