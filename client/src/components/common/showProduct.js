import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import {loadProduct} from '../../config/actions/productActions';
import {addToCart, removeFromCart} from '../../config/actions/cartActions';

const ShowProduct = (props) => {
    const [isNew, setisNew] = useState(true);
    const [isInCart, setIsInCart] = useState(false);
    useEffect( () => {
        if(isNew) {
            props.dispatch(loadProduct(props.match.params.id));
            setisNew(false);
        }
        if(props.cart && props.cart.includes(props.match.params.id))
            setIsInCart(true);
        if(props.cart && !props.cart.includes(props.match.params.id)) 
            setIsInCart(false);
    }, [props, isNew, setisNew])

    return (props.product)? (
            <div>
                <h4>{props.product.name}</h4>
                <div>Price: ${props.product.price}</div>
                <div>
                    <button>Buy</button>
                    {
                        (!isInCart)? (
                                <button onClick={() => {props.dispatch(addToCart(props.product._id))}}>
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