import React from 'react';
import {connect} from 'react-redux';

import Navbar from '../common/navbar';

const CustomerHome = (props) => {
    return (
        <div>
            <Navbar />
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(CustomerHome);