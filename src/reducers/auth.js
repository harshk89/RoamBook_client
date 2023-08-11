import { AUTH, LOGOUT, EDIT_DETAILS, RESET_PASS_STATUS, UPDATE_PASSWORD } from '../constants/actionTypes';

export default (state = { authData: null, passChangeStatus: "notInitiated" }, action) => {
    switch (action.type) {
        case AUTH: 
            localStorage.setItem('profile', JSON.stringify({ ...action.data }));

            return { ...state, authData: action.data };

        case LOGOUT:
            localStorage.clear();

            return { ...state, authData: null };

        case EDIT_DETAILS: 
            return {...state, authData: action.data };

        case RESET_PASS_STATUS:
            return { ...state, passChangeStatus: action.status };

        case UPDATE_PASSWORD:
            localStorage.setItem('profile', JSON.stringify({ ...action.data }));
            return { ...state, authData: action.data, passChangeStatus: "successful" };
            
        default:
            return state;
    }
};
