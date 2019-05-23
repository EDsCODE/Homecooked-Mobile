import moment from "moment";

function mealType(hour) {
    if (mealType < 16) {
        return "Lunch";
    } else {
        return "Dinner";
    }
}

function dateWithMealType(date) {
    let parsed = moment(date);
    let hour24 = parsed.format("H");
    let type = mealType(hour24);

    let hour = parsed.format("h");
    let period = parsed.format("a");

    return `${type} at ${hour} ${period}`;
}

export { dateWithMealType };
