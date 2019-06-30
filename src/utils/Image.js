import { API_URL } from "../config/constants";

export const url = key => {
    return `${API_URL}image/${key}`;
};
