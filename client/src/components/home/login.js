import React from 'react';
import Navbar from '../common/navbar';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {loginUser, loadUserDetails} from '../../config/actions/userActions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        this.props.dispatch(loginUser({email, password}, this.props.history.push));
    }

    render() {

        return (
            <div>
                <Navbar />
                Login form
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label><br/>
                    <label>
                        <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label><br/>
                    <input type="submit" value="login" />
                </form>
                To create a new account <Link to="/register">Click here</Link>
                <Link to="/"><button>Back</button></Link>
            </div>
        )
    }
}

export default connect()(Login);