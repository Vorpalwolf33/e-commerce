import React from 'react';
import Navbar from '../common/navbar';
import {Link} from 'react-router-dom';

export default (props) => {
    return (
        <div>
            <Navbar />
            Registration Form:
            <form>

            </form>
            Already have an account? <Link to="/login">Click here</Link>
            <Link to="/"><button>Back</button></Link>

        </div>
    )
}