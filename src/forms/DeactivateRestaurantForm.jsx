import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeactivateRestaurantForm = (props) => {

    useEffect(() => {
        console.log("deactiveRestaurantForm props");
        console.log(props);
        if(props.currentRestaurant.isActive == "true"){
            console.log(props.currentRestaurant.isActive == true);
            console.log("isActive = true");
            setActiveState("Deactivate");
        } else {
            console.log("isActive = false");
            setActiveState("Activate");
        }
    }, [props])

    const [restaurant, setRestaurant] = useState(props.currentRestaurant);
    const [restaurantId] = useState(props.currentRestaurant.id);
    const [restaurantName, setRestaurantName] = useState(props.currentRestaurant.name);
    const [ownerId] = useState(props.currentRestaurant.ownerId);
    const [isActive, setIsActive] = useState(props.currentRestaurant.isActive);
    const [confirmName, setConfirmName] = useState("");
    const [activeState, setActiveState] = useState("");
    const [disabledStatus, setDisabledStatus] = useState(true);

    const handleChange = e => {
        const {name, value} = e.target;
        
        console.log('e.target.name: ' + name);
        console.log('e.target.value: ' + value);

        let button = document.getElementById('submitButton');
        let restaurantNameInput = document.getElementById('restaurantName');
//         // console.log('userNameInput', userNameInput);
        let deactivateRestaurantInput = document.getElementById('deactivateRestaurant');
        console.log('deactivateRestaurantInput', deactivateRestaurantInput);
        let activateRestaurantInput = document.getElementById('activateRestaurant');
        console.log('activateRestaurant', activateRestaurantInput);

        switch(name){
            case 'deactivateRestaurant':
                setIsActive(false);
                setRestaurantName(restaurantName);
                setConfirmName(value);
                console.log("setting to false");
                if(restaurantName == deactivateRestaurantInput.value){
                    button.style.opacity = "1";
                    setDisabledStatus(false);
                }
                break;
            case 'activateRestaurant':
                setIsActive(true);
                setRestaurantName(restaurantName);
                setConfirmName(value);
                console.log("setting to true");
                if(restaurantName == activateRestaurantInput.value){
                    button.style.opacity = "1";
                    setDisabledStatus(false);
                }
                break;
            default:
                console.log("Your input is not valid. Please try again.")
        }

        setRestaurant({...restaurant, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(restaurant.name) props.updateDeactivateRestaurant(restaurant);
        const data = { restaurantId, ownerId, isActive};
        console.log('change restaurant account status', data);
//         // const requestOptions = {
//         //     method: "POST",
//         //     headers: { "Content-Type": "application/json" },
//         //     body: JSON.stringify(data)
//         // };

//         // console.log("deactivate data");
//         // console.log(data);

        axios
        .put("http://localhost:8080/api/restaurant/setActive", {
            restaurantId: data.restaurantId,
            ownerId: data.ownerId,
            isActive: data.isActive
        })

        console.log('data sent for activate restaurant');
        console.log(data);

//         window.location.reload();
    }

    return(
        <form>
            <label>RestaurantId(read only)</label>
             <input className="u-full-width" type="text" value={restaurant.id} name="id" readOnly />

             <label>Name(read only)</label>
             <input className="u-full-width" type="text" value={restaurant.name} name="name" readOnly />

             {activeState == "Deactivate" ? (
                 <div>
                     <label>Type Restaurant Name To Deactivate</label>
                     <input className="u-full-width" id="deactivateRestaurant" type="text" value={confirmName} name="deactivateRestaurant" placeholder="Type Restaurant Name" onChange={handleChange} />
                 </div>
             ) : (
                <div>
                     <label>Type Restaurant Name To Activate</label>
                     <input className="u-full-width" id="activateRestaurant" type="text" value={confirmName} name="activateRestaurant" placeholder="Type Restaurant Name" onChange={handleChange} />
                 </div>
             )}
             <button className="button-primary" id="submitButton" type="submit" onClick={handleSubmit} style={{ opacity: 0.2 }} disabled={disabledStatus} >{activeState} Restaurant</button>
             <button type="submit" onClick={() => props.setDeactivating(false)} >Cancel</button>
        </form>
    )
}

export default DeactivateRestaurantForm;