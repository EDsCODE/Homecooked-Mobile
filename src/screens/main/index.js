import { createBottomTabNavigator } from "react-navigation";
import Feed from "./feed";
import HistoryStack from "./history";
import Notifications from "./notifications";
import Account from "./account";

const MainStack = createBottomTabNavigator(
    {
        Feed: {
            screen: Feed
        },
        History: {
            screen: HistoryStack
        },
        Notification: {
            screen: Notifications
        },
        Account: {
            screen: Account
        }
    },
    {
        initialRouteName: "History"
    }
);

export default MainStack;
