import Axios from '../configAxios';

export const addToCart = (cartItem) => {
    return (dispatch, getState) => {
        Axios.post("/account/cart/add", {cartItem}, {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data.success) {
                    dispatch(setCart([...getState().cart, cartItem]));
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
                    let cart = [...getState().cart];
                    cart = cart.filter( (item) => item.product._id !== id && item.product !== id)
                    dispatch(setCart(cart));
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

export const loadCartProducts = (setCartLoaded) => {
    return (dispatch, getState) => {
        Axios.get('/account/cart/list', {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data) {
                    setCartLoaded(true);
                    dispatch(setCart(data));
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
                        const cart = [...getState().cart];
                        cart[cart.findIndex((cartItem) => cartItem._id === cart_id)].quantity = quantity;
                        dispatch(setCart(cart));
                    }
                })
                .catch(err => console.log(err))
        }
    }
}

export const setCart = (cart) => {
    return {
        type: "SET_CART",
        payload: cart
    }
}

export const resetCart = () => ({type: "RESET_CART"})