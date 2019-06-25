import request from "Homecooked/src/utils/request";

const createApplication = (userId, applicationInput) => {
    return request({
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        url: `/chef/${userId}/application`,
        data: applicationInput
    });
};

const updateHost = (id, hostInput) => {
    return request({
        method: "PUT",
        url: `/chef/${id}`,
        data: {
            hostInput
        }
    });
};

const getChefById = id => {
    return request({
        method: "GET",
        url: `/chef/${id}`
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
        url: `/chef/${chefId}/media/${key}`,
        data: {
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
    createChef,
    getChefById,
    updateHost
};

export default HostService;
