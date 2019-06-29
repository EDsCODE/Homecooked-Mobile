import { REDIRECT_URL, CLIENT_ID, STRIPE_PK } from "../config/constants";
import axios from "axios";
import qs from "qs";
const STRIPE_URL = "https://api.stripe.com/v1/";

export const hostSignUpUrl = chefId => {
    return `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${REDIRECT_URL}&client_id=${CLIENT_ID}&state=${chefId}`;
};

export const createToken = details => {
    let convertedDetails = _convertCardDetails(details);
    console.log(convertedDetails);
    return axios
        .post(STRIPE_URL + "tokens", qs.stringify(convertedDetails), {
            headers: {
                ["Accept"]: "application/json",
                ["Content-Type"]: "application/x-www-form-urlencoded",
                ["Authorization"]: "Bearer " + STRIPE_PK
            }
        })
        .then(res => {
            return res.data;
        });
};

const _convertCardDetails = values => {
    let convertedDetails = {};
    for (key in values) {
        const newKey = `card[${key}]`;
        convertedDetails[newKey] = values[key];
    }
    return convertedDetails;
};

export function formatCardDetails(values) {
    let { number, expiry, cvc } = values;
    let expDetails = expiry.split("/");
    let trimmedNumber = number.replace(/\s+/g, "");
    let details = {
        number: trimmedNumber,
        exp_month: Number(expDetails[0]),
        exp_year: Number(expDetails[1]),
        cvc: cvc
    };
    return details;
}
