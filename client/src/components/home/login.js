import React from 'react';
import Navbar from '../common/navbar';
import {Link} from 'react-router-dom';

export default (props) => {
    return (
        <div>
            <Navbar />
            Login form
            <form>

            </form>
            To create a new account <Link to="/register">Click here</Link>
            <Link to="/"><button>Back</button></Link>
        </div>
    )
}