import Axios from '../configAxios';

import {setToken} from './tokenActions';

export const loginUser = (userData) => {
    return (dispatch, getState) => {
        Axios.post('/login', userData)
            .then( (response => {
                if(response) {
                    const token = response.data.token;
                    dispatch(setToken(token));
                }
            }))
            .catch( err => console.log(err))
    }
}

export const setUser = (userData) => {
    console.log(userData);
    return {
        payload: userData
    }
}

export const registerUser = (userData) => {
    return (dispatch, getState) => {
        Axios.post('/register', userData)
            .then( response => {
                // const user = response.data.user;
                console.log(response.data);
                
            })
            .catch()
    }
}