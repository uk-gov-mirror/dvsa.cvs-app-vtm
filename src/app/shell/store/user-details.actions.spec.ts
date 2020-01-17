import { GetUserDetailsActionSuccess } from './user-details.actions';

describe('UserDetails', () => {
  it('should create an instance', () => {
    expect(new GetUserDetailsActionSuccess({ msOid: 0, msUser: 'Test' })).toBeTruthy();
  });
});
