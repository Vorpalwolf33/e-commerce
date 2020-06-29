import React, {useState} from 'react';
import '../../styles/sidebar.css';
import {Route, Switch, Link} from 'react-router-dom';

const CustomerSidebar = (props) => {
    return (
        <div>
            <h3>Filters: </h3>
        </div>
    )
}

const AdminSidebar = (props) => {
    const [showProductOptions, changeProductOptions] = useState(false);
    return (
        <div>
            <Link to="/admin/dashboard"><button>Dashboard</button></Link>
            <button onClick={() => {changeProductOptions(!showProductOptions)}}>Products</button>
            {
                (showProductOptions)? (
                    <div>
                        <Link to="/admin/product"><button>List Products</button></Link>
                        <Link to="/admin/product/add"><button>Add Product</button></Link>
                    </div>
                ):null
            }
            <Link to="/admin/categories"><button>Categories</button></Link>
        </div>
    )
}

export default (props) => {
    return (
        <div>
            <Switch>
                <Route path="/admin" component={AdminSidebar}/>
                <Route path="/account/:id" component={CustomerSidebar} />
                <Route path="/:id" component={CustomerSidebar} />
            </Switch>
        </div>
    )
}