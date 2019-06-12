import { REDIRECT_URL, CLIENT_ID } from "../config/constants";

export const hostSignUpUrl = chefId => {
    return `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${REDIRECT_URL}&client_id=${CLIENT_ID}&state=${chefId}`;
};
