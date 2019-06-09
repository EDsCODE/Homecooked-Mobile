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

const UserService = {
    updateUser,
    getBookingsForUser
};

export default UserService;
