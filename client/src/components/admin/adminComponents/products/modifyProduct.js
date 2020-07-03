import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import Form from './productForm';

import {loadProduct} from '../../../../config/actions/productActions';

const ModifyProduct = props => {
    const [isNew, setisNew] = useState(true);
    
    useEffect( () => {
        if(isNew) {
            props.dispatch(loadProduct(props.match.params.id));
            setisNew(false);
        }
    }, [props, isNew])

    return (props.product && props.product._id === props.match.params.id)?(
        <div>     
            <Form type="modify" redirect={props.history.push}/>
            <button onClick={() => {props.history.push(`/admin/product/${props.product._id}`)}}>Back</button>
        </div>
    ):<div></div>
}

const mapStateToProps = (state) => {
    const {product} = state;
    return {product}
}
export default connect(mapStateToProps)(ModifyProduct);