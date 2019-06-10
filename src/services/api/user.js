import request from "Homecooked/src/utils/request";

const updateUser = (id, userInput) => {
    return request({
        method: "PUT",
        url: `/user/${id}`,
        data: {
            userInput
        }
    });
};

const getBookingsForUser = id => {
    return request({
        method: "GET",
        url: `/user/${id}/bookings`
    });
};

const getUserById = id => {
    return request({
        method: "GET",
        url: `/user/${id}`
    });
};

const UserService = {
    updateUser,
    getBookingsForUser,
    getUserById
};

export default UserService;
