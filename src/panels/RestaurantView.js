import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RestaurantView = (props) => {
    const navigate = useNavigate();
    
    const [restaurant, setRestaurant] = useState(null);

    // restaurant update state
    const [editing, setEditing] = useState(false);
    
    // const [restaurantId] = useState(props.restaurant.id);
    // const [ownerId, setOwnerId] = useState(props.restaurant.ownerId);
    
    const [name, setName] = useState(props.restaurant.name);
    const [address, setAddress] = useState(props.restaurant.address);
    const [city, setCity] = useState(props.restaurant.city);
    const [state, setState] = useState(props.restaurant.state);
    const [zipCode, setZipCode] = useState(props.restaurant.zipCode);
    const [editResponseMessage, setEditResponseMessage] = useState(null);
    const [editErrorMessage, setEditErrorMessage] = useState(null);


    // activate /deactivate
    const [deactivating, setDeactivating] = useState(false);
    const [isActive, setIsActive] = useState("")
    const [activeState, setActiveState] = useState("");
    const [confirmName, setConfirmName] = useState("");
    const [disabledStatus, setDisabledStatus] = useState(true);
    const [activateResponseMessage, setActivateResponseMessage] = useState(null);
    const [activateErrorMessage, setActivateErrorMessage] = useState(null);

    // add photo
    const initImage = { imgName: '', imgSrc: '', imgType: 'restaurant', usersId: 0};
    const [image, setImage] = useState(initImage);

    const [addingPhoto, setAddingPhoto] = useState(false);
    const [imgName, setImgName] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [imgType] = useState("restaurant");
    const [addImageResponseMessage, setAddImageResponseMessage] = useState(null);
    const [addImageErrorMessage, setAddImageErrorMessage] = useState(null);
    

    // delete photo
    const [deletingPhoto, setDeletingPhoto] = useState(false);

    useEffect(() => {
        console.log("newRestaurants");

        if(props.restaurant){
            console.log('restaurantView props');
            console.log(props.restaurant);

            setRestaurant(props.restaurant);

            if(props.restaurant.isActive == "true"){
                console.log("isActive = true");
                setActiveState("Deactivate");
            } else {
                console.log("isActive = false");
                setActiveState("Activate");
            }
        } else {
            console.log("No restaurant given");
        }
    }, [props]);


    const handleRestaurantChange = e => {
        const {name, value} = e.target;
        console.log('e.target.name: ' + name);
        console.log('e.target.value ' + value);

        switch(name){
            case 'name':
                setName(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'state':
                setState(value);
                break;
            case 'zipCode':
                setZipCode(value);
                break;
            default:
                console.log("Not a valid input option. Please try again.");
        }

        setRestaurant({...restaurant, [name]: value});
    }

    const handleActiveChange = e => {
        const {name, value} = e.target;
        console.log('e.target.name: ' + name);
        console.log('e.target.value ' + value);
        let button = document.getElementById('submitButton');
        let restaurantNameInput = document.getElementById('restaurantName');
//         // console.log('userNameInput', userNameInput);
        let deactivateRestaurantInput = document.getElementById('deactivateRestaurant');
        console.log('deactivateRestaurantInput', deactivateRestaurantInput);
        let activateRestaurantInput = document.getElementById('activateRestaurant');
        console.log('activateRestaurant', activateRestaurantInput);

        switch(name){
            case 'deactivateRestaurant':
                setIsActive(false);
                setName(name);
                setConfirmName(value);
                console.log("setting to false");
                if(restaurant.name == deactivateRestaurantInput.value){
                    button.style.opacity = "1";
                    setDisabledStatus(false);
                }
                break;
            case 'activateRestaurant':
                setIsActive(true);
                setName(name);
                setConfirmName(value);
                console.log("setting to true");
                if(restaurant.name == activateRestaurantInput.value){
                    button.style.opacity = "1";
                    setDisabledStatus(false);
                }
                break;
            default:
                console.log("Your input is not valid. Please try again.")
        }

        setRestaurant({...restaurant, [name]: value});

        console.log('handleActiveChange');
    }

    const handleImageChange = e => {
        const {name, value} = e.target;
        console.log('e.target.name: ' + name);
        console.log('e.target.value ' + value);

        switch(name){
            case 'imgName':
                setImgName(value);
                break;
            case 'imgSrc':
                setImgSrc(value);
                break;

            default:
                console.log("Not a valid input. Please try again.");
        }

        setImage({...image, [name]: value});
    }

    const handleDeleteChange = e => {
        const {name, value} = e.target;
        console.log('e.target.name: ' + name);
        console.log('e.target.value ' + value);

        switch(name){
            case 'name':
                setName(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'state':
                setState(value);
                break;
            case 'zipCode':
                setZipCode(value);
                break;
            default:
                console.log("Not a valid input option. Please try again.");
        }

        setRestaurant({...restaurant, [name]: value});
    }


    

    const handleRestaurantSubmit = e => {
        e.preventDefault();
        console.log('handleRestaurantSubmit clicked');

        // const data = {ownerId, name, address, city, state, zipCode, isActive};

        console.log("restaurant");
        console.log(restaurant);

        axios.put("http://localhost:8080/api/restaurant/update", 
        {
            restaurantId: restaurant.id,
            ownerId: restaurant.ownerId,
            name: restaurant.name,
            address: restaurant.address,
            city: restaurant.city,
            state: restaurant.state,
            zipCode: restaurant.zipCode,
            isActive: restaurant.isActive
        }, 
        { 
            withCredentials: true 
        })
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setEditResponseMessage(response.data);
            navigate("/newRestaurants");    

        })
        .catch((error) => {
            console.log(error);
            console.log("unspecified error");
            console.log(error.response.data);
            setEditErrorMessage(error.response.data);
        })
    

        
    }
    

    const handleActiveSubmit = e => {
        e.preventDefault();
        console.log('handleActiveSubmit clicked');

        const data = {isActive};

        console.log('user activate/decativate');
        console.log(isActive);


        axios.put("http://localhost:8080/api/restaurant/setActive", 
        {
            restaurantId: restaurant.id,
            ownerId: restaurant.ownerId,
            isActive: data.isActive
        }, 
        { 
            withCredentials: true 
        })
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setActivateResponseMessage(response.data);
            navigate("/newRestaurants");    
        })
        .catch((error) => {
            console.log(error);
            console.log("unspecified error");
            console.log(error.response.data);
            setActivateErrorMessage(error.response.data);
        })

        console.log('data sent for activate restaurant');
        console.log(data);

    }


    const handleImageSubmit = e => {
        e.preventDefault();
        console.log('handleImageSubmit clicked');

        // if(image.imgName){
        //     handleImageChange(e, props.addImage(image));
        // }

        console.log("image to be sent");
        console.log(image);

        const data = {imgName, imgSrc, imgType};
        console.log('data', data);


        axios
        .post("http://localhost:8080/api/image/restaurant/create/"+restaurant.id, 
        {
            imgName: data.imgName,
            imgSrc: data.imgSrc,
            imgType: data.imgType,
            usersId: restaurant.ownerId   
        }, 
        { 
            withCredentials: true 
        })
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setAddImageResponseMessage(response.data);
            navigate("/newRestaurants");    
        })
        .catch((error) => {
            console.log(error);
            console.log("unspecified error");
            console.log(error.response.data);
            setAddImageErrorMessage(error.response.data);
        })

        console.log('data sent for add image form');
        console.log(data);

    }

    const handleDeleteSubmit = e => {
        e.preventDefault();
        console.log('handleDeleteSubmit clicked');
    }

    const handleViewImages = images => {
        console.log('images');
        console.log(images);
        navigate("/restaurantImages", { state : { restaurant_images: images, restaurant_id: restaurant.id }});
    } 

    return (
        <div>
            { !props.restaurant ? (
                <div className="col-md-9">
                    <p>Loading...</p>
                </div>
            ) : editing? (
                <form>
                    <h2>Edit Restaurant</h2>

                    <label>Restaurant Id(read only)</label>
                    <input className="u-full-width" id="userName" type="text" value={restaurant.id} name="userName" readOnly />
    

                    <label>Name</label>
                    <input className="u-full-width" id="name" type="text" value={restaurant.name} name="name" placeholder = "Name" onChange={handleRestaurantChange}/>

                    <label>Address</label>
                    <input className="u-full-width" id="address" type="text" value={restaurant.address} name="address" placeholder = "Address" onChange={handleRestaurantChange}/>

                    <label>City</label>
                    <input className="u-full-width" id="city" type="text" value={restaurant.city} name="city" placeholder = "City" onChange={handleRestaurantChange}/>

                    <label>State</label>
                    <input className="u-full-width" id="state" type="text" value={restaurant.state} name="state" placeholder = "State" onChange={handleRestaurantChange}/>

                    <label>Zip Code</label>
                    <input className="u-full-width" id="zipCode" type="text" value={restaurant.zipCode} name="zipCode" placeholder = "Zip Code" onChange={handleRestaurantChange}/>

                    <button className="button-primary" id="submitButton" type="submit" onClick={handleRestaurantSubmit}>Save Changes</button>
                    <button className="button-primary" type="submit" onClick={() => setEditing(false)}>Cancel Edit</button>
                    <div style={{color: 'red'}} >&nbsp;{editErrorMessage}</div>
                    <div>&nbsp;{editResponseMessage}</div>
                </form>
            ) : deactivating? (
                <form>
                    <h2>Restaurant Active</h2>

                    <label>RestaurantId(read only)</label>
                    <input className="u-full-width" type="text" value={props.restaurant.id} name="id" readOnly />

                    <label>Name(read only)</label>
                    <input className="u-full-width" type="text" value={props.restaurant.name} name="name" readOnly />

                    {activeState == "Deactivate" ? (
                        <div>
                            <label>Type Restaurant Name To Deactivate</label>
                            <input className="u-full-width" id="deactivateRestaurant" type="text" value={confirmName} name="deactivateRestaurant" placeholder="Type Restaurant Name" onChange={handleActiveChange} />
                        </div>
                    ) : (
                        <div>
                            <label>Type Restaurant Name To Activate</label>
                            <input className="u-full-width" id="activateRestaurant" type="text" value={confirmName} name="activateRestaurant" placeholder="Type Restaurant Name" onChange={handleActiveChange} />
                        </div>
                    )}

                    <button className="button-primary" id="submitButton" type="submit" onClick={handleActiveSubmit} style={{ opacity: 0.2 }} disabled={disabledStatus} >{activeState} User</button>
                    <button className="button-primary" type="submit" onClick={() => setDeactivating(false)} >Cancel Edit</button>
                    <div style={{color: 'red'}} >&nbsp;{activateErrorMessage}</div>
                    <div>&nbsp;{activateResponseMessage}</div>
                </form>
            ) : addingPhoto ? (
                <form>
                    <h2>Adding Photo</h2>
                    <label>Restaurant Id(read only)</label>
                    <input className="u-full-width" id="name" type="text" value={restaurant.id} readOnly />

                    <label>Image Name</label>
                    <input className="u-full-width" id="name" type="text" value={image.imgName} name="imgName" placeholder="restaurantPic1" onChange={handleImageChange} />

                    <label>Image URL</label>
                    <input className="u-full-width" id="name" type="text" value={image.imgSrc} name="imgSrc" placeholder="www.image.jpg" onChange={handleImageChange} />
                    
                    <button className="button-primary" id="submitButton" type="submit" style={{ backgroundColor: 'red'}} onClick={handleImageSubmit}>Add Image</button>
                    <button className="button-primary" type="submit" onClick={() => setAddingPhoto(false)} >Cancel Add</button>
                    <div style={{color: 'red'}} >&nbsp;{addImageErrorMessage}</div>
                    <div>&nbsp;{addImageResponseMessage}</div>
                </form>
            ) : deletingPhoto ? (
                <form>
                    {/* <h2>Deleting Photo</h2>
                    <label>Image Id(read only)</label>
                    <input className="u-full-width" id="imgId" name="imgId" type="text" value={props.image.imgId} placeholder="---" readOnly />

                    <label>Image Name(readonly)</label>
                    <input className="u-full-width" id="imgName" name="imgName" type="text" value={props.image.imgName} placeholder="---"  readOnly />

                    <label>Confirm Image Name</label>
                    <input className="u-full-width" id="confirmImgName" name="confirmImgName" type="text" value={confirmName} placeholder="www.image.jpg" onChange={handleDeleteChange} />

                    <button className="button-primary" id="submitButton" type="submit" style={{ backgroundColor: 'red'}} onClick={handleDeleteSubmit}>Delete Image</button>
                    <button className="button-primary" type="submit" onClick={() => setDeletingPhoto(false)} >Cancel Delete</button> */}
                </form>
            ) : (
                <div className="row">
                    <div className="d-flex flex-column justify-content-center">
                        <div className="card">
                            <div className="card-header d-flex justify-content-center align-items-center">
                                <form>
                                    <p className="p-2"><b>Restaurant ID:</b> {props.restaurant.id}</p>
                                    <p className="p-2"><b>Restaurant Name:</b> {props.restaurant.name}</p>
                                    <p className="p-2"><b>Address:</b> {props.restaurant.address}</p>
                                    <p className="p-2"><b>City:</b> {props.restaurant.city}</p>
                                    <p className="p-2"><b>State:</b> {props.restaurant.state}</p>
                                    <p className="p-2"><b>Zip Code:</b> {props.restaurant.zipCode}</p>
                                    <p className="p-2"><b>Owner ID:</b> {props.restaurant.ownerId}</p>
                                    <p className="p-2"><b>Owner Name:</b> {props.restaurant.ownerName}</p>
                                    <p className="p-2"><b>Active Status:</b> {props.restaurant.isActive}</p>
                                    {/* <p className="p-2"><b>Restaurant Images:</b> <a href="" onClick={() => handleViewImages(props.restaurant.restaurantImages)}>View Restaurant Images</a> </p> */}
                                    <p className="p-2"><b>Restaurant Images:</b> <Link to={"/restaurantImages"} state = {{restaurant_images: props.restaurant.restaurantImages, restaurant_id: props.restaurant.id}}>View Restaurant Images</Link> </p>
                                    <p className="p-2"><b>Reviews:</b> <a href={"http://localhost:4200/" + props.restaurant.id} >See Reviews</a></p>
                                </form>
                            </div>
                            <button className="btn btn-primary me-2" onClick={() => setAddingPhoto(true)}>Add Photo</button>
                            <button className="btn btn-primary me-2" onClick={() => setEditing(true)}>Edit</button>
                            <button className="btn btn-primary me-2" onClick={() => setDeactivating(true)}>Activate/Deactivate</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RestaurantView;