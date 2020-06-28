import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {removeFromCart, loadCartProducts, changeProductQuantity} from '../../config/actions/cartActions';
import {orderFromCart} from '../../config/actions/ordersActions';

const Cart = (props) => {
    const [isNew, setisNew] = useState(true);
    const [total, setTotal] = useState(0);
    const [cartLoaded, setCartLoaded]= useState(false);
    useEffect( () => {
        if(isNew && props.token) {
            props.dispatch(loadCartProducts(setCartLoaded));
            console.log(props.cartProducts);
            setisNew(false);
            
        }
        if(cartLoaded) {
            let temp = 0;
            props.cart.forEach( item => temp += (item.product.price * item.quantity))
            setTotal(temp);
        }
    }, [props, setisNew, isNew, total, setTotal, cartLoaded, setCartLoaded])
    return (props.cart)? (
        <div>
            <h3>Listing Products:</h3><hr/>
            {
                props.cart.map( (cartItem, index) => {
                    return (
                        <div key={index}>
                            <h4>{cartItem.product.name}</h4>
                            <div>
                                Price: {cartItem.product.price}
                            </div>
                            <div>
                                {"Quantity: "}
                                <button onClick={() => {props.dispatch(changeProductQuantity(cartItem.quantity - 1, cartItem._id))}} disabled={cartItem.quantity <= 1}>-</button>
                                {` ${cartItem.quantity} `}
                                <button onClick={() => {props.dispatch(changeProductQuantity(cartItem.quantity + 1, cartItem._id))}}>+</button>
                            </div>
                            <div>
                                {`Subtotal: ${cartItem.product.price * cartItem.quantity}`}
                            </div>
                            <button onClick={() => {props.dispatch(removeFromCart(cartItem.product._id));}}>
                                Remove From Cart
                            </button>

                            <hr/>
                        </div>
                    )
                })
            }
            <br/>
        <h4>Total: ${total}</h4>
        {
            (props.cart)? (
                <button onClick={() => {
                    if(total && props.user.wallet > total) {
                        if(window.confirm(`
                        Wallet:      ${props.user.wallet}
                        Cost:       -${total}
                    __________________________
                        Balance:    ${props.user.wallet - total}\n
                        Are you sure:`)) {
                            props.dispatch(
                                orderFromCart(props.history.push)
                            )
                        }
                    }
                }}>
                    Order
                </button>
            ): null
        }
        </div>
    ):<div></div>
}

const mapStateToProps = (state) => {
    const {cart, token, user} = state;
    return {cart, token, user};
}

export default connect(mapStateToProps)(Cart);