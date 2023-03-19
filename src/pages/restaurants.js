import React from "react";
import RestaurantPanel from "../panels/RestaurantPanel";
import Navbar from "../components/Navbar";

const Restaurant = () => {
    return (
        <div className="container-lg">
            <h1>Restaurant</h1>
            <RestaurantPanel></RestaurantPanel>
        </div>
    )
}

export default Restaurant;