import { createBottomTabNavigator } from "react-navigation";
import Tables from "./tables";
// import Ratings from "./ratings";
// import Notifications from "./notifications";
import Settings from "./settings";

const HostStack = createBottomTabNavigator(
    {
        HostTables: {
            screen: Tables
        },
        HostSettings: {
            screen: Settings
        }
    },
    {
        initialRouteName: "HostTables"
    }
);

export default HostStack;
