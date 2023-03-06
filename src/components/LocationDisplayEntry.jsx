import React from "react";

const LocationDisplayEntry = (props) => {
    return (
        <div className="card">
            <div className = "card-header d-flex justify-content-center align-items-center">
                <h5 className="m-0">{props.location.locationName}</h5>
                <div className="flex-fill"></div>
                <button className="btn btn-primary me-2" onClick={() => props.editLocation(props.location.locationId, props.location)}>Edit</button>
                {/* <button className="btn btn-primary me-2" onClick={() => props.deactivatingUser(props.user.id, props.user)}>{props.activeState}</button> */}
                <button className="btn btn-primary me-2" onClick={() => props.deactivatingUser(props.user.id, props.user)}>Deactivate</button>
                <button className="btn btn-primary" data-bs-toggle="collapse" data-bs-target={"#location-" + props.location.locationId}>Expand</button>
            </div>
            <div className="card-body collapse" id={"location-" + props.location.locationId}>
                <div className = "d-flex flex-wrap justify-content-center">
                    <p className="p-2"><b>Location Id:</b> {props.location.locationId} </p>
                    <p className="p-2"><b>Location Name:</b> {props.location.locationName} </p>
                    <p className="p-2"><b>Location Address:</b> {props.location.address} </p>
                    <p className="p-2"><b>Location City:</b> {props.location.city} </p>
                    <p className="p-2"><b>Location State:</b> {props.location.state} </p>
                    <p className="p-2"><b>Location Zip Code:</b> {props.location.zipCode} </p>
                    <p className="p-2"><b>Location Active:</b> {props.location.locationActive} </p>
                </div>
            </div>
        </div>
    )
}

export default LocationDisplayEntry;

