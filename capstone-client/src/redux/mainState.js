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
        case ActionTypes.LOGOUT:
            return {...state, isAuthenticated: action.payload, accountHolder: null}
        case ActionTypes.ADD_HOLDER:
            return {...state, accountHolder: action.payload}
        case ActionTypes.REMOVE_HOLDER:
            return {...state, acountHolder: null}
        default:
            return state;
    }
};