import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import Navbar from '../common/navbar';
import Sidebar from '../common/sidebar';
import CustomerPageProducts from './customerComponents/customerPageProducts';
import ShowProduct from '../common/showProduct';
import Cart from '../common/cart';
import Wallet from './customerComponents/wallet';

import {loadHomePageProducts} from '../../config/actions/homePageProductsActions';
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
            props.dispatch(loadHomePageProducts());
            setisNew(false);
        }
    }, [props, setisNew, isNew])
    return (
        <div>
            <Navbar />
            {(window.location.pathname === "/account/search")?<Sidebar />: null}
            <Switch>
                <Route path="/account/home" component={CustomerPageProducts} exact={true}/>
                <Route path="/account/product/:id" component={ShowProduct} />
                <Route path="/account/cart" component={Cart} exact={true}/>
                <Route path="/account/wallet" component={Wallet} exact={true} />
            </Switch>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {homePageProducts, token} = state;
    return {homePageProducts, token};
}

export default connect(mapStateToProps)(CustomerHome);