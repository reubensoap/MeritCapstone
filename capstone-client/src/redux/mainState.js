import * as ActionTypes from './ActionTypes';
import {getCdOfferings} from '../Utils/APIUtils';

export const MainState = (state = {
    cdofferings: [],
    isAuthenticated: false,
    accountHolder: null
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_CDS:
            return {...state, cdofferings: action.payload}
        case ActionTypes.AUTHEN:
            return {...state, isAuthenticated: action.payload}
        default:
            return state;
    }
};