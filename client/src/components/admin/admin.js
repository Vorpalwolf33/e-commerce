import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

import Navbar from '../common/navbar';
import Sidebar from '../common/sidebar';
import Dashboard from './adminComponents/dashboard';

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(!this.props.token) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <Sidebar />
                    <Route path="/admin/dashboard" exact={true} component={Dashboard} />
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Admin);