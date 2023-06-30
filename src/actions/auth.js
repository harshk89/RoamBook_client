import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data }); 

        navigate("/", {return: true});
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        console.log("in actions/auth data received", data);

        dispatch({ type: AUTH, data });

        navigate("/", {return: true});
    } catch (error) {
        console.log(error);
    }
}

