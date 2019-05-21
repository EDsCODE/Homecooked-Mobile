import axios from "axios";
import { API_URL } from "../config/constants";

// REF: https://gist.github.com/sheharyarn/7f43ef98c5363a34652e60259370d2cb

const client = axios.create({
    baseURL: API_URL
});

const request = options => {
    const onSuccess = res => {
        console.debug("Request Successful!", res);
        return res.data;
    };

    const onError = err => {
        console.log("Request Failed:", err.config);
        if (err.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.log("Status:", err.response.status);
            console.log("Data:", err.response.data);
            console.log("Headers:", err.response.headers);
        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.log("Error Message:", err.message);
        }
        return Promise.reject(err.response.data || err.message);
    };

    return client(options)
        .then(onSuccess)
        .catch(onError);
};

export default request;
