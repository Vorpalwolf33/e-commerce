import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import Navbar from '../common/navbar';
import Sidebar from '../common/sidebar';
import Dashboard from './adminComponents/dashboard';
import ListProducts from './adminComponents/products/listProducts';
import AddProduct from './adminComponents/products/addProduct';

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(!this.props.token) {
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
                    </Switch>
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Admin);