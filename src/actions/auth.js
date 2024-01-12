import { AUTH, RESET_CHANGE_STATUS, EDIT_DETAILS, UPDATE_PASSWORD } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, setWrongPassErr, setLoading, navigate, setUser) => async (dispatch) => {
    try {
        const response = await api.signIn(formData);
        
        const data = response.data;
        setUser(data);
        dispatch({ type: AUTH, data }); 
        setLoading(false);
        navigate("/posts", {return: true});
    } catch (error) {
        if(error.response.status==400)
            setWrongPassErr("Username and password does not match!");
        else if(error.response.status==404)
            setWrongPassErr("User does not exist!");
        setLoading(false);
        console.log(error);
    }
}

export const signup = (formData, setLoading, navigate, setUser) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        // console.log("in actions/auth data received", data);

        setUser(data);
        dispatch({ type: AUTH, data });
        setLoading(false);

        navigate("/", {return: true});
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}

export const resetChangeStatus = () => async (dispatch) => {
    const status = "notInitiated";
    dispatch({ type: RESET_CHANGE_STATUS, status });
}

export const editDetails = (userDetails, setUser, setEditEnabled, setLoading) => async(dispatch) => {
    try {
        const { data } = await api.editDetails(userDetails);
        // console.log(data);
        setUser(data);
        dispatch({ type: EDIT_DETAILS, data });
        setLoading(false);
        setEditEnabled(false);
    } catch(error) {
        setLoading(false);
        console.log(error);
        const status = "details-change-failed";
        dispatch({ type: RESET_CHANGE_STATUS, status });
    }
}

export const updatePassword = (data, setUser, clear, setLoading) => async(dispatch) => {
    try {
        const response = await api.updatePassword(data);
        setUser(response.data);
        dispatch({ type: UPDATE_PASSWORD, data: response.data });
        setLoading(false);
        clear();
    } catch (error) {
        setLoading(false);
        console.log(error);
        const status = "pass-change-failed";
        dispatch({ type: RESET_CHANGE_STATUS, status });
    }
}