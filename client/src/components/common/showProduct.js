import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import {loadProduct} from '../../config/actions/productActions';

const ShowProduct = (props) => {
    const [isNew, setisNew] = useState(true);
    useEffect( () => {
        if(isNew) {
            // console.log(props.match.params.id);
            props.dispatch(loadProduct(props.match.params.id));
            setisNew(false);
        }
    }, [props])

    return (
        <div>
            { (props.product)? props.product.name: null}
        </div>
    )
}

const mapStateToProps = (state) => {
    const {product} = state;
    return {product};
}

export default connect(mapStateToProps)(ShowProduct);