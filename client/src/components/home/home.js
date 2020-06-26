import React, {useState, useEffect} from 'react';
import Sidebar from '../common/sidebar';
import Navbar from '../common/navbar';
import { connect } from 'react-redux';

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
            <Sidebar />
            {
                props.homePageProducts.map( (row, index) => {
                    return (
                        <div key = {index}>
                            <h3>{row.type}</h3>
                            {
                                row.products.map( (product, ind) => {
                                    return (
                                        <div key={ind}>
                                            {product.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }                
        </div>
    )
}

const mapStateToProps = (state) => {
    const {homePageProducts} = state;
    return {homePageProducts};
}

export default connect(mapStateToProps)(Home);