import * as ActionTypes from './ActionTypes';
import {BASE_URL, getCdOfferings} from '../Utils/APIUtils';

export const fetchCD = () => (dispatch) => {
    return getCdOfferings()
    .then(cds => dispatch(addCDs(cds)));
}

export const addCDs = (cds) => ({
    type: ActionTypes.ADD_CDS,
    payload: cds
});

export const authenticatation = (value) => ({
    type: ActionTypes.AUTHEN,
    payload: value
})