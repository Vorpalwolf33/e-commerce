import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'

import {loadOrderDetails, progressOrder} from '../../../config/actions/ordersActions';

const ShowOrder = (props) => {
    const [id, setId] = useState(props.match.params.id);
    const [isNew, setisNew] = useState(true);

    useEffect( () => {
        if(id !== props.match.params.id) {
            props.dispatch(loadOrderDetails(props.match.params.id));
            setId(props.match.params.id);
        }
        if(isNew) {
            props.dispatch(loadOrderDetails(id));
            setisNew(false);
        }
    }, [props, id, isNew])

    return (props.orders && props.orders._id)?(
        <div>
            <div>
                User: {props.orders.userId.username}
            </div>
            <div>
                OrderDate: {props.orders.order_date.split('T')[0].split('-').reverse().join('-')}
            </div>
            <div>
                Status: {props.orders.status}
                {
                    (props.orders.status !== "Delivere")? (
                        <button onClick={() => {props.dispatch(progressOrder(props.orders._id))}}>Progress Order</button>
                    ):null
                }
            </div>
            <div>
                Products:
                <div>
                    {
                        props.orders.orderItems.map( (item, index) => {
                            return (
                                <div key={index} onClick={() => props.history.push('/admin/product/' + item.product._id)}>
                                    <br/>
                                    <div>{item.product.name}</div>
                                    <div>Price: ${item.product.price}</div>
                                    <div>Quantity: {item.quantity}</div>
                                    <div>Subtotal: ${item.product.price*item.quantity}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <br/>
            </div>
                <div>Total: ${props.orders.total}</div>
        </div>
    ):<div>Order is loading...</div>
}

const mapStateToProps = (state) => {
    const {orders} = state;
    return {orders};
}

export default connect(mapStateToProps)(ShowOrder);