import React, {useEffect, useState} from "react";
import { connect } from "react-redux";

import {loadProductsList} from '../../../../config/actions/productsListActions';

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
                                    <div key={index} onClick={() => {props.history.push(`/admin/product/${product._id}`)}}>
                                        {product.name}
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