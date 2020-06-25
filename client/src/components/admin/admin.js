import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import Navbar from '../common/navbar';
import Sidebar from '../common/sidebar';
import Dashboard from './adminComponents/dashboard';
import ListProducts from './adminComponents/products/listProducts';
import AddProduct from './adminComponents/products/addProduct';
import Categories from './adminComponents/categories';
import ModifyProduct from './adminComponents/products/modifyProduct';

import {setToken} from '../../config/actions/tokenActions';

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if(!this.props.token && token) {
            this.props.dispatch(setToken(token));
        }
        if(!this.props.token && !token) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
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
                    </Switch>
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {token} = state;
    return {token};
}

export default connect(mapStateToProps)(Admin);