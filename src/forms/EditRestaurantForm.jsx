import React, { useState, useEffect } from "react";

const EditRestaurantForm = (props) => {

    useEffect(() => {
        setRestaurant(props.currentRestaurant);
    }, [props]);

    const[restaurant, setRestaurant] = useState(props.currentRestaurant);
    // ID's
    const [restaurantId] = useState(props.currentRestaurant.id);
    const[location_id, setLocationId] = useState(props.currentRestaurant.location_id);
    const[owner_id, setOwnerId] = useState(props.currentRestaurant.owner_id);
    // Data
    const [name, setName] = useState(props.currentRestaurant.name);
    const [location_name, setLocationName] = useState(props.currentRestaurant.location_name);

    // Either need to update endpoint or limit what you can update here.
    // const [address, setAddress] = useState(props.currentRestaurant.address);
    // const [city, setCity] = useState(props.currentRestaurant.city);
    // const [state, setState] = useState(props.currentRestaurant.state);
    // const [zip_code, useZipCode] = useState(props.currentRestaurant.zip_code);
    // const [owner_name] = useState(props.currentRestaurant.owner_name)l

    // will probably need to set up custom selection thing for tags
    // const [restaurantTags, setRestaurantTags] = useState(props.currentRestaurant.restaurantTags);

    const handleChange = e => {

    }

    const handleSubmit = e => {

    }

    return (
        <form>
            <label>Name</label>
            <input className="u-full-width" id="name" type="text" value={restaurant.name} name="name" placeholder = "Name" onChange={handleChange}/>

            <label>Owner Id</label>
            <input className="u-full-width" id="owner_id" type="text" value={restaurant.owner_id} name="owner_id" placeholder = "Owner Id" onChange={handleChange}/>

            <label>Location Id</label>
            <input className="u-full-width" id="location_id" type="text" value={restaurant.location_id} name="location_id" placeholder = "Location Id" onChange={handleChange}/>

            <div className = "d-flex">
                <button className="button-primary" id="submitButton" type="submit" onClick={handleSubmit}>Save Restaurant</button>
                <div className="flex-fill"></div>
                <button type="submit" onClick={() => props.setEditing(false)}>Cancel</button>
            </div>
        </form>
    )

}

export default EditRestaurantForm;