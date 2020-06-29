import Axios from '../configAxios';

import {sortProductsByPrice} from '../generalFunctions/filters';

export const loadProductsList = () => {
    return (dispatch, getState) => {
        const token = (getState().token)?getState().token: localStorage.getItem('token');
        Axios.get('/account/productsList', {headers: {"x-auth": token}})
            .then( response => {
                const data = response.data;
                if(data && data !== getState().productsList) {
                    dispatch(setProductsList(data));
                }
            })
            .catch(err => console.log(err))
    }
}

export const setProductsList = (products) => {
    return {
        type: "SET_PRODUCTS_LIST",
        payload: products
    }
}

export const resetProductsList = () => ({type: "RESET_PRODUCTS_LIST"})

export const searchProducts = (searchTerm, sortBy) => {
    return (dispatch, getState) => {
        Axios.post('/account/product/search', {searchTerm}, {headers: {"x-auth": getState().token}})
            .then( response => {
                if(response.data) {
                    if(response.data.err) {
                            dispatch(setProductsList([])); 
                    }
                    else {
                        if(sortBy) {
                            dispatch(setProductsList(sortProductsByPrice([...response.data], sortBy)));
                        }
                        else {
                            dispatch(setProductsList(response.data));
                        }
                    }
                }
                else console.log("Unable to find your Product")
            })
            .catch( err => console.log(err))
    }
}

export const searchGuestProducts = (searchTerm, sortBy) => {
    return (dispatch, getState) => {
        Axios.post('/product/search', {searchTerm})
            .then( response => {
                if(response.data) {
                    if(response.data.err) {
                            dispatch(setProductsList([])); 
                    }
                    else {
                        if(sortBy) {
                            dispatch(setProductsList(sortProductsByPrice([...response.data], sortBy)));
                        }
                        else {
                            dispatch(setProductsList(response.data));
                        }
                    }
                }
                else console.log("Unable to find your Product")
            })
            .catch( err => console.log(err))
    }
}