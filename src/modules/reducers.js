import { combineReducers } from "redux";

import authReducer from "./auth/reducers";
import hostReducer from "./host/reducers";
// import feedReducer from "./feed/reducers";
// import historyReducer from "./history/reducers";
// import notificationsReducer from "./notifications/reducers";
// import settingsReducer from "./settings/reducers";

const appReducer = combineReducers({
    auth: authReducer,
    host: hostReducer
    // feed: feedReducer,
    // history: historyReducer,
    // notifications: notificationsReducer,
    // settings: settingsReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
