import { createSwitchNavigator } from "react-navigation";
import Auth from "./auth";
import Main from "./main";

const AppStack = createSwitchNavigator({
    Auth: {
        screen: Auth
    },
    Main: {
        screen: Main
    }
});

export default AppStack;
