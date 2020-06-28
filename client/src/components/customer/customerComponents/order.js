import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {loadOrders, cancelOrder} from '../../../config/actions/ordersActions';

const Order = (props) => {
    const [isNew, setisNew] = useState(true);
    useEffect( () => {
        if(isNew && props.token) {
            props.dispatch(loadOrders());
            setisNew(false); 
        }
    }, [props, isNew, setisNew])
    return (props.orders)? (
        <div>
            Listing Orders:
            {
                props.orders.map( (order, index) => (
                    <div key={index}>
                        {
                            order.orderItems.map( (item, ind) => (
                                <div key={ind}>
                                    <h4>{item.product.name}</h4>
                                    <div>Price: ${item.product.price}</div>
                                    <div>Quantity: {item.quantity}</div>
                                    <h5>Subtotal: ${item.product.price * item.quantity}</h5>
                                </div>
                            ))
                        }
                        <div>Total: {order.total}</div>
                        <button onClick={() => {props.dispatch(cancelOrder(order._id))}}>Cancel</button>
                    </div>
                ))
            }
        </div>
    ):<div></div>
}

const mapStateToProps = (state) => {
    const {orders, token} = state;
    return {orders, token};
}

export default connect(mapStateToProps)(Order);