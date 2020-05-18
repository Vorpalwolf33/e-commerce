import React from 'react';
import '../../styles/navbar.css';
import {Route, Switch} from 'react-router-dom';

const GuestNavbar = (props) => {
    return (
        <div>
            <button>Login</button>
        </div>
    )
}

const CustomerNavbar = (props) => {
    return (
        <div>
            <button>Prfile</button>
        </div>
    )
}

const AdminNavbar = (props) => {
    return (
        <div>
            <button>Profile</button>
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