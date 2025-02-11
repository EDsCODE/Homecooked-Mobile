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

const getNotificationsForUser = (id, userType) => {
    return request({
        method: "GET",
        url: `/user/${id}/notifications`,
        params: {
            userType
        }
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

const checkIfEmailInUse = email => {
    return request({
        method: "GET",
        url: `/user/email`,
        params: {
            email
        }
    });
};

const UserService = {
    updateUser,
    getBookingsForUser,
    getUserById,
    savePaymentDetails,
    updatePaymentDetails,
    getNotificationsForUser,
    checkIfEmailInUse
};

export default UserService;
