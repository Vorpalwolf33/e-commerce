import React,{useState} from 'react'
import {connect} from 'react-redux';

import {addAddress} from '../../../config/actions/userActions';

const handleNumberChange = (number, setValue) => {
    const num = Number(number);
    if(num && num > 0) setValue(num);
    if(number === '') setValue('');
}

const AddressForm = (props) => {
    const [city, setCity] = useState((props.newAddress)?"":props.address.city);
    const [houseDetails, setHouseDetails] = useState((props.newAddress)?"":props.address.houseDetails);
    const [locality, setLocality] = useState((props.newAddress)?"":props.address.locality);
    const [landmark, setLandmark] = useState((props.newAddress)?"":props.address.landmark);
    const [state, setState] = useState((props.newAddress)?"":props.address.state);
    const [zipcode, setZipCode] = useState((props.newAddress)?"":props.address.zipcode);
    const [country, setCountry] = useState((props.newAddress)?"":props.address.country);

    return (
        <form 
            onSubmit={(event) => {
                event.preventDefault();
                if(props.newAddress) {
                    if(city !== '' && houseDetails !== '' && locality !== '' && landmark !== '' && state !== '' && zipcode !== '' && country !== '') {
                        props.dispatch(addAddress({city, houseDetails, locality, landmark, state, zipcode, country}));
                    }
                    props.setAddAddress(false);
                }
                else {
                    props.setAddress({city, houseDetails, locality, landmark, state, zipcode, country});   
                }
            }}>
            <label>
                House Details: 
                <input type="text" value={houseDetails} onChange={(event) => {setHouseDetails(event.target.value);}}/>
            </label><br/>
            <label>
                Locality: 
                <input type="text" value={locality} onChange={(event) => {setLocality(event.target.value);}}/>
            </label><br/>
            <label>
                Landmark: 
                <input type="text" value={landmark} onChange={(event) => {setLandmark(event.target.value);}}/>      
            </label><br/>
            <label>
                Country: 
                <input type="text" value={country} onChange={(event) => {setCountry(event.target.value);}}/>     
            </label><br/>
            <label>
                State: 
                <input type="text" value={state} onChange={(event) => {setState(event.target.value);}}/>       
            </label><br/>
            <label>
                City: 
                <input type="text" value={city} onChange={(event) => {setCity(event.target.value);}}/>        
            </label><br/>                    
            <label>
                ZipCode: 
                <input type="text" value={zipcode} onChange={(event) => handleNumberChange(event.target.value, setZipCode)}/>              
            </label><br/>
            <input type="submit" value={(props.newAddress)?"Add":"Set"} />
        </form>
    )
}

export default connect()(AddressForm);