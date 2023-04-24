import React, { useState, useEffect } from "react";
import RestaurantView from "../panels/RestaurantView";
import { useLocation } from "react-router-dom";

const SingleRestaurant = (props) => {

    const location = useLocation();

    console.log("props from Single Restaurant");
    // console.log(props);
    console.log(location.state.selected_restaurant);

    useEffect(() => {
        console.log("Restaurant");
    })

    return (
        <div>
            {/* <NavbarLoggedIn/> */}

                <RestaurantView 
                    restaurant={location.state.selected_restaurant}
                />

        </div>
    )
}

export default SingleRestaurant;