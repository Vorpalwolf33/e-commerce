import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import Navbar from '../common/navbar';
import CustomerPageProducts from './customerComponents/customerPageProducts';
import ShowProduct from '../common/showProduct';

import {loadHomePageProducts} from '../../config/actions/homePageProductsActions';

const CustomerHome = (props) => {
    const [isNew, setisNew] = useState(true);
    useEffect( () => {
        if(isNew) {
            props.dispatch(loadHomePageProducts());
        }
        setisNew(false);
    }, [props, setisNew])
    return (
        <div>
            <Navbar />
            
            <Switch>
                <Route path="/account/home" component={CustomerPageProducts} exact={true}/>
                <Route path="/account/product/:id" component={ShowProduct} />
            </Switch>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(CustomerHome);