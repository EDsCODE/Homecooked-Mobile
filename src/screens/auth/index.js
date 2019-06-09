import React from "react";
import { createStackNavigator } from "react-navigation";
import Landing from "./landing";
import Login from "./login";
import SignUpStack from "./signup";
import OnboardingStack from "./onboarding";
import ProfileCreationStack from "Homecooked/src/screens/main/common/ProfileCreationStack";

const AuthStack = createStackNavigator(
    {
        Landing: {
            screen: Landing
        },
        Login: {
            screen: Login
        },
        SignUp: {
            screen: SignUpStack
        },
        Onboarding: {
            screen: OnboardingStack
        },
        OnboardingProfileCreationStack: {
            screen: ProfileCreationStack
        }
    },
    {
        initialRouteName: "Landing",
        headerMode: "none"
    }
);

export default AuthStack;
