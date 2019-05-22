import React from "react";
import { Image, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { GOOGLE_API_KEY } from "Homecooked/src/config/constants";

const homePlace = {
    description: "Home",
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
    description: "Work",
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};

const GooglePlacesInput = () => {
    return (
        <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={2}
            autoFocus={false}
            returnKeyType={"default"}
            fetchDetails={true}
            styles={{
                textInputContainer: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderTopWidth: 0,
                    borderBottomWidth: 0
                },
                textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: "#5d5d5d",
                    fontSize: 16
                },
                predefinedPlacesDescription: {
                    color: "#1faadb"
                }
            }}
            query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: GOOGLE_API_KEY,
                language: "en" // language of the results
            }}
            currentLocation={false}
        />
    );
};

export default GooglePlacesInput;
