import React from 'react';
import '../../styles/sidebar.css';
import {Route, Switch} from 'react-router-dom';

const CustomerSidebar = (props) => {
    return (
        <div>
            Filters
        </div>
    )
}

const AdminSidebar = (props) => {
    return (
        <div>
            Options
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