import { createSwitchNavigator } from "react-navigation";
import Auth from "./auth";
import Main from "./main";
import Host from "./host";
import Loading from "./Loading";

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
        },
        Loading: {
            screen: Loading
        }
    },
    {
        initialRouteName: "Loading"
    }
);

export default AppStack;
