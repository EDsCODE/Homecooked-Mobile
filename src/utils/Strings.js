import parse from "url-parse";
import qs from "qs";

export const reverse = text => {
    var array = text.split(",");
    array = array.reverse();
    array = array.map(string => string.trim());
    return array.join(", ");
};

export const buildAddress = address => {
    let string = "";
    string += address.houseNumber ? address.houseNumber : " ";
    string += address.street ? " " + address.street : "";
    string += address.city ? " " + address.city : "";
    string += address.state ? " " + address.state : "";
    return string;
};

export const parseURL = url => {
    var urlcomponents = parse(url);
    var params = qs.parse(urlcomponents.query.slice(1));
    return {
        url: urlcomponents.href,
        params
    };
};
