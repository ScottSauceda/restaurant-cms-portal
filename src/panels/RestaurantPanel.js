import React, { useState, useEffect } from "react";

import { GetUserRestaurants } from "../hooks";
import RestaurantDisplay from "../tables/RestaurantDisplay";

const RestaurantPanel = () => {
    const [data, loading] = GetUserRestaurants(0);
    const [restaurants, setRestaurants] = useState(null);
    
    useEffect(() => {
        if(data){
            console.log("RestaurantPanel Data");
            console.log(data);
            const formattedRestaurant = data.map((obj, i) => {
                return {
                    id: obj.restaurantId,
                    location_id: obj.location_id,
                    owner_id: obj.owner_id,
                    name: obj.name,
                    location_name: obj.location_name,
                    address: obj.address,
                    city: obj.city,
                    state: obj.state,
                    zip_code: obj.zip_code,
                    owner_name: obj.owner_name,
                    restaurantReviews: obj.restaurantReviews,
                };
            });
            setRestaurants(formattedRestaurant)
        }
    }, [data]);

    const addRestaurant = (restaurant) => {

    };


    // const [editing, setEditing] = useState(false);
    // const [deactivating, setDeactivating] = useState(false);
    
    const initialRestaurant = {id: null, location_id: "", owner_id: "", name: "", location_name: "", address: "", city: "", state: "", zip_code: "", owner_name: "",  restaurantReviews: []};
    const[ currentRestaurant, setCurrentRestaurant] = useState(initialRestaurant);


    const editRestaurant = (id, restaurant) => {
        
    }

    const deactivatingRestaurant = (id, restaurant) => {

    }

    const updateDeactivateRestaurant = (oldRestaurant) => {

    }

    const updateRestaurant = (newRestaurant) => {

    }


    return (
        <div className="row">
            <div className="col-md-3">
            </div>
            {loading || !restaurants ? (
                <div className="col-md-9">
                    <p>Loading...</p>
                </div>
            ): (
                <div>
                    <h2>View restaurants</h2>
                    <RestaurantDisplay 
                        restaurants={restaurants}
                    />
                </div>
            )}        
        </div>
    )
}

export default RestaurantPanel;