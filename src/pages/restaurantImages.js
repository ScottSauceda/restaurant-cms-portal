import React, { useState, useEffect } from "react";
import ImagesView from "../panels/ImagesView";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { useLocation } from "react-router-dom";

const RestaurantImages = (props) => {
    const location = useLocation();

    console.log("props for RestaurantImages");
    console.log(location.state.restaurant_images);
    console.log(location.state.restaurant_id);

    useEffect(() => {
        console.log("Restaurant Images");
    })

    return (
        <div>
            <NavbarLoggedIn />
            <div className = "container-lg">
                <h1>Restaurant Images</h1>
                <ImagesView 
                    images = {location.state.restaurant_images}
                    restaurantId = {location.state.restaurant_id}
                />
            </div>
        </div>
    )
}

export default RestaurantImages;