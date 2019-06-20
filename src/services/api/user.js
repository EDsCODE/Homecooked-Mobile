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

const getNotificationsForUser = id => {
    return request({
        method: "GET",
        url: `/user/${id}/notifications`
    });
};

const getUserById = id => {
    return request({
        method: "GET",
        url: `/user/${id}`
    });
};

const savePaymentDetails = (id, source, email) => {
    return request({
        method: "POST",
        url: `/user/${id}/payment`,
        data: {
            source,
            email
        }
    });
};

const updatePaymentDetails = (id, source, customer) => {
    return request({
        method: "PUT",
        url: `/user/${id}/payment`,
        data: {
            source,
            customer
        }
    });
};

const UserService = {
    updateUser,
    getBookingsForUser,
    getUserById,
    savePaymentDetails,
    updatePaymentDetails,
    getNotificationsForUser
};

export default UserService;
