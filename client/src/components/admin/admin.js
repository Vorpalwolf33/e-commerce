import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import Navbar from '../common/navbar';
import Sidebar from '../common/sidebar';
import Dashboard from './adminComponents/dashboard';
import ListProducts from './adminComponents/products/listProducts';
import AddProduct from './adminComponents/products/addProduct';
import Categories from './adminComponents/categories';
import ModifyProduct from './adminComponents/products/modifyProduct';
import ShowProduct from '../common/showProduct';
import OrdersList from './adminComponents/ordersList';
import ShowOrder from './adminComponents/showOrder'

import {setToken} from '../../config/actions/tokenActions';

const Admin = (props) => {
    const [isNew, setisNew] = useState(true);

    useEffect( () => {
        if(isNew) {
            const token = localStorage.getItem('token');
            if(!props.token && token) {
                props.dispatch(setToken(token));
            }
            if(!props.token && !token) {
                props.history.push('/');
            }
            setisNew(false);
        }
    }, [props, isNew])
    return (props.token)?(
        <div>
            <Navbar /><hr/>
            <div>
                <Sidebar /><hr/>
                <Switch>
                    <Route path="/admin/dashboard" exact={true} component={Dashboard} />
                    <Route path="/admin/product" exact={true} component={ListProducts} />
                    <Route path="/admin/product/add" exact={true} component={AddProduct} />
                    <Route path="/admin/product/modify" exact={true} component={ModifyProduct} />
                    <Route path="/admin/categories" exact={true} component={Categories} />
                    <Route path="/admin/product/:id" exact={true} component={ShowProduct} />
                    <Route path="/admin/order/list/:filter" component={OrdersList} />
                    <Route path="/admin/order/show/:id" component={ShowOrder} />
                </Switch>
            </div>                
        </div>
    ):null
}

const mapStateToProps = (state) => {
    const {token} = state;
    return {token};
}

export default connect(mapStateToProps)(Admin);