import Axios from '../configAxios';

import {resetCart} from './cartActions';

export const setOrders = (orders) => {
    return {
        type: "SET_ORDERS",
        payload: orders
    }
}

export const resetOrders = () => ({type: "RESET_ORDERS"})

export const placeOrder = (orderItem, redirect) => {
    return (dispatch, getState) => {
        Axios.post('/account/order/add', {orderItems: [orderItem], cartOrder: true}, {headers: {"x-auth": getState().token}})
            .then(response => {
                if(response.data.success) {        
                    dispatch(resetCart());
                    redirect('/account/order');
                }
                else alert("Unable to place order");
            })
            .catch(err => console.log(err))
    }
}

export const loadOrders = () => {
    return (dispatch, getState) => {
        Axios.get('/account/order/list', {headers: {"x-auth": getState().token}})
            .then( (response) => {
                const orders = response.data;
                if(orders) {
                    dispatch(setOrders(orders));
                }
            })
            .catch(err => console.log(err))
        }
}

export const cancelOrder = (id) => {
    return (dispatch, getState) => {
        Axios.post('/account/order/cancel', {id}, {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data.success) {
                    const orders = getState().orders.filter( order => order._id !== id);
                    dispatch(setOrders(orders));
                } 
            })
            .catch( err => console.log(err))
    }
}

export const orderFromCart = (redirect) => {
    return (dispatch, getState) => {
        Axios.get('/account/order/cartOrder', {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data.success && data.cartCleared) {
                    dispatch(resetCart());
                    redirect("/account/order");
                }
                if(data.success && !data.cartCleared) {
                    Axios.get('/account/cart/clear')
                        .then( resp => {
                            if(resp && resp.success) {
                                dispatch(resetCart());
                                redirect("/account/order");
                            }
                            else console.log("couldn't clear the cart")
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }
}