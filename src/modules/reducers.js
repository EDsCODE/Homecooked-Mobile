import { combineReducers } from "redux";

import authReducer from "./auth/reducers";
import hostReducer from "./host/reducers";
import currentUserReducer from "./currentUser/reducers";
import userReducer from "./user/reducers";
import feedReducer from "./feed/reducers";
import eventReducer from "./event/reducers";
import bookingReducer from "./booking/reducers";
import historyReducer from "./history/reducers";
// import notificationsReducer from "./notifications/reducers";
// import settingsReducer from "./settings/reducers";

const appReducer = combineReducers({
    auth: authReducer,
    host: hostReducer,
    currentUser: currentUserReducer,
    feed: feedReducer,
    events: eventReducer,
    bookings: bookingReducer,
    history: historyReducer,
    users: userReducer
    // notifications: notificationsReducer,
    // settings: settingsReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
