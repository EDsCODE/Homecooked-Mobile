import { createBottomTabNavigator } from "react-navigation";
import Tables from "./tables";
// import Ratings from "./ratings";
// import Notifications from "./notifications";
import Account from "./account";

const HostStack = createBottomTabNavigator(
    {
        HostTables: {
            screen: Tables
        },
        HostAccount: {
            screen: Account
        }
    },
    {
        initialRouteName: "HostTables"
    }
);

export default HostStack;
