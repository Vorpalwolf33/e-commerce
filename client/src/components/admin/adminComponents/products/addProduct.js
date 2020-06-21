import React from 'react';
import { connect } from 'react-redux';

import Form from './productForm';

const AddProduct = props => {
    return (
        <div>
            <Form />
        </div>
    )
}

export default connect()(AddProduct);