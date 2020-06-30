import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import {ordersList} from '../../../config/actions/ordersActions';

const OrdersList = (props) => {
    const [isNew, setisNew] = useState(true);
    const [filter, setFilter] = useState(props.match.params.filter);
    useEffect( () => {
        if(isNew) {
            props.dispatch(ordersList(filter));
            setisNew(false);
        }
        if(filter !== props.match.params.filter) {
            setFilter(props.match.params.filter);
            props.dispatch(ordersList(props.match.params.filter));
        }
    }, [props, isNew, filter]);

    return (props.orders)?(
        <div>
            {
                (props.orders.length)? (
                    <div>
                        {
                            props.orders.map( (order, index) => {
                                return (
                                    <div key={index} onClick={() => {props.history.push('/admin/order/show/' + order._id)}}>
                                        <div>
                                            User: {order.userId.username}
                                        </div>
                                        <div>
                                            Total: ${order.total}
                                        </div>
                                        <div>
                                            Status: {order.status}
                                        </div>
                                        <div>
                                            Date: {order.order_date.split('T')[0].split('-').reverse().join('-')}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ):"No orders in this category"
            }
        </div>
    ):null
}

const mapStateToProps = (state) => {
    const {orders} = state;
    return {orders};
}

export default connect(mapStateToProps)(OrdersList);