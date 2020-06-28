import React from 'react';

const ShowAddress = (props) => {
    return (
        <div>
            <div>{props.address.houseDetails}, {props.address.locality}</div>
            <div>Near {props.address.landmark},</div>
            <div>{props.address.city}</div>
            <div>{props.address.zipcode}</div>
            <div>{props.address.state}</div>
            <div>{props.address.country}</div>
        </div>
    )
}

export default ShowAddress;