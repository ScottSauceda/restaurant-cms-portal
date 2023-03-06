import React, { useState, useEffect } from "react";
import axios from 'axios';

const EditLocationForm = (props) => {
    console.log("editLocationProps")
    console.log(props);

    useEffect(() => {
        setLocation(props.currentLocation);
    }, [props]);

    const[location, setLocation] = useState(props.currentLocation);
    // ID's
    // const[location_id, setLocationId] = useState(props.currentLocation.location_id);
    // const[owner_id, setOwnerId] = useState(props.currentLocation.owner_id);

    // Data
    const [locationName, setLocationName] = useState(props.currentLocation.locationName);
    const [address, setAddress] = useState(props.currentLocation.address);
    const [city, setCity] = useState(props.currentLocation.city);
    const [state, setState] = useState(props.currentLocation.state);
    const [zipCode, setZipCode] = useState(props.currentLocation.zipCode);

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
            case 'locationName':
                setLocationName(value);
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
            case 'zip_code':
                setZipCode(value);
                break;
            
            default:
                console.log("Not a valid input option. Please try again.");
                
        }

        setLocation({...location, [name]: value});
        
        
    }
                // http://localhost:8080/location/update/6
            // {
            //     "locationName": "Meatball Shack",
            //     "address": "Grover St",
            //     "city": "Grapevine",
            //     "state": "Flordia",
            //     "zipCode": 21234
            // }

    const handleSubmit = e => {
        e.preventDefault();
        if(location.locationName) props.updateLocation(location);
        const data = {locationName, address, city, state, zipCode};

        console.log("edit data");
        console.log(data);

        axios
            .put("http://localhost:8080/location/update/1", {
                locationName: data.locationName,
                address: data.address,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode
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
             <label>Location Name</label>
             <input className="u-full-width" id="locationName" type="text" value={location.locationName} name="locationName" placeholder = "Name" onChange={handleChange}/>

             <label>Address</label>
             <input className="u-full-width" id="address" type="text" value={location.address} name="address" placeholder = "Address" onChange={handleChange}/>

             <label>City</label>
             <input className="u-full-width" id="city" type="text" value={location.city} name="city" placeholder = "City" onChange={handleChange}/>

             <label>State</label>
             <input className="u-full-width" id="state" type="text" value={location.state} name="state" placeholder = "State" onChange={handleChange}/>

             <label>Zip Code</label>
             <input className="u-full-width" id="zipCode" type="text" value={location.zipCode} name="zipCode" placeholder = "Zip Code" onChange={handleChange}/>

             {/* <label>Location Active</label>
             <input className="u-full-width" id="locationActive" type="text" value={location.locationActive} name="locationActive" placeholder = "Location Id" onChange={handleChange}/> */}

             <div className = "d-flex">
                 <button className="button-primary" id="submitButton" type="submit" onClick={handleSubmit}>Save Restaurant</button>
                 <div className="flex-fill"></div>
                 <button type="submit" onClick={() => props.setEditing(false)}>Cancel</button>
             </div>
         </form>
    )

}

export default EditLocationForm;