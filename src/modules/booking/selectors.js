export const getBookingsForUser = state => {
    let bookingsDict = state.currentUser.bookings;
    return Object.values(bookingsDict);
};
