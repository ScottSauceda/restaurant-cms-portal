import React, { useState, useEffect } from "react";
import EditLocationForm from "../forms/EditLocationForm";

import { GetUserLocations } from "../hooks";
import LocationDisplay from "../tables/LocationDisplay";

const LocationPanel = () => {
    const [data, loading] = GetUserLocations(0);
    const [locations, setLocations] = useState(null);

    useEffect(() => {
        if(data){
            console.log("locations data");
            console.log(data);
            const formattedLocations = data.map((obj, i) => {
                return {
                    locationId: obj.locationId,
                    locationName: obj.locationName,
                    address: obj.address,
                    city: obj.city,
                    state: obj.state,
                    zipCode: obj.zipCode,
                    locationActive: obj.locationActive
                };
            });
            setLocations(formattedLocations);
        }
    }, [data]);

    const addLocation = (location) => {

    }

    const [editing, setEditing] = useState(false);
    const [deactivating, setDeactivating] = useState(false);

    const initialLocation = { id: null, locationId: "", locationName: "", address: "", city: "", state: "", zipCode: "", locationActive: "" }
    const [currentLocation, setCurrentLocation] = useState(initialLocation);

    const editLocation = (id, location) => {
        setEditing(true);
        setCurrentLocation(location);
    }

    const deactivatingLocation = (id, location) => {

    }

    const updateDeactivateLocation = (oldLocation) => {

    }

    const updateLocation = (newLocation) => {

    }


    return (
        <div className="row">
        <div className="col-md-3">
            { deactivating ? (
                <div>
                    <h2>Set Active</h2>
                </div>
            ) : editing ? (
                <div>
                    <h2>Edit Location</h2>
                    <EditLocationForm 
                        currentLocation={currentLocation}
                        setEditing={setEditing}
                        updateLocation={updateLocation}
                    />
                </div>
            ) : (
                <div>
                    <h2>Add Location</h2>
                </div>
            )

            }
        </div>
        {loading || !locations ? (
            <div className="col-md-9">
                <p>Loading...</p>
            </div>
        ): (
            <div>
                <h2>View locations</h2>
                <LocationDisplay 
                    locations={locations}
                    editLocation={editLocation}
                />
            </div>
        )}        
    </div>
    );
};

export default LocationPanel;