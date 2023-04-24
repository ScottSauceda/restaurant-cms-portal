import React, { useState, useEffect } from "react";

import { GetUserRestaurants } from "../hooks";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import axios from 'axios';

// console.log(process.env.REACT_APP_DEV_BASE_URL);
// console.log(process.env.REACT_APP_BASE_PROD_BASE_URL);

// const API_URL = "http://spring-boot-dev.us-east-1.elasticbeanstalk.com/api/";

const UserRestaurants = () => {
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();

    console.log("currentUser");
    console.log(currentUser);

    const [data, loading] = GetUserRestaurants(0, currentUser.id);
    const [restaurants, setRestaurants] = useState(null);

    // adding restaurant
    const [addingRestaurant, setAddingRestaurant] = useState(false);
    const [addRestaurantResponseMessage, setAddRestaurantResponseMessage] = useState(null);
    const [addRestaurantErrorMessage, setAddRestaurantErrorMessage] = useState(null);

    const initRestaurant = { ownerId: currentUser.id, name: '', address: '', city: '', state: '', zipCode: '', isActive: true};
    const [restaurant, setRestaurant] = useState(initRestaurant);

    // IDs
    const [ownerId] = useState(currentUser.id);

    // Data
    const [name, setName] = useState("");
    
    // Address
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    
    // const [isActive] = useState("true");

    
    useEffect(() => {
        if(data){
            console.log("UserRestaurants Data");
            console.log(data);
            const formattedRestaurant = data.map((obj, i) => {
                return {
                    id: obj.restaurantId,
                    ownerId: obj.ownerId,
                    name: obj.name,
                    address: obj.address,
                    city: obj.city,
                    state: obj.state,
                    zipCode: obj.zipCode,
                    isActive: "" + obj.isActive,
                    ownerName: obj.ownerName,
                    restaurantReviews: obj.restaurantReviews,
                    restaurantImages: obj.restaurantImages
                };
            });
            setRestaurants( formattedRestaurant)
        }
    }, [data]);

    console.log("user restaurants");
    console.log(restaurants);
    
    const handleSubmit = restaurant => {
        // e.preventDefault();
        console.log('restaurant');
        console.log(restaurant);
        navigate("/restaurant-cms-portal/restaurant", { state : { selected_restaurant: restaurant }});
    }

    const handleAddRestaurantChange = e => {
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

            default:
                console.log("Not a valid input. Please try again.");
        }

        setRestaurant({...restaurant, [name]: value});
    }

    const handleAddRestaurantSubmit = e => {
        e.preventDefault();
        
        console.group('restaurant setn for add restaurant');
        console.log(restaurant);

        axios
        .post(process.env.REACT_APP_DEV_BASE_URL +  "restaurant/create", {
            ownerId: restaurant.ownerId,
            name: restaurant.name,
            address: restaurant.address,
            city: restaurant.city,   
            state: restaurant.state,
            zipCode: restaurant.zipCode,
            isActive: restaurant.isActive
        }, { withCredentials: true })
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setAddRestaurantResponseMessage(response.data);
            // navigate("/newRestaurants");
            window.location.reload(); 

        })
        .catch((error) => {
            console.log(error);
            console.log("unspecified error");
            console.log(error.response.data);
            setAddRestaurantErrorMessage(error.response.data);
        })

    }
                

    return (
        <div>
            { addingRestaurant? (
                <div>
                    <h2>Adding Restaurant</h2>

                    <label>Owner Id</label>
                    <input className="u-full-width" id="name" type="text" value={restaurant.ownerId} name="ownerId" placeholder="Owner Id" onChange={handleAddRestaurantChange} />

                    <label>Name</label>
                    <input className="u-full-width" id="name" type="text" value={restaurant.name} name="name" placeholder="Name" onChange={handleAddRestaurantChange} />

                    <label>Address</label>
                    <input className="u-full-width" id="name" type="text" value={restaurant.address} name="address" placeholder="Address" onChange={handleAddRestaurantChange} />

                    <label>City</label>
                    <input className="u-full-width" id="name" type="text" value={restaurant.city} name="city" placeholder="City" onChange={handleAddRestaurantChange} />

                    <label>State</label>
                    <input className="u-full-width" id="name" type="text" value={restaurant.state} name="state" placeholder="State" onChange={handleAddRestaurantChange} />

                    <label>Zip Code</label>
                    <input className="u-full-width" id="name" type="text" value={restaurant.zipCode} name="zipCode" placeholder="Zip Code" onChange={handleAddRestaurantChange} />

                    <button className="button-primary" id="submitButton" type="submit" onClick={handleAddRestaurantSubmit}>Add Restaurant</button>
                    &nbsp;
                    <button className="button-primary" type="submit" onClick={() => setAddingRestaurant(false)} >Cancel Add</button>
                    <div style={{color: 'red'}} >&nbsp;{addRestaurantErrorMessage}</div>
                    <div>&nbsp;{addRestaurantResponseMessage}</div>
                </div>
            
            
            ): loading || !restaurants? (
                <div>
                    <p>No restaurants to display.</p>
                    <button className="btn btn-primary me-2" onClick={() => setAddingRestaurant(true)}>Add Restaurant</button>
                </div>
             
            ) : (
                <div>
                    {
                        restaurants.map(restaurant => {
                            return (
                                    <div className="card" key={restaurant.id}>
                                        <div className="card-header d-flex justify-content-center align-items-center">
                                            {/* <p className="p-2"><b>Restaurant Id:</b> {restaurant.id}</p> */}
                                            <p className="p-2"><b>Restaurant Name:</b> {restaurant.name}</p>
                                            <p className="p-2"><b>City:</b> {restaurant.city}</p>
                                            <p className="p-2"><b>State:</b> {restaurant.state}</p>
                                        </div>
                                        {/* <button className="btn btn-primary me-2" onClick={() => console.log('clicked')}>View Restaurant</button> */}
                                        <button className="button-primary" id="submitButton" type="submit" style={{ backgroundColor: 'red'}} onClick={() => handleSubmit(restaurant)}>View Restaurant</button>
                                    </div>
                            )
                        })
                    }
                    <button className="btn btn-primary me-2" onClick={() => setAddingRestaurant(true)}>Add Restaurant</button>
                </div>
                
            )}  
        </div>
    )

}

export default UserRestaurants;