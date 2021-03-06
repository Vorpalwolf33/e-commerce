import React from 'react';
import { connect } from 'react-redux';

import Form from './productForm';

const AddProduct = props => {
    return (
        <div>
            <Form type="add" redirect={props.history.push}/>
            <button onClick={() => {props.history.push('/admin/product')}}>Back</button>
        </div>
    )
}

export default connect()(AddProduct);