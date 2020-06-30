import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import AddressForm from './addressForm';
import ShowAddress from './showAddress';

import {loadProfile, removeAddress, updateUser} from '../../../config/actions/userActions';

const handleNumberChange = (number, setValue) => {
    const num = Number(number);
    if(num && num > 0) setValue(num);
    if(number === '') setValue('');
}

const checkIfAddressAltered = (address1, address2) => {
    if(
        address1.city === address2.city &&
        address1.state === address2.state &&
        address1.country === address2.country &&
        address1.locality === address2.locality &&
        address1.houseDetails === address2.houseDetails &&
        address1.landmark === address2.landmark &&
        address1.zipcode === address2.zipcode
    )       return false;
    else    return true;
}

const checkIfProfileAltered = (user1, user2) => {
    if(user1.username === user2.username && user1.email === user2.email && user1.mobile === user2.mobile) {
        const altered = user1.address.find((address1, index) => checkIfAddressAltered(address1, user2.address[index]));
        if(altered) {
            return true
        }
        else return false;
    }
    else return true
}

const Profile = (props) => {
    const [editProfile, setEditProfile] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState([]);
    const [addAddress, setAddAddress] = useState(false)
    const [editingAddress, setEditingAddress] = useState(undefined);

    useEffect( () => {
        if(props.user && !props.user.email) {
            props.dispatch(loadProfile());
        }
        if(props.user && props.user.address && props.user.address !== address) {
            setAddress(props.user.address);
        }
    }, [props, address])

    return (props.user && props.user.email)?(
        <div>
            <div>
                <button onClick={() => {
                    if(!editProfile) {
                        setUsername(props.user.username);
                        setEmail(props.user.email);
                        setMobile(props.user.mobile);
                        setAddress(props.user.address);
                    }
                    setEditProfile(!editProfile);
                }}>
                    {(editProfile)?"X":"Edit Profile"}
                </button>
                {
                    (editProfile)?(
                        <button 
                            onClick={() => {
                                if(checkIfProfileAltered(props.user, {username, email, mobile, address})) {
                                    props.dispatch(updateUser({username, email, mobile, address}));
                                }
                                setEditProfile(false);
                        }}>
                            Update
                        </button>
                    ):null
                }
            </div>
            {
                (editProfile)? (
                    <form>
                        <label>Userame:
                            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </label><br/>
                        <label>Email:
                            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </label><br/>
                        <label>Phone:
                            <input type="text" value={mobile} onChange={(event) => handleNumberChange(event.target.value, setMobile)} />
                        </label><br/>
                    </form>
                ): (
                    <div>
                        <div>Username: {props.user.username}</div>
                        <div>Email: {props.user.email}</div>
                        <div>Phone: {props.user.mobile}</div>
                    </div>
                )
            }

            {
                (editProfile)? (
                    <div>
                        Address:<br/>
                        {
                            address.map( (element, index) => {
                                return (editingAddress === index)?(
                                    <div key={index}>
                                        <hr/>
                                        <AddressForm newAddress={false} address={element} setAddress={
                                            (alteredAddress) => {
                                                if(checkIfAddressAltered(element, alteredAddress)) {
                                                    const temp = [...address];
                                                    temp[index] = alteredAddress;
                                                    setAddress(temp);
                                                    setEditingAddress(null);
                                                }
                                            }
                                        }/>
                                        <button onClick={() => {setEditingAddress(null)}}>Cancel</button>
                                        <hr/>
                                    </div>
                                ):(
                                    <div key={index}>
                                        <hr/>
                                        <ShowAddress address={{...element}} />
                                        <button onClick={() => {setEditingAddress(index)}}>Edit</button>
                                        <button onClick={() => {props.dispatch(removeAddress(element._id))}}>Delete</button>
                                        <hr/>
                                    </div>
                                )
                            })
                        }
                    </div>
                ):(
                    <div>Address:<br/>
                        {
                            props.user.address.map( (element, index) => {
                                return (
                                    <div key={index}>
                                        <hr/>
                                        <ShowAddress address={{...element}}/>
                                        <hr/>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
            {
                (!editProfile)? (addAddress)?(
                    <div>
                        <AddressForm newAddress={true} setAddAddress={setAddAddress}/>
                        <button onClick={() => {setAddAddress(false)}}>Cancel</button>
                    </div>
                ):(
                    <button onClick={() => {setAddAddress(true)}}>Add Address</button>
                ):null
            }
        </div>
    ):<div></div>
}

const mapStateToProps = (state) => {
    const {user} = state;
    return {user};
}

export default connect(mapStateToProps)(Profile)