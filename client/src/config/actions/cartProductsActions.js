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

export const changeProductQuantity = (quantity, cart_id) => {
    return (dispatch, getState) => {
        if(quantity > 0) {
            Axios.post('/account/cart/quantity/change', {quantity, cart_id}, {headers: {"x-auth": getState().token}})
                .then( response => {
                    const {data} = response;
                    if(data.success) {
                        const cartProducts = [...getState().cartProducts];
                        cartProducts[cartProducts.findIndex((cartItem) => cartItem._id === cart_id)].quantity = quantity;
                        dispatch(setCartProducts(cartProducts));
                    }
                })
                .catch(err => console.log(err))
        }
    }
}