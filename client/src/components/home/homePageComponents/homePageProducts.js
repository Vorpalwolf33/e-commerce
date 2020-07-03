import React from 'react';
import {connect} from 'react-redux';

const HomePageProducts = (props) => {
    return (
        <div>
        {
            props.homePageProducts.map( (row, index) => {
                return (
                    <div key = {index}>
                        <hr/>
                        <h3>{row.type}</h3>
                        <br/>
                        {
                            row.products.map( (product, ind) => {
                                return (
                                    <div key={ind} onClick={() => {props.history.push(`/product/${product._id}`);}}>
                                        {
                                            (product.images && product.images[0] && product.images[0].img)? (
                                                <img src={product.images[0].img} alt=""/>
                                            ):null
                                        }
                                        <br/>
                                        {product.name}
                                        <br/>
                                        Price: ${product.price}
                                        <br/><br/>
                                    </div>
                                )
                            })
                        }
                        <hr/>
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

export default connect(mapStateToProps)(HomePageProducts);