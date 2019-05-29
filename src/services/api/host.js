import request from "Homecooked/src/utils/request";

const createApplication = (userId, address, lat, lng, reason, experience) => {
    return request({
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        url: `/chef/${userId}/application`,
        data: {
            address,
            lat,
            lng,
            reason,
            experience
        }
    });
};

const getChef = userId => {
    return request({
        method: "GET",
        url: `/chef/${userId}`
    });
};

const HostService = {
    createApplication,
    getChef
};

export default HostService;
