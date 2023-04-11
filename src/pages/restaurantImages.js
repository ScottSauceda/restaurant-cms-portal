import React, { useState, useEffect } from "react";
import ImagesView from "../panels/ImagesView";
import { useLocation } from "react-router-dom";

const RestaurantImages = (props) => {
    const location = useLocation();
    const [images, setImages] = useState("");
    const [restaurantId, setRestaurantId] = useState("");

    useEffect(() => {
        console.log("Restaurant Images");
        console.log(location.state);
        // setRestaurantId(location.state.restaurantId);
        // setImages(location.state.restaurant_images);

        if(location.state == null){
            // console.log("no restaurants to return");
        } else {
            // console.log("location.state");
            // console.log(location.state);
            // setRestaurantId(location.state.restaurantId);
            // setImages(location.state.RestaurantImages);
        }

        // console.log("props(images) for RestaurantImages page");
        // console.log(location.state.restaurant_images);
        
        // console.log("props(restaurant id) for RestaurantImages page");
        // console.log(location.state.restaurant_id);
    })

    return (
        <div>
            <div className = "container-lg">
                <h1>Restaurant Images</h1>
                <ImagesView 
                    key = {"#"}
                    images = {location.state.restaurant_images}
                    restaurantId = {location.state.restaurant_id}
                />
            </div>
        </div>
    )
}

export default RestaurantImages;