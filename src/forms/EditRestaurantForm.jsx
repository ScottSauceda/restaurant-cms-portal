import React, { useState, useEffect } from "react";
import axios from 'axios';

const EditRestaurantForm = (props) => {

    useEffect(() => {
        setRestaurant(props.currentRestaurant);
    }, [props]);

    const[restaurant, setRestaurant] = useState(props.currentRestaurant);
    // ID's
    const [restaurantId] = useState(props.currentRestaurant.id);
    const[ownerId, setOwnerId] = useState(props.currentRestaurant.ownerId);
    const [isActive, setIsActive] = useState(props.currentRestaurant.isActive)
    // Data
    const [name, setName] = useState(props.currentRestaurant.name);
    const [address, setAddress] = useState(props.currentRestaurant.address);
    const [city, setCity] = useState(props.currentRestaurant.city);
    const [state, setState] = useState(props.currentRestaurant.state);
    const [zipCode, setZipCode] = useState(props.currentRestaurant.zipCode);


    const handleChange = e => {
        const {name, value} = e.target;
        console.log('e.target.name: ' + name);
        console.log('e.target.value: ' + value);

        // input validation
        // let button = document.getElementById('submitButton');
        // let location_nameInput = document.getElementById('locationName');
        // let addressInput = document.getElementById('address');
        // let cityInput = document.getElementById('city');
        // let stateInput = document.getElementById('state');
        // let zip_codeInput = document.getElementById('zip_code');

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
            default:
                console.log("Not a valid input option. Please try again.");
        }

        setRestaurant({...restaurant, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(restaurant.name) props.updateRestaurant(restaurant);
        const data = {ownerId, name, address, city, state, zipCode, isActive};

        console.log("edit restaurant data");
        console.log(data);

        axios
            .put("http://localhost:8080/restaurant/update/1", {
                ownerId: data.ownerId,
                name: data.name,
                address: data.address,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode,
                isActive: data.isActive
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })

        // window.location.reload();
    }

    return (
        <form>
            <label>Name</label>
            <input className="u-full-width" id="name" type="text" value={restaurant.name} name="name" placeholder = "Name" onChange={handleChange}/>

            <label>Address</label>
             <input className="u-full-width" id="address" type="text" value={restaurant.address} name="address" placeholder = "Address" onChange={handleChange}/>

             <label>City</label>
             <input className="u-full-width" id="city" type="text" value={restaurant.city} name="city" placeholder = "City" onChange={handleChange}/>

             <label>State</label>
             <input className="u-full-width" id="state" type="text" value={restaurant.state} name="state" placeholder = "State" onChange={handleChange}/>

             <label>Zip Code</label>
             <input className="u-full-width" id="zipCode" type="text" value={restaurant.zipCode} name="zipCode" placeholder = "Zip Code" onChange={handleChange}/>



            <div className = "d-flex">
                <button className="button-primary" id="submitButton" type="submit" onClick={handleSubmit}>Save Restaurant</button>
                <div className="flex-fill"></div>
                <button type="submit" onClick={() => props.setEditing(false)}>Cancel</button>
            </div>
        </form>
    )

}

export default EditRestaurantForm;