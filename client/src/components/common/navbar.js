import React, {useState} from 'react';
import '../../styles/navbar.css';
import {Route, Switch} from 'react-router-dom';
import {logoutUser} from '../../config/actions/userActions';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return state;
}

const GuestNavbar = (props) => {
    return (
        <div>
            <button onClick={() => {props.history.push('/login')}}>Login / Register</button>
        </div>
    )
}

const CustomerNavbar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [profileOptions, setProfileOptions] = useState(false);
    return (
        <div>
            <form onSubmit={(event) => {event.preventDefault();}}>
                <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
                <input type="submit" value="Search"/>
            </form>
            <button onClick={() => props.history.push('/account/home')}>Home</button>
            <button onClick={() => setProfileOptions(!profileOptions)}>Profile</button>
            {
                (profileOptions)? (
                    <div>
                        <button>My Profile</button>
                        <button>My Orders</button>
                        <button onClick={() => props.history.push('/account/wallet')}>Wallet</button>
                    </div>
                ): null
            }
            <button onClick={() => props.dispatch(logoutUser(props.history.push))}>Logout</button>
            <button onClick={() => props.history.push('/account/cart')}>
                Cart
                {(props.cart && props.cart.length > 0)?` (${props.cart.length})`:null}
            </button>
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
                <Route path="/account" component={connect(mapStateToProps)(CustomerNavbar)} />
                <Route path="/admin" component={connect()(AdminNavbar)} />
                <Route path="/" component={connect()(GuestNavbar)}/>
            </Switch>
        </div>
    )
}