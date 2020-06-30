import React from 'react';
import { connect } from 'react-redux';

import Form from './productForm';

const ModifyProduct = props => {
    return (
        <div>
            <Form type="modify" history={props.history}/>
            <button onClick={() => {props.history.push(`/admin/product/${props.product._id}`)}}>Back</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {product} = state;
    return {product}
}
export default connect(mapStateToProps)(ModifyProduct);