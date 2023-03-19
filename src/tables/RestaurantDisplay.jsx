import React from "react";
import RestaurantDisplayEntry from "../components/RestaurantDisplayEntry";

const RestaurantDisplay = (props) => {

    let activeState = "";
    console.log("RestaurantDisplay props");
    console.log(props);

    return (
        <div className="d-flex flex-column justify-content-center">
            {
                props.restaurants.length > 0 ? (
                    props.restaurants.map(restaurant => {
                        if(restaurant.isActive === "true"){
                            activeState = "Deactivate";
                        } else {
                            activeState = "Activate";
                        }
                    
                        // console.log("activeState");
                        // console.log(activeState);

                        return (
                            <RestaurantDisplayEntry 
                                restaurant = {restaurant}
                                editRestaurant = {props.editRestaurant}
                                deactivatingRestaurant = {props.deactivatingRestaurant}
                                addImage = {props.addImage}
                                deleteImage = {props.deleteImage}
                                activeState = {activeState}
                            />
                            )
                        })
                        ) : (
                            <div>
                                <p> No Restaurants found </p>
                            </div>
                )
            }
        </div>
    )
}

export default RestaurantDisplay;