import React, { useState, useEffect } from 'react';

const RestaurantDisplayEntry = (props) => {
    console.log("restaurantDisplayEntry props");
    console.log(props.deleteImage);

    console.log('props');
    console.log(props);


    const [images, setImages] = useState("");

    useEffect(() => {
        if(props.restaurant.restaurantImages){
            // console.log("restaurant has images");
            // console.log(props.restaurant.restaurantImages.length)
            setImages(true);
        } else {
            // console.log("restaurant has no images");
        }
    });

    return (
        <div className="card" key={props.restaurant.id}>
            <div className="card-header d-flex justify-content-center align-items-center">
                <h5 className="m-0">{props.restaurant.name}</h5>
                <div className="flex-fill"></div>
                <button className="btn btn-primary me-2" onClick={() => props.addImage(props.image, props.restaurant)}>Add Photo</button>
                <button className="btn btn-primary me-2" onClick={() => props.editRestaurant(props.restaurant.ownerId, props.restaurant)}>Edit</button>
                <button className="btn btn-primary me-2" onClick={() => props.deactivatingRestaurant(props.restaurant.Id, props.restaurant)}>{props.activeState}</button>
                <button className="btn btn-primary" data-bs-toggle="collapse" data-bs-target={"#restaurant-" + props.restaurant.id}>Expand</button>
            </div>
            <div className="card-body collapse" id={"restaurant-" + props.restaurant.id}>
                <div className="d-flex flex-wrap justify-content-center">
                    <p className="p-2"><b>Restaurant ID:</b> {props.restaurant.id}</p>
                    <p className="p-2"><b>Address:</b> {props.restaurant.address}</p>
                    <p className="p-2"><b>City:</b> {props.restaurant.city}</p>
                    <p className="p-2"><b>State:</b> {props.restaurant.state}</p>
                    <p className="p-2"><b>Zip Code:</b> {props.restaurant.zipCode}</p>
                    <p className="p-2"><b>Owner ID:</b> {props.restaurant.id}</p>
                    <p className="p-2"><b>Owner Name:</b> {props.restaurant.ownerName}</p>
                    <p className="p-2"><b>Active Status:</b> {props.restaurant.isActive}</p>
                    <p className="p-2"><b>Reviews:</b> <a href={"http://localhost:4200/restaurants/" + props.restaurant.id} >See Reviews</a></p> 
                </div>
                {
                            images ? (
                                <div className="d-flex flex-wrap justify-content-center">
                                    {
                                        props.restaurant.restaurantImages.map((image, index) => {
                                            return <div key={index}>
                                                <p>image name:{image.imgName}</p>
                                                <p>image type: {image.imgType}</p>
                                                <img src={image.imgSrc} width={250} height={250} />
                                                {/* <button className="btn btn-primary me-2" onClick={() => props.deleteImage(props.image, props.restaurant)}>Delete Photo Id:{image.imgId}</button> */}
                                                <button className="btn btn-primary me-2" onClick={() => props.deleteImage(props.restaurant, image)}>Delete Photo Id:{image.imgId}</button>
                                            </div>
                                        })
                                    }
                                </div>
                            ) : (
                                <div> No Images to display.</div>
                            )
                        }
            </div>
        </div>
    )
}

export default RestaurantDisplayEntry;