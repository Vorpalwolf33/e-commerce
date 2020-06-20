import Axios from '../configAxios';

import {setToken} from './tokenActions';

export const loginUser = (userData, redirect) => {
    return (dispatch, getState) => {
        Axios.post('/login', userData)
            .then( (response => {
                if(response) {
                    const token = response.data.token;
                    dispatch(setToken(token));
                    dispatch(loadUserDetails(redirect));
                }
            }))
            .catch( err => console.log(err))
    }
}

export const setUser = (userData) => {
    return {
        type: "SET_USER",
        payload: userData
    }
}

export const registerUser = (userData) => {
    return (dispatch, getState) => {
        Axios.post('/register', userData)
            .then( response => {
                // console.log(response.data);                
            })
            .catch()
    }
}

export const loadUserDetails = (redirect) => {
    return (dispatch, getState) => {
        Axios.get('/account/home',{headers: {"x-auth": getState().token}})
            .then( response => {
                const user = response.data;
                dispatch(setUser(user));
                switch(user.role) {
                    case "Admin":
                        redirect("/admin/dashboard");
                        break;
                    case "Customer":
                        redirect("/account/home");
                        break;
                    default:
                        redirect("/login");
                        break;
                }
            })
            .catch(err => console.log(err))
    }
}