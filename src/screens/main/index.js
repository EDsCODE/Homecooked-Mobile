import { createBottomTabNavigator } from "react-navigation";
import Feed from "./feed";
import HistoryStack from "./history";
// import Notifications from "./notifications";
import Account from "./account";

const MainStack = createBottomTabNavigator(
    {
        Feed: {
            screen: Feed
        },
        History: {
            screen: HistoryStack
        },
        Account: {
            screen: Account
        }
    },
    {
        initialRouteName: "Feed"
    }
);

export default MainStack;
