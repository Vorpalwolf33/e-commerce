import Axios from '../configAxios';

import {resetCart} from './cartActions';
import {cartProductsImageParser} from '../generalFunctions/imageParser'

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
                orders.forEach( (order, index) => {
                    cartProductsImageParser(order.orderItems);
                    orders[index] = order;
                })
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

export const ordersList = (filter) => {
    return (dispatch, getState) => {
        switch( filter ) {
            case "ordered":
                filter = "Order Placed";
                break;
            case "shipped":
                filter = "Shipped";
                break;
            case "outfordelivery":
                filter = "Out for Delivery";
                break;
            case "delivered":
                filter = "Delivered";
                break;
            default: break;
        }
        Axios.post('/admin/order/list', {filter}, {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data) {
                    dispatch(setOrders(data));
                }
                else {
                    console.log("Error while retrieving orders")
                }
            })
            .catch(err => console.log(err))
    }
}

export const loadOrderDetails = (_id) => {
    return (dispatch, getState) => {
        Axios.post('/admin/order/show', {_id}, {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data) {
                    dispatch(setOrders(data));
                }
            })
            .catch( err => console.log(err))
    }
}

export const progressOrder = (_id) => {
    return (dispatch, getState) => {
        Axios.post('admin/order/progress', {_id}, {headers: {"x-auth": getState().token}})
            .then( response => {
                if(response.data && response.data.status) {
                    const order = {...getState().orders};
                    order.status = response.data.status;
                    dispatch(setOrders(order));
                }
            })
            .catch( err => console.log(err))
    }
}