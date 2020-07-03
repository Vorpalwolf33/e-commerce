import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {Switch, Route} from 'react-router-dom';

import {loadProduct, setProduct, removeProduct} from '../../config/actions/productActions';
import {addToCart, removeFromCart} from '../../config/actions/cartActions';
import {placeOrder} from '../../config/actions/ordersActions';
import {setRedirect, resetRedirect} from '../../config/actions/redirectActions';

const GuestProduct = (props) => {
    return (
        <div>
            {
                (props.product.images && props.product.images[0] && props.product.images[0].img)? (
                    <img src={props.product.images[0].img} alt=""/>
                ):null
            }
            <h4>{props.product.name}</h4>
            <div>Price: ${props.product.price}</div>
            <div>
                {
                    (props.product.isAvailable)?(
                        <button onClick={() => {props.dispatch(setRedirect(`/account/product/${props.product._id}`));props.history.push('/login')}}>
                            Buy
                        </button>
                    ):null
                }
            <div>{(props.product.isAvailable)?"Available":"Currently Unavailable"}</div>
            <p>{props.product.description}</p>
            </div>
        </div>
    )
}

const CustomerProduct = (props) => {
    const [isInCart, setIsInCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    useEffect( () => {
        if(props.cart && props.cart.filter((item) => item.product === props.match.params.id).length > 0) {
            setIsInCart(true);
        }
        if(props.cart && props.cart.filter((item) => item.product === props.match.params.id).length === 0) {
            setIsInCart(false);
        }
    }, [isInCart, props])
    return (
        <div>
            {
                (props.product.images && props.product.images[0] && props.product.images[0].img)? (
                    <img src={props.product.images[0].img} alt=""/>
                ):null
            }
            <h4>{props.product.name}</h4>
            <div>Price: ${props.product.price}</div>
            <div>
                {"Quantity: "}
                <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
                {` ${quantity}`}
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <div>
                <button disabled={!props.product.isAvailable} 
                    onClick={() => {props.dispatch(placeOrder({product: props.product._id, quantity}, props.history.push))
                }}>
                    Buy
                </button>
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
            </div>
            <div>{(props.product.isAvailable)?"Available":"Currently Unavailable"}</div>
            <p>{props.product.description}</p>
        </div>
    )
}

const AdminProduct = (props) => {
    return (
        <div>
            {
                (props.product.images && props.product.images[0] && props.product.images[0].img)? (
                    <img src={props.product.images[0].img} alt=""/>
                ):null
            }
            <h4>{props.product.name}</h4>
            <div>Price: ${props.product.price}</div>
            <div>
                <button onClick={ () => {props.dispatch(setProduct(props.product)); props.history.push(`/admin/product/modify/${props.product._id}`);}}>Modify</button>
                <button onClick={ () => { 
                    if(window.confirm("Are you sure")) {
                        props.dispatch(removeProduct(props.product._id, props.history.push));         
                    }
                    else {
                        console.log('no');
                }}}>
                Remove
                </button>
            </div>
            <div>{(props.product.isAvailable)?"Available":"Currently Unavailable"}</div>
            <p>{props.product.description}</p>
        </div>
    )
}

const ShowProduct = (props) => {
    const [isNew, setisNew] = useState(true);
    useEffect( () => {
        if(isNew) {
            props.dispatch(loadProduct(props.match.params.id));
            setisNew(false);
        }
        if(props.redirect && props.match.url === props.redirect) {
            props.dispatch(resetRedirect());
        }
    }, [props, isNew, setisNew])

    return (props.product)? (
            <div>
                <Switch>
                    <Route path="/admin/product/:id" component={connect(mapStateToProps)(AdminProduct)} />
                    <Route path="/account/product/:id" component={connect(mapStateToProps)(CustomerProduct)} />
                    <Route path="/product/:id" component={connect(mapStateToProps)(GuestProduct)} />
                </Switch>
            </div>
        ):<div></div>
}

const mapStateToProps = (state) => {
    const {product, cart, redirect} = state;
    return {product, cart, redirect};
}

export default connect(mapStateToProps)(ShowProduct);