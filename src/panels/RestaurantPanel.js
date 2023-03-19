import React, { useState, useEffect } from "react";
import EditRestaurantForm from "../forms/EditRestaurantForm";
import DeactivateRestaurantForm from "../forms/DeactivateRestaurantForm";

import { GetUserRestaurants } from "../hooks";
import RestaurantDisplay from "../tables/RestaurantDisplay";
import AddRestaurantForm from "../forms/AddRestaurantForm";
import { useNavigate } from "react-router-dom";
import AddImageForm from "../forms/AddImageForm";
import DeleteImageForm from "../forms/DeleteImageForm";

const RestaurantPanel = () => {
    const navigate = useNavigate();

    if(sessionStorage.getItem('userLoginStatus') == true){
        console.log("user logged in, fetching restaurants");
      } else {
        // const tempID = 2;
      }

    const [data, loading] = GetUserRestaurants(0, sessionStorage.getItem('userId'));
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
                    restaurantImages: obj.restaurantImages
                };
            });
            setRestaurants( formattedRestaurant)
        }
    }, [data]);

    // booleans for switching views between forms in the return below
    const [addingPhoto, setAddingPhoto] = useState(false);
    const [deleteingPhoto, setDeletingPhoto] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deactivating, setDeactivating] = useState(false);

    const addRestaurant = (restaurant) => {
        // restaurant.id = restaurants[restaurants-1].id + 1;
        setRestaurants([...restaurants, restaurant]);
    };

    const addImage = (id, restaurant) => {
        setAddingPhoto(true);
        setCurrentRestaurant(restaurant);
    }

    const initialRestaurant = {id: null, ownerId: "", name: "", address: "", city: "", state: "", zipCode: "", ownerName: "", isActive: "",  restaurantReviews: [], restaurantImages: []};
    const[ currentRestaurant, setCurrentRestaurant] = useState(initialRestaurant);

    const initialImage = {imgId: null, imgName: "", imgSrc: "", imgType: "", usersId: null};
    // const [currentImage, setCurrentImage] = useState(initialImage);




    const editRestaurant = (id, restaurant) => {
        setEditing(true);
        setCurrentRestaurant(restaurant);
    }   

    const deactivatingRestaurant = (id, restaurant) => {
        setDeactivating(true);
        setCurrentRestaurant(restaurant);
    }

    const updateDeactivateRestaurant = (oldRestaurant) => {
        setDeactivating(false);
        setCurrentRestaurant(oldRestaurant);
        
    }

    const updateRestaurant = (newRestaurant) => {
        setEditing(false);
        setCurrentRestaurant(newRestaurant);
    }


    const deleteImage = (id, image, restaurant) => {
        setDeletingPhoto(true);
        // setCurrentImage(image);
        setCurrentRestaurant(restaurant)
    }



    return (
        <div className="row">
            <div className="col-md-3">
                {deactivating ? (
                    <div>
                        <h2>Set Active</h2>
                        <DeactivateRestaurantForm 
                            currentRestaurant={currentRestaurant}
                            setDeactivating={setDeactivating}
                            updateDeactivateRestaurant={updateDeactivateRestaurant}
                        />
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
                ) : addingPhoto ? (
                    <div>
                        <h2>Add Photo</h2>
                        <AddImageForm 
                            currentRestaurant={currentRestaurant}
                            setAddingPhoto={setAddingPhoto}
                            addImage={addImage} 
                        />
                    </div>
                ) : deleteingPhoto? (
                    <div>
                        <h2>Delete Photo</h2>
                        <DeleteImageForm 
                            // currentImage={currentImage}
                            currentRestaurant={currentRestaurant}
                            setDeletingPhoto={setDeletingPhoto}
                            deleteImage={deleteImage}
                        />
                    </div>
                ) : (
                    <div>
                        <h2>Add Restaurant</h2>
                        <AddRestaurantForm 
                            addRestaurant={addRestaurant} 
                        />
                    </div>
                )}
            </div>
            {loading || !restaurants ? (
                <div className="col-md-9">
                    <p>Loading...</p>
                </div>
            ): (
                <div className="col-md-9">
                    <h2>View restaurants</h2>
                    <RestaurantDisplay 
                        restaurants={restaurants}
                        editRestaurant={editRestaurant}
                        deactivatingRestaurant={deactivatingRestaurant}
                        addImage={addImage}
                        deleteImage={deleteImage}
                    />
                </div>
            )}        
        </div>
    )
}

export default RestaurantPanel;