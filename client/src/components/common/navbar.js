import React from 'react';
import '../../styles/navbar.css';
import {Route, Switch} from 'react-router-dom';
import {logoutUser} from '../../config/actions/userActions';
import {connect} from 'react-redux';

const GuestNavbar = (props) => {
    return (
        <div>
            <button onClick={() => {props.history.push('/login')}}>Login / Register</button>
        </div>
    )
}

const CustomerNavbar = (props) => {
    return (
        <div>
            <button>Profile</button>
            <button onClick={() => props.dispatch(logoutUser(props.history.push))}>Logout</button>
        </div>
    )
}

const AdminNavbar = (props) => {
    return (
        <div>
            <button>Profile</button>
            <button onClick={() => {props.dispatch(logoutUser(props.history.push))}}>Logout</button>
        </div>
    )
}

export default (props) => {
    return(
        <div>
            Navbar:
            <Switch>
                <Route path="/account" component={connect()(CustomerNavbar)} />
                <Route path="/admin" component={connect()(AdminNavbar)} />
                <Route path="/" component={connect()(GuestNavbar)}/>
            </Switch>
        </div>
    )
}