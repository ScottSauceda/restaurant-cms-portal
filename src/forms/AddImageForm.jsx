import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddImageForm = (props) => {

    console.log("props entering addImageForm");
    console.log(props);

    console.log("props.currentRestaurant.id");
    console.log(props.currentRestaurant.id);


    const initImage = { imgName: '', imgSrc: '', imgType: 'restaurant', usersId: 0};

    const [image, setImage] = useState(initImage);

    // IDs
    const [usersId] = useState(sessionStorage.getItem('userId'));
    const [restaurantId] = useState(props.currentRestaurant.id);

    // Data
    const [imgName, setImgName] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [imgType] = useState("restaurant");



    const handleChange = e => {
        const {name, value} = e.target;
        console.log('e.target.name: ' + name);
        console.log('e.target.value: ' + value);

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

    const handleSubmit = e => {
        e.preventDefault();


        console.log("SUBMIT CLICKED! 1");
        console.log("usersId");
        console.log(usersId);


        if(image.imgName){
            handleChange(e, props.addImage(image));
        }

        console.log("image to be sent");
        console.log(image);

        const data = {imgName, imgSrc, imgType, usersId};
        console.log('data', data);


        axios
        .post("http://localhost:8080/api/image/restaurant/create/"+restaurantId, {
            imgName: data.imgName,
            imgSrc: data.imgSrc,
            imgType: data.imgType,
            usersId: data.usersId   
        })

        console.log('data sent for add image form');
        console.log(data);

        console.log("SUBMIT CLICKED! 2");
    }

    return(
        <form>
            <label>Restaurant Id(read only)</label>
            <input className="u-full-width" id="name" type="text" value={restaurantId} readOnly />

            <label>Image Name</label>
            <input className="u-full-width" id="name" type="text" value={image.imgName} name="imgName" placeholder="restaurantPic1" onChange={handleChange} />

            <label>Image URL</label>
            <input className="u-full-width" id="name" type="text" value={image.imgSrc} name="imgSrc" placeholder="www.image.jpg" onChange={handleChange} />

            <button className="button-primary" id="submitButton" type="submit" style={{ backgroundColor: 'red'}} onClick={handleSubmit}>Add Image</button>
        </form>
    )

}

export default AddImageForm;