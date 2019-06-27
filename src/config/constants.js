export const API_URL = "http://172.27.7.197:3000";
export const GOOGLE_API_KEY = "AIzaSyALPiDn5Yo4sYb574VHQY3DnASadnoBUhQ";
export const STRIPE_CLIENT_ID = "ca_FFkrxwBWxtXVlE0owsTs0dHjHyCIwQCo";
export const STRIPE_HOST_ACCOUNT_URL = (id, email, firstName) => {
    return `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${API_URL}/chef/account&client_id=${STRIPE_CLIENT_ID}&state=${id}&stripe_user[business_type]=individual&stripe_user[email]=${email}&stripe_user[first_name]=${firstName}&stripe_user[product_description]=${"Hosting on Gathr platform"}`;
};

export const STRIPE_PK = "pk_test_6pW9hrDrYfWI8PTI2Y88HNGp00sEZSvXn9";
