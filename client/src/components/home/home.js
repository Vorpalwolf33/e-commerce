import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Switch, Route} from 'react-router-dom';

import Sidebar from '../common/sidebar';
import Navbar from '../common/navbar';
import HomePageProducts from './homePageComponents/homePageProducts';
import ShowProduct from '../common/showProduct';
import Login from './homePageComponents/login';
import Register from './homePageComponents/register';
import SearchedProducts from '../common/searchedProducts';

import {loadHomePageProducts} from '../../config/actions/homePageProductsActions';
import {setToken} from '../../config/actions/tokenActions';
import {loadUserDetails} from '../../config/actions/userActions';

const Home = (props) => {
    const [isNew, setisNew] = useState(true);
    useEffect( () => {
        if(isNew) {
            const token = localStorage.getItem('token');
            if(token) {
                props.dispatch(setToken(token));
                props.dispatch(loadUserDetails(props.history.push))
            } 
            else {
                props.dispatch(loadHomePageProducts());
            }
            setisNew(false);
        }
    }, [props, isNew, setisNew])
    return (
        <div className="home">
            <Navbar />
            <div>
                {props.match.url.includes("search")?<Sidebar />:null}
                <Switch>
                    <Route path="/" component={HomePageProducts} exact={true}/>
                    <Route path="/product/:id" component={ShowProduct} />
                    <Route path="/login" component={Login} exact={true} />
                    <Route path="/register" component={Register} exact={true} /> 
                    <Route path="/search" component={SearchedProducts} />
                </Switch>            
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {homePageProducts} = state;
    return {homePageProducts};
}

export default connect(mapStateToProps)(Home);