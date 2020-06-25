import Axios from '../configAxios';

export const loadProductsList = () => {
    return (dispatch, getState) => {
        const token = (getState().token)?getState().token: localStorage.getItem('token');
        Axios.get('/account/productsList', {headers: {"x-auth": token}})
            .then( response => {
                const data = response.data;
                if(data && data != getState().productsList) {
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