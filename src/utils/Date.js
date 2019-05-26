import moment from "moment";

function _mealType(hour) {
    if (mealType < 16) {
        return "Lunch";
    } else {
        return "Dinner";
    }
}

function mealType(date) {
    let hour = moment(date).format("H");
    let type = _mealType(hour);
    return type;
}

function dateWithMealType(date) {
    let parsed = moment(date);
    let hour24 = parsed.format("H");
    let type = _mealType(hour24);

    let hour = parsed.format("h");
    let period = parsed.format("a");

    return `${type} at ${hour} ${period}`;
}

export { dateWithMealType, mealType };
