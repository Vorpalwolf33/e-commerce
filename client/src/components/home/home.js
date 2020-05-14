import React from 'react';
import Sidebar from '../common/sidebar';
import Navbar from '../common/navbar';

export default class Home extends React.Component{
    constructor( props ) {
        super( props );
        this.state = {

        }
    }

    render() {
        return (
            <div className="home">
                <Navbar />
                <Sidebar />
                Displaying Home
            </div>
        )
    }
}