import { UserDetailsReducers } from './user-details.reducer';
import { initialUserDetailsState } from './user-details.state'

describe('UserDetails Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = UserDetailsReducers(initialUserDetailsState, action);

      expect(result).toBe(initialUserDetailsState);
    });
  });
});
