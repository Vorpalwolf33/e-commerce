import React from 'react';
import Sidebar from '../common/sidebar';
import Navbar from '../common/navbar';
import { connect } from 'react-redux';

class Home extends React.Component{
    constructor( props ) {
        super( props );
        this.state = {
            token: props.token
        }   
    }

    render() {
        return (
            <div className="home">
                <Navbar />
                <Sidebar />
                {this.state.token}
                Displaying Home
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Home);