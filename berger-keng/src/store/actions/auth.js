import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup = true) => {
    return async dispatch => {
        dispatch(authStart());
        
        try {
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfvMtlSmqKGED8BQMVBwBa3J_pplA4B-w';

            if (!isSignup) {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfvMtlSmqKGED8BQMVBwBa3J_pplA4B-w';
            }

            const response = await axios.post(
                url,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );

            console.log(response);

            const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000))

            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('expirationDate', expirationDate);

            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        } catch (error) {
            console.log(error);
            dispatch(authFail(error.response.data.error))
        }
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const idToken = localStorage.getItem('token');
        const localId = localStorage.getItem('userId');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));

        if (!idToken) {
            dispatch(logout());
        } else if (expirationDate > new Date()) {
            dispatch(authSuccess({
                idToken,
                localId
            }));
            dispatch(checkAuthTimeout(
                (expirationDate.getTime() - new Date().getTime()) / 1000
            ));
        } else {
            dispatch(logout());
        }
    }
}