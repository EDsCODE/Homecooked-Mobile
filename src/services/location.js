import axios from "axios";

export const getPossibleMatches = async address => {
    try {
        let parsedAddress = address.trim().replace("/s/g", "+");
        let results = await axios.get(
            "http://autocomplete.geocoder.api.here.com/6.2/suggest.json",
            {
                params: {
                    app_id: "P0huG4tRJDAmzp7QbfI3",
                    app_code: "znw463Gu-i87Cwv6rerF4A",
                    query: parsedAddress,
                    country: "USA",
                    resultType: "houseNumber"
                }
            }
        );
        return results.data.suggestions;
    } catch (err) {
        return err;
    }
};
