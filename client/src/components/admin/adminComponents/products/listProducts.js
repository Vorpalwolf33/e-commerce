import React, {useEffect, useState} from "react";
import { connect } from "react-redux";

import {loadProductsList} from '../../../../config/actions/productsListActions';
import {setProduct, removeProduct} from '../../../../config/actions/productActions';

const ListProducts = (props) => {
    const [isNew, setIsNew] = useState(true);
    useEffect( () => {
        if(isNew) {
            props.dispatch(loadProductsList());
            setIsNew(false);
        }
    }, [props, isNew, setIsNew]);
    return (
        <div>
            {
                (props.productsList)? (
                    <div>
                        {
                            props.productsList.map( (product, index) => {
                                return (
                                    <div key={index}>
                                        {product.name}
                                        <button onClick={ () => {props.dispatch(setProduct(product)); props.history.push('/admin/product/modify');}}>Modify</button>
                                        <button onClick={ () => { if(window.confirm("Are you sure")) {
                                                props.dispatch(removeProduct(product._id));         
                                            }
                                            else {
                                                console.log('no');
                                            }}}>Remove</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                ):null
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const {productsList} = state;
    return {productsList};
}

export default connect(mapStateToProps)(ListProducts);