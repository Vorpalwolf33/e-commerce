import React from 'react';
import '../../styles/navbar.css';
import {Route, Switch} from 'react-router-dom';

const GuestNavbar = (props) => {
    return (
        <div>
            Guest Navbar
        </div>
    )
}

const CustomerNavbar = (props) => {
    return (
        <div>
            Customer Navbar
        </div>
    )
}

const AdminNavbar = (props) => {
    return (
        <div>
            Admin Navbar
        </div>
    )
}

export default (props) => {
    return(
        <div>
            Navbar:
            <Switch>
                <Route path="/account" component={CustomerNavbar} />
                <Route path="/admin" component={AdminNavbar} />
                <Route path="/" exact={true} component={GuestNavbar}/>
            </Switch>
        </div>
    )
}