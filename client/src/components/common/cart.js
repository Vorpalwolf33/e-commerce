import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {loadCartProducts, changeProductQuantity} from '../../config/actions/cartProductsActions';
import {removeFromCart} from '../../config/actions/cartActions';

const Cart = (props) => {
    const [isNew, setisNew] = useState(true);
    const [total, setTotal] = useState(0);
    const [cartLength, setCartLength]= useState(0);
    useEffect( () => {
        if(isNew && props.token) {
            props.dispatch(loadCartProducts());
            setisNew(false);
        }
        if(props.cartProducts && cartLength !== props.cartProducts) {
            setCartLength(props.cartProducts.length)
            let temp = 0;
            props.cartProducts.forEach( item => temp += (item.product.price * item.quantity))
            setTotal(temp);
        }
    }, [props, setisNew, isNew, total, setTotal, cartLength, setCartLength])
    return (props.cartProducts)? (
        <div>
            <h3>Listing Products:</h3><hr/>
            {
                props.cartProducts.map( (cartItem, index) => {
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
        <button>
            Order
        </button>
        </div>
    ):<div></div>
}

const mapStateToProps = (state) => {
    const {cartProducts, token} = state;
    return {cartProducts, token};
}

export default connect(mapStateToProps)(Cart);