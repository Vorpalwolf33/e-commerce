import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import {loadProduct} from '../../config/actions/productActions';
import {addToCart, removeFromCart} from '../../config/actions/cartActions';
import {placeOrder} from '../../config/actions/ordersActions';
import {setRedirect, resetRedirect} from '../../config/actions/redirectActions';

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
        if(props.redirect && props.match.url === props.redirect) {
            props.dispatch(resetRedirect());
        }
    }, [props, isNew, setisNew, isInCart, setIsInCart])

    return (props.product)? (
            <div>
                <h4>{props.product.name}</h4>
                <div>Price: ${props.product.price}</div>
                <div>
                    {"Quantity: "}
                    <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
                    {` ${quantity} `}
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <div>
                    <button disabled={!props.product.isAvailable} 
                        onClick={() => {
                            if(props.match.path.includes("account"))
                                props.dispatch(placeOrder({product: props.product._id, quantity}, props.history.push))
                            else if(window.confirm("You have to login to perform this action")) {
                                props.dispatch(setRedirect("/account" + props.match.url));
                                props.history.push('/login');
                            }
                        }}>
                            Buy
                    </button>
                    {
                        (props.match.path.includes("account"))? (
                            <button onClick={() => {
                                if(isInCart) {
                                    props.dispatch(removeFromCart(props.product._id));
                                }
                                else {
                                    props.dispatch(addToCart({product: props.product._id, quantity}))
                                }
                            }}>
                                {(isInCart)?" Remove From Cart": "Add To Cart"}
                            </button>
                        ):null
                    }
                </div>
                <div>{(props.product.isAvailable)?"Available":"Currently Unavailable"}</div>
                <p>{props.product.description}</p>
            </div>
        ):<div></div>
}

const mapStateToProps = (state) => {
    const {product, cart, redirect} = state;
    return {product, cart, redirect};
}

export default connect(mapStateToProps)(ShowProduct);