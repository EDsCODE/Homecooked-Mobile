import { createBottomTabNavigator } from "react-navigation";
import Feed from "./feed";
import HistoryStack from "./history";
// import Notifications from "./notifications";
import Settings from "./settings";

const MainStack = createBottomTabNavigator(
    {
        Feed: {
            screen: Feed
        },
        History: {
            screen: HistoryStack
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
