import React, {useState} from 'react';
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
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div>
            <button onClick={() => props.history.push('/account/home')}>Home</button>
            <button>Profile</button>
            <button onClick={() => props.dispatch(logoutUser(props.history.push))}>Logout</button>
            <form onSubmit={(event) => {event.preventDefault();}}>
                <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
                <input type="submit" value="Search"/>
            </form>
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