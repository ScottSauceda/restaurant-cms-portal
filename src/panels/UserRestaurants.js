import React, { useState, useEffect } from "react";

import { GetUserRestaurants } from "../hooks";
import { useNavigate } from "react-router-dom";

const UserRestaurants = () => {
    const navigate = useNavigate();

    const [data, loading] = GetUserRestaurants(0, sessionStorage.getItem('userId'));
    const [restaurants, setRestaurants] = useState(null);
    
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
        navigate("/restaurant", { state : { selected_restaurant: restaurant }});
    }
                

    return (
        <div>
            {loading || !restaurants?(
                <div>
                    <p>No restaurants to display.</p>
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
                </div>
            )}  
        </div>
    )

}

export default UserRestaurants;