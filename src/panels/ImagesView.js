import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ImagesView = (props) => {
    console.log("ImagesView props");
    console.log(props);

    const [deletingPhoto, setDeletingPhoto] = useState(false);
    const [image, setImage] = useState(props.currentImage);
    const [imgId, setImgId] = useState(props.imgId);
    const [imgName, setImgName] = useState(props.imgName);
    const [confirmName, setConfirmName] = useState("");
    const [deleteImageResponseMessage, setDeleteImageResponseMessage] = useState(null);
    const [deleteImageErrorMessage, setDeleteImageErrorMessage] = useState(null);
    

    useEffect(() => {

    })

    const handleDeleteChange = e => {
        const {name, value} = e.target;
        console.log('e.target.name: ' + name);
        console.log('e.target.value: ' + value);

        switch(name){
            case 'confirmImgName':
                setConfirmName(value);
                break;

            default:
                console.log("Not a valid input. Please try again.");
        }

        console.log("image has been updated");

        // setImage({...image, [name]: value});
    }

    const handleDeleteSubmit = e => {
        e.preventDefault();

        console.log("image to be deleted");
        console.log(image);

        axios
        .delete("http://localhost:8080/api/image/restaurant/delete/"+props.restaurantId, {data: {
            imgId: image.imgId,
            usersId: image.usersId   
        }})
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setDeleteImageResponseMessage(response.data);
            // navigate("/newRestaurants");    
        })
        .catch((error) => {
            console.log(error);
            console.log("unspecified error");
            console.log(error.response.data);
            setDeleteImageErrorMessage(error.response.data);
        })


    }

    return (
        <div>
            { props.images.length == 0 ? (
                <div className="col-md-9">
                    <p>No Images to display.</p>
                </div>
            ) : deletingPhoto ? (
                <form>
                    <h2>Delete Image</h2>
                    <label>Image Id(read only)</label>
                    <input className="u-full-width" id="imgId" name="imgId" type="text" value={image.imgId} placeholder="---" readOnly />

                    <label>Image Name(readonly)</label>
                    <input className="u-full-width" id="imgName" name="imgName" type="text" value={image.imgName} placeholder="---"  readOnly />

                    <label>Confirm Image Name</label>
                    <input className="u-full-width" id="confirmImgName" name="confirmImgName" type="text" value={confirmName} placeholder="www.image.jpg" onChange={handleDeleteChange} />

                    <button className="button-primary" id="submitButton" type="submit" style={{ backgroundColor: 'red'}} onClick={handleDeleteSubmit}>Delete Image</button>
                    <button className="button-primary" type="submit" onClick={() => setDeletingPhoto(false)} >Cancel Delete</button>
                    <div style={{color: 'red'}} >&nbsp;{deleteImageErrorMessage}</div>
                    <div>&nbsp;{deleteImageResponseMessage}</div>
                </form>
            ) : ( 
            <div>
                {
                    props.images.map(image => {
                        return (
                            <div className="row">
                                <div className="d-flex flex-column justify-content-center">
                                    <div className="card justify-content-center align-items-center">
                                        <p className="p-2"><b>Image Name:</b> {image.imgName}</p>
                                        <img src={image.imgSrc} width={450} height={350} />
                                        <button className="btn btn-primary me-2" onClick={() => {setDeletingPhoto(true); setImage(image)}}>Delete Photo</button>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            )}
        </div>
    )
}

export default ImagesView;