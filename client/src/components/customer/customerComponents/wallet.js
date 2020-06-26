import React from 'react';
import {connect} from 'react-redux';

const Wallet = (props) => {
    return (props.user)?(
        <div>
            <h3>Wallet</h3>
            <div>
                Balance: ${props.user.wallet}
            </div>
            <button>Add Money</button>
        </div>
    ):<div></div>
}

const mapStateToProps = (state) => {
    const {user} = state;
    return {user};
}

export default connect(mapStateToProps)(Wallet);