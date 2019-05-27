import { createSwitchNavigator } from "react-navigation";
import Auth from "./auth";
import Main from "./main";
import Host from "./host";

const AppStack = createSwitchNavigator(
    {
        Auth: {
            screen: Auth
        },
        Main: {
            screen: Main
        },
        Host: {
            screen: Host
        }
    },
    {
        initialRouteName: "Host"
    }
);

export default AppStack;
