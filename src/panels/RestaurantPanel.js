import React, { useState, useEffect } from "react";
import EditRestaurantForm from "../forms/EditRestaurantForm";

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
                    ownerId: obj.ownerId,
                    name: obj.name,
                    address: obj.address,
                    city: obj.city,
                    state: obj.state,
                    zipCode: obj.zipCode,
                    isActive: "" + obj.isActive,
                    ownerName: obj.ownerName,
                    restaurantReviews: obj.restaurantReviews,
                };
            });
            setRestaurants(formattedRestaurant)
        }
    }, [data]);

    const addRestaurant = (restaurant) => {

    };

    // const deactivateUser = (id) => {
    //     setrestaurants(restaurants.filter((user) => user.id !== id));
    // };


    const [editing, setEditing] = useState(false);
    const [deactivating, setDeactivating] = useState(false);

    const initialRestaurant = {id: null, ownerId: "", name: "", address: "", city: "", state: "", zipCode: "", ownerName: "", isActive: "",  restaurantReviews: []};
    const[ currentRestaurant, setCurrentRestaurant] = useState(initialRestaurant);


    const editRestaurant = (id, restaurant) => {
        setEditing(true);
        setCurrentRestaurant(restaurant);
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
                {deactivating ? (
                    <div>
                        <h2>Set Active</h2>
                    </div>
                ) : editing ? (
                    <div>
                        <h2>Edit Restaurant</h2>
                        <EditRestaurantForm 
                            currentRestaurant={currentRestaurant}
                            setEditing={setEditing}
                            updateRestaurant={updateRestaurant}
                        />
                    </div>
                ) : (
                    <div>
                        <h2>Add Restaurant</h2>
                    </div>
                )}
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
                        editRestaurant={editRestaurant}
                    />
                </div>
            )}        
        </div>
    )
}

export default RestaurantPanel;