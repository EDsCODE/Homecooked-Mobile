import axios from "axios";
import { GOOGLE_API_KEY } from "../config/constants";

export const getPossibleMatches = async (address, sessiontoken) => {
    try {
        let parsedAddress = address.trim().replace("/s/g", "+");
        let results = await axios.get(
            "https://maps.googleapis.com/maps/api/place/autocomplete/json",
            {
                params: {
                    input: parsedAddress,
                    key: GOOGLE_API_KEY,
                    sessiontoken
                }
            }
        );
        return results.data.predictions;
    } catch (err) {
        return err;
    }
};

export const getPlaceDetails = async (placeid, sessiontoken) => {
    try {
        let results = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json`,
            {
                params: {
                    key: GOOGLE_API_KEY,
                    sessiontoken,
                    placeid
                }
            }
        );
        let address = {
            addressComponents: _formatAddressComponents(
                results.data.result.address_components
            ),
            formattedAddress: results.data.result.formatted_address,
            geometry: results.data.result.geometry.location
        };
        return address;
    } catch (err) {
        return err;
    }
};

function _formatAddressComponents(components) {
    let addressComponents = {};
    components.forEach(element => {
        addressComponents[element.types[0]] = element.short_name;
    });
    return addressComponents;
}

export const getLatLong = async (
    houseNumber = "",
    address = "",
    city = "",
    state = "",
    country = "",
    postalcode = ""
) => {
    try {
        let searchText = `${houseNumber}+${address}+${city}+${state}+${country}+${postalcode}`;
        let results = await axios.get(
            "https://geocoder.api.here.com/6.2/geocode.json",
            {
                params: {
                    app_id: "P0huG4tRJDAmzp7QbfI3",
                    app_code: "znw463Gu-i87Cwv6rerF4A",
                    searchText
                }
            }
        );
        return results;
    } catch (error) {
        return err;
    }
};
