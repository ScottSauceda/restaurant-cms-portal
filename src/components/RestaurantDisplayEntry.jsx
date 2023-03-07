import React from "react";

const RestaurantDisplayEntry = (props) => {
    console.log("restaurantDisplayEntry props");
    console.log(props);
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-center align-items-center">
                <h5 className="m-0">{props.restaurant.name}</h5>
                <div className="flex-fill"></div>
                <button className="btn btn-primary me-2" onClick={() => props.editRestaurant(props.restaurant.id, props.restaurant)}>Edit</button>
                {/* <button className="btn btn-primary me-2" onClick={() => props.deactivatingUser(props.user.id, props.user)}>{props.activeState}</button> */}
                <button className="btn btn-primary me-2" onClick={() => props.deactivatingUser(props.user.id, props.user)}>Deactivate</button>
                <button className="btn btn-primary" data-bs-toggle="collapse" data-bs-target={"#restaurant-" + props.restaurant.id}>Expand</button>
            </div>
            <div className="card-body collapse" id={"restaurant-" + props.restaurant.id}>
                <div className="d-flex flex-wrap justify-content-center">
                    <p className="p-2"><b>Restaurant ID:</b> {props.restaurant.id}</p>
                    <p className="p-2"><b>Address:</b> {props.restaurant.address}</p>
                    <p className="p-2"><b>City:</b> {props.restaurant.city}</p>
                    <p className="p-2"><b>State:</b> {props.restaurant.state}</p>
                    <p className="p-2"><b>Zip Code:</b> {props.restaurant.zipCode}</p>
                    <p className="p-2"><b>Owner ID:</b> {props.restaurant.ownerId}</p>
                    <p className="p-2"><b>Owner Name:</b> {props.restaurant.ownerName}</p>
                    <p className="p-2"><b>Active Status:</b> {props.restaurant.isActive}</p>
                    <p className="p-2"><b>Reviews:</b> <a href="http://google.com">See Reviews</a></p> 
                    <ul>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default RestaurantDisplayEntry;