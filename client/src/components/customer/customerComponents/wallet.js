import React, {useState} from 'react';
import {connect} from 'react-redux';

import {addMoney} from '../../../config/actions/userActions';

const handleMoneyChange = (money, setMoney) => {
    const temp = Number(money);
    if(temp && temp >= 0) setMoney(temp);
    if(money === '') setMoney(money);
}

const Wallet = (props) => {
    const [money, setMoney] = useState('');
    return (props.user)?(
        <div>
            <h3>Wallet</h3>
            <div>
                Balance: ${props.user.wallet}
            </div>
            <form onSubmit={(event) => {
                event.preventDefault();
                props.dispatch(addMoney(money));
                setMoney(0);
            }}>
                <label>
                    $
                    <input type="text" value={money} onChange={(event) => handleMoneyChange(event.target.value, setMoney)}/>
                </label>
                <input type="submit" value="Add Money" />   
            </form>
        </div>
    ):<div></div>
}

const mapStateToProps = (state) => {
    const {user} = state;
    return {user};
}

export default connect(mapStateToProps)(Wallet);