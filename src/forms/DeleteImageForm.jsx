import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteImageForm = (props) => {

    console.log("deleteImageForm props");
    console.log(props);

    console.log("props.image");
    console.log(props.image);

    console.log("props.id");
    console.log(props.restaurant);

    // const [image, setImage] = useState("");
    const [image, setImage] = useState(props.currentImage);
    const [imgId, setImgId] = useState(props.imgId);
    const [imgName, setImgName] = useState(props.imgName);
    const [confirmName, setConfirmName] = useState("");



    const handleChange = e => {
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

        setImage({...image, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();

        console.log("SUBMIT CLICKED! 1");

        if(image.imgName){

            console.log(image.imgName);

            console.log("image name exists in deleteimageform");
            handleChange(e, props.deleteImage(image));
        } else {
            console.log("image does not exists, image not updating");
        }

        console.log("image to be deleted");
        console.log(image);

        // const data = {imgId, imgName, imgSrc, imgType, usersId};
        // console.log('data', data);

        // setUsersId(sessionStorage.getItem('userId'));

        axios
        .delete("http://localhost:8080/api/image/restaurant/delete/"+props.image.imgId, {
            // imgId: data.imgId,
            // imgName: data.imgName,
            // imgSrc: data.imgSrc,
            // imgType: data.imgType,
            // usersId: data.usersId   
        })

        // console.log('data sent for delete image form');
        // console.log(data);

        console.log("SUBMIT CLICKED! 2");
    }

    return(
        <form>
            <label>Image Id(read only)</label>
            <input className="u-full-width" id="imgId" name="imgId" type="text" value={props.image.imgId} placeholder="---" readOnly />

            <label>Image Name(readonly)</label>
            <input className="u-full-width" id="imgName" name="imgName" type="text" value={props.image.imgName} placeholder="---"  readOnly />

            <label>Confirm Image Name</label>
            <input className="u-full-width" id="confirmImgName" name="confirmImgName" type="text" value={confirmName} placeholder="www.image.jpg" onChange={handleChange} />

            <button className="button-primary" id="submitButton" type="submit" style={{ backgroundColor: 'red'}} onClick={handleSubmit}>Delete Image</button>
        </form>
    )

}

export default DeleteImageForm;