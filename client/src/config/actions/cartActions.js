import Axios from '../configAxios';

import {setCartProducts} from './cartProductsActions';

export const addToCart = (id) => {
    return (dispatch, getState) => {
        Axios.post("/account/cart/add", {product_id: id}, {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data.success) {
                    dispatch(setCart([...getState().cart, id]));
                }
            })
            .catch(err => console.log(err))
    }
}

export const removeFromCart = (id) => {
    return (dispatch, getState) => {
        Axios.post("/account/cart/remove", {id}, {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data.success) {
                    let cart = getState().cart;
                    cart = cart.filter( (productId) => productId !== id)
                    dispatch(setCart(cart));
                    let cartProducts = getState().cartProducts;
                    if(cartProducts) {
                        cartProducts = cartProducts.filter( product => product._id !== id)
                        dispatch(setCartProducts(cartProducts));
                    }
                }
            })
            .catch(err => console.log(err))
    }
}

export const loadCart = () => {
    return (dispatch, getState) => {
        Axios.get('/account/cart', {headers: {'x-auth': getState().token}})
            .then( response => {
                const {data} = response;
                if(data) {
                    dispatch(setCart(data));
                }
            })
            .catch(err => console.log(err))
    }
}

export const setCart = (cart) => {
    return {
        type: "SET_CART",
        payload: cart
    }
}