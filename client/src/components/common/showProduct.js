import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import {loadProduct} from '../../config/actions/productActions';
import {addToCart, removeFromCart} from '../../config/actions/cartActions';
import {placeOrder} from '../../config/actions/ordersActions';

const ShowProduct = (props) => {
    const [isNew, setisNew] = useState(true);
    const [isInCart, setIsInCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    useEffect( () => {
        if(isNew) {
            props.dispatch(loadProduct(props.match.params.id));
            setisNew(false);
        }
        if(props.cart && props.cart.filter((item) => item.product === props.match.params.id).length > 0) {
            setIsInCart(true);
        }
        if(props.cart && props.cart.filter((item) => item.product === props.match.params.id).length === 0) {
            setIsInCart(false);
        }  
    }, [props, isNew, setisNew, isInCart, setIsInCart])

    return (props.product)? (
            <div>
                <h4>{props.product.name}</h4>
                <div>Price: ${props.product.price}</div>
                <div>
                    {"Quantity: "}
                    <button onClick={() => setQuantity(quantity - 1)}>-</button>
                    {` ${quantity} `}
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <div>
                    <button disabled={!props.product.isAvailable} onClick={() => props.dispatch(placeOrder({product: props.product._id, quantity}, props.history.push))}>Buy</button>
                    {
                        (!isInCart)? (
                                <button onClick={() => {props.dispatch(addToCart({product: props.product._id, quantity}))}}>
                                    Add To Cart
                                </button>
                            ): (
                                <button onClick={() => {props.dispatch(removeFromCart(props.product._id))}}>
                                    Remove From Cart
                                </button>
                            )
                    }
                </div>
                <div>{(props.product.isAvailable)?"Available":"Currently Unavailable"}</div>
                <p>{props.product.description}</p>
            </div>
        ):<div></div>
}

const mapStateToProps = (state) => {
    const {product, cart} = state;
    return {product, cart};
}

export default connect(mapStateToProps)(ShowProduct);