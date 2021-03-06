import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import Navbar from '../common/navbar';
import Sidebar from '../common/sidebar';
import CustomerPageProducts from './customerComponents/customerPageProducts';
import ShowProduct from '../common/showProduct';
import Cart from '../common/cart';
import Wallet from './customerComponents/wallet';
import Order from './customerComponents/order';
import Profile from './customerComponents/profile';
import SearchedProducts from '../common/searchedProducts';

import {setToken} from '../../config/actions/tokenActions';
import {loadCart} from '../../config/actions/cartActions';
import {loadUserDetails} from '../../config/actions/userActions';

const CustomerHome = (props) => {
    const [isNew, setisNew] = useState(true);
    useEffect( () => {
        if(!props.token && localStorage.getItem('token')) {
            props.dispatch(setToken(localStorage.getItem('token')));
        }
        if(!props.token && !localStorage.getItem('token')) {
            props.history.push('/');
        }
        if(props.token && !props.user) {
            props.dispatch(loadUserDetails());
        }
        if(isNew) {
            props.dispatch(loadCart());
            if(props.redirect && props.match.url !== props.redirect) {
                props.history.push(props.redirect);
            }
            setisNew(false);
        }
    }, [props, setisNew, isNew])

    return (
        <div>
            <Navbar />
            <div>
                {(window.location.pathname === "/account/search")?<Sidebar />: null}
                <Switch>
                    <Route path="/account/home" component={CustomerPageProducts} exact={true}/>
                    <Route path="/account/product/:id" component={ShowProduct} />
                    <Route path="/account/cart" component={Cart} exact={true}/>
                    <Route path="/account/wallet" component={Wallet} exact={true} />
                    <Route path="/account/order" component={Order} exact={true} />
                    <Route path="/account/profile" component={Profile} exact={true} />
                    <Route path="/account/search" component={SearchedProducts} exact={true} />
                </Switch>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {homePageProducts, token, user, redirect} = state;
    return {homePageProducts, token, user, redirect};
}

export default connect(mapStateToProps)(CustomerHome);