import React from 'react';
import {connect} from 'react-redux';

const Dashboard = (props) => {
    return (
        <div>
            Dashboard
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(Dashboard);