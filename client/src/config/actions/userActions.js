import Axios from '../configAxios';

import {setToken, resetToken} from './tokenActions';

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

export const registerUser = (userData, redirect) => {
    return (dispatch, getState) => {
        Axios.post('/register', userData)
            .then( response => {
                const data = response.data;
                if(data.role)
                    redirect("/login");
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
                if(!window.location.pathname.includes("admin") && !window.location.pathname.includes("account")) {
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
                }
            })
            .catch(err => console.log(err))
    }
}

export const logoutUser = (redirect) => {
    return (dispatch, getState) => {
        Axios.get('/logout', {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data) {
                    dispatch(resetToken());
                    redirect('/');
                }
            })
            .catch( err => console.log(err))
    }
}

export const addMoney = (money) => {
    return (dispatch, getState) => {
        Axios.post('/account/wallet/addMoney', {money}, {headers: {"x-auth": getState().token}})
            .then( response => {
                if(response.data && response.data.success) {
                    const user = {...getState().user};
                    user.wallet += money;
                    dispatch(setUser(user));    
                }
            })
            .catch()
    }
}