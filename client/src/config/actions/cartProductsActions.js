import Axios from '../configAxios';

export const setCartProducts = (products) => {
    return {
        type: "SET_CART_PRODUCTS",
        payload: products
    }
}

export const resetCartProducts = () => ({type: "RESET_CART_PRODUCTS"})

export const loadCartProducts = () => {
    return (dispatch, getState) => {
        Axios.get('/account/cart/list', {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data) {
                    dispatch(setCartProducts(data));
                }
            })
            .catch(err => console.log(err))
    }
}