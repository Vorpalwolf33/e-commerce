import React from 'react';
import Navbar from '../common/navbar';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import {registerUser} from '../../config/actions/userActions';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNo: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.password === this.state.confirmPassword) {
            const {email, password, username, phoneNo} = this.state;
            this.props.dispatch(registerUser({username, email, password, mobile: phoneNo}, this.props.history.push));
        }
        else {
            alert("Entered passwords don't match");
            this.setState({password: '', confirmPassword: ''});
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                Registration Form:
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" placeholder="Username" onChange={this.handleChange} value={this.state.username} name="username"/>
                    </label><br/>
                    <label>
                        <input type="text" placeholder="Email" onChange={this.handleChange} value={this.state.email} name="email"/>
                    </label><br/>
                    <label>
                        <input type="text" placeholder="Phone Number" onChange={this.handleChange} value={this.state.phoneNo} name="phoneNo"/>
                    </label><br/>
                    <label>
                        <input type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} name="password"/>
                    </label><br/>
                    <label>
                        <input type="password" placeholder="Confirm Password" onChange={this.handleChange} value={this.state.confirmPassword} name="confirmPassword"/>
                    </label><br/>
                    <input type="submit" value="Register" />
                </form>
                Already have an account? <Link to="/login">Click here</Link>
                <Link to="/"><button>Back</button></Link>
            </div>
        )
    }
}

export default connect()(Register);