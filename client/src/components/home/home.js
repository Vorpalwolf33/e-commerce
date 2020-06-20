import React from 'react';
import Sidebar from '../common/sidebar';
import Navbar from '../common/navbar';
import { connect } from 'react-redux';

import {loadHomePageProducts} from '../../config/actions/homePageProductsActions';
import {setToken} from '../../config/actions/tokenActions';
import {loadUserDetails} from '../../config/actions/userActions';

class Home extends React.Component{
    constructor( props ) {
        super( props );
        this.state = {
            token: props.token
        }   
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if(token) {
            this.props.dispatch(setToken(token));
            this.props.dispatch(loadUserDetails(this.props.history.push))
        } 
        if(this.props.homePageProducts.length === 0 && !token) {
            this.props.dispatch(loadHomePageProducts());
        }

    }

    render() {
        return (
            <div className="home">
                <Navbar />
                <Sidebar />
                {this.state.token}
                {
                    this.props.homePageProducts.map( (row, index) => {
                        return (
                            <div key = {index}>
                                <h3>{row.type}</h3>
                                {
                                    row.products.map( (product, ind) => {
                                        return (
                                            <div key={ind}>
                                                {product}
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
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Home);