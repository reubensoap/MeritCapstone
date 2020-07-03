import * as ActionTypes from './ActionTypes';
import {BASE_URL, getCdOfferings, getCurrentUser} from '../Utils/APIUtils';

export const fetchCD = () => (dispatch) => {
    return getCdOfferings()
    .then(cds => dispatch(addCDs(cds)));
};

export const addCDs = (cds) => ({
    type: ActionTypes.ADD_CDS,
    payload: cds
});

export const fetchHolder = () => (dispatch) =>{
    return getCurrentUser()
    .then(holder => dispatch(addHolder(holder)))
    .catch(console.log('unable to find account'));
};

export const addHolder = (holder) => ({
    type:ActionTypes.ADD_HOLDER,
    payload: holder
});

export const logout = (value) => ({
    type: ActionTypes.LOGOUT,
    payload: value
});

export const authentication = (values) => ({
    type: ActionTypes.AUTHEN,
    payload:values
});