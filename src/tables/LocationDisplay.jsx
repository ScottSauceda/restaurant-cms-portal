import React from "react";
import LocationDisplayEntry from "../components/LocationDisplayEntry";

const LocationDisplay = (props) => {
    return (
        <div className="d-flex flex-column justify-content-center">
            {
                props.locations.length > 0 ? (
                    props.locations.map(location => {
                        return (
                            <LocationDisplayEntry 
                            location = {location}
                            editLocation = {props.editLocation}
                            />
                        )
                    })
                ) : (
                    <div>
                        <p>No locations found</p>
                    </div>
                )
            }
        </div>
    )
}

export default LocationDisplay;