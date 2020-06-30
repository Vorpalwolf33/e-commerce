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

export const loadProfile = () => {
    return (dispatch, getState) => {
        Axios.get('/account/profile', {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data.email) {
                    dispatch(setUser(data));
                }
                else console.log("Error loading user profile");
            })
            .catch( err => console.log(err))
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

export const addAddress = (address) => {
    return (dispatch, getState) => {
        Axios.post('/account/address/add', {address}, {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data && data.success) {
                    const user = {...getState().user};
                    address._id = data._id;
                    user.address.push(address);
                    dispatch(setUser(user));
                }
                else console.log("Some error occurred while adding the address");
            })
            .catch( err => console.log(err))
    }
}

export const removeAddress = (_id) => {
    return (dispatch, getState) => {
        Axios.post("/account/address/remove", {_id}, {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data && data.success) {
                    const user = {...getState().user};
                    user.address = user.address.filter( ele => ele._id !== _id);
                    dispatch(setUser({...user}));
                }
                else console.log("Some error occurred while adding the address");
            })
            .catch( err => console.log(err))
    }
}

export const updateUser = (user) => {
    return (dispatch, getState) => {
        Axios.post('/account/update', {user}, {headers: {"x-auth": getState().token}})
            .then( response => {
                if(response.data) {
                    dispatch(setUser(response.data));
                }
                else console.log("Some error occurred while updating the user");
            })
            .catch( err => console.log(err))
    }
}