import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddRestaurantForm = (props) => {

    console.log("add restaurant form activated!!!!!")


    const initRestaurant = { ownerId: '', name: '', address: '', city: '', state: '', zipCode: '', isActive: true};

    const [restaurant, setRestaurant] = useState(initRestaurant);

    // IDs
    const [ownerId, setOwnerId] = useState();

    // Data
    const [name, setName] = useState("");

    // Address
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");

    const [isActive] = useState("true");

    const handleChange = e => {
        const {name, value} = e.target;
        console.log('e.target.name: ' + name);
        console.log('e.target.value: ' + value);

        switch(name){
            case 'name':
                setName(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'state':
                setState(value);
                break;
            case 'zipCode':
                setZipCode(value);
                break;
            case 'owner_id':
                setOwnerId(value);
                break;

            default:
                console.log("Not a valid input. Please try again.");
        }

        setRestaurant({...restaurant, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(restaurant.name){
            handleChange(e, props.addRestaurant(restaurant));
        }

        const data = {ownerId, name, address, city, state, zipCode, isActive};
        console.log('data', data);

        setOwnerId(sessionStorage.getItem('userId'));

        axios
        .post("http://localhost:8080/restaurant/create", {
            ownerId: data.ownerId,
            name: data.name,
            address: data.address,
            city: data.city,   
            state: data.state,
            zipCode: data.zipCode,
            isActive: data.isActive
        })

        console.log('data sent for activate restaurant');
        console.log(data);
    }

    return(
        <form>
            {/* <label>Owner Id</label>
            <input className="u-full-width" id="name" type="text" value={restaurant.ownerId} name="ownerId" placeholder="Owner Id" onChange={handleChange} /> */}

            <label>Name</label>
            <input className="u-full-width" id="name" type="text" value={restaurant.name} name="name" placeholder="Name" onChange={handleChange} />

            <label>Address</label>
            <input className="u-full-width" id="name" type="text" value={restaurant.address} name="address" placeholder="Address" onChange={handleChange} />

            <label>City</label>
            <input className="u-full-width" id="name" type="text" value={restaurant.city} name="city" placeholder="City" onChange={handleChange} />

            <label>State</label>
            <input className="u-full-width" id="name" type="text" value={restaurant.state} name="state" placeholder="State" onChange={handleChange} />

            <label>Zip Code</label>
            <input className="u-full-width" id="name" type="text" value={restaurant.zipCode} name="zipCode" placeholder="Zip Code" onChange={handleChange} />

            <button className="button-primary" id="submitButton" type="submit" style={{ backgroundColor: 'red'}} onClick={handleSubmit}>Add Restaurant</button>
        </form>
    )

}

export default AddRestaurantForm;