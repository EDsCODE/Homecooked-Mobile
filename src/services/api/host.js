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

const getChefByUserId = userId => {
    return request({
        method: "GET",
        url: `/user/${userId}/chef`
    });
};

const HostService = {
    createApplication,
    getChefByUserId
};

export default HostService;
