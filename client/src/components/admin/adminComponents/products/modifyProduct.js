import React from 'react';
import { connect } from 'react-redux';

import Form from './productForm';

const ModifyProduct = props => {
    return (
        <div>
            <Form type="modify" history={props.history}/>
            <button onClick={() => {props.history.push('/admin/product')}}>Back</button>
        </div>
    )
}

export default connect()(ModifyProduct);