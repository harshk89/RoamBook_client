import { AUTH, LOGOUT, RESET_PASS_STATUS } from '../constants/actionTypes';

export default (state = { authData: null, passChangeStatus: "notInitiated" }, action) => {
    switch (action.type) {
        case AUTH: 
            localStorage.setItem('profile', JSON.stringify({ ...action.data }));

            return { ...state, authData: action.data };
        case LOGOUT:
            localStorage.clear();

            return { ...state, authData: null };
        case RESET_PASS_STATUS:
            return { ...state, passChangeStatus: action.status };
        default:
            return state;
    }
};
