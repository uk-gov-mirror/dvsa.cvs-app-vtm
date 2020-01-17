export interface IUserDetailsState {
    msOid: string;
    msUser: string;
    error?: any;
}

export const initialUserDetailsState: IUserDetailsState = {
    msOid: null,
    msUser: null,
    error: null
}
