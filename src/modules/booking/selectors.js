export const getBookingsForUser = state => {
    let bookingsDict = state.currentBookings.byId;
    return Object.values(bookingsDict);
};
