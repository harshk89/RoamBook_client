import { AUTH, LOGOUT, EDIT_DETAILS, RESET_CHANGE_STATUS, UPDATE_PASSWORD } from '../constants/actionTypes';

export default (state = { authData: null, changeStatus: "notInitiated" }, action) => {
    switch (action.type) {
        case AUTH: 
            localStorage.setItem('profile', JSON.stringify({ ...action.data }));
            return { ...state, authData: action.data };

        case LOGOUT:
            localStorage.clear();

            return { ...state, authData: null };

        case EDIT_DETAILS: 
            localStorage.setItem('profile', JSON.stringify({ ...action.data }));
            return { ...state, authData: action.data, changeStatus: "details-change-success" };

        case RESET_CHANGE_STATUS:
            return { ...state, changeStatus: action.status };

        case UPDATE_PASSWORD:
            localStorage.setItem('profile', JSON.stringify({ ...action.data }));
            return { ...state, authData: action.data, changeStatus: "pass-change-success" };
            
        default:
            return state;
    }
};
