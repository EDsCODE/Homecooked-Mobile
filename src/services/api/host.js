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

const createChefMedia = (chefId, key, type) => {
    return request({
        method: "POST",
        url: `/chef/${chefId}/media`,
        data: {
            key,
            type
        }
    });
};

const createChef = userId => {
    return request({
        method: "POST",
        url: "/chef",
        data: {
            userId
        }
    });
};

const HostService = {
    createApplication,
    getChefByUserId,
    createChefMedia,
    createChef
};

export default HostService;
