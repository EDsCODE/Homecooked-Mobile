import request from "Homecooked/src/utils/request";

const updateUser = (userId, userInput) => {
    return request({
        method: "PUT",
        url: `/user/${userId}`
    });
};

const UserService = {
    updateUser
};

export default UserService;
