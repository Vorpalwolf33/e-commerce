import React from 'react';
import {connect} from 'react-redux';

import {setProduct} from '../../../config/actions/productActions';

const CustomerPageProducts = (props) => {
    return (
        <div>
        {
            props.homePageProducts.map( (row, index) => {
                return (
                    <div key = {index}>
                        <h3>{row.type}</h3>
                        {
                            row.products.map( (product, ind) => {
                                return (
                                    <div key={ind} onClick={() => {props.history.push(`/account/product/${product._id}`);}}>
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

export default connect(mapStateToProps)(CustomerPageProducts);