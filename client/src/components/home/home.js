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
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if(token) {
            this.props.dispatch(setToken(token));
            this.props.dispatch(loadUserDetails(this.props.history.push))
        } 
        else {
            this.props.dispatch(loadHomePageProducts());
        }

    }

    render() {
        return (
            <div className="home">
                <Navbar />
                <Sidebar />
                {
                    this.props.homePageProducts.map( (row, index) => {
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
}

const mapStateToProps = (state) => {
    const {homePageProducts} = state;
    return {homePageProducts};
}

export default connect(mapStateToProps)(Home);