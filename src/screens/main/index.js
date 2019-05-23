import { createBottomTabNavigator } from "react-navigation";
import Feed from "./feed";
// import History from "./history";
// import Notifications from "./notifications";
import Settings from "./settings";

const MainStack = createBottomTabNavigator(
    {
        Feed: {
            screen: Feed
        },
        Settings: {
            screen: Settings
        }
    },
    {
        initialRouteName: "Feed"
    }
);

export default MainStack;
