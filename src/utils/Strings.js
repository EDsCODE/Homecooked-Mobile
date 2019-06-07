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
