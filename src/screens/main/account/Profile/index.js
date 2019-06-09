import React from "react";
import { createStackNavigator } from "react-navigation";
import Profile from "./Profile";
import EditBio from "./EditBio";
import EditPicture from "./EditPicture";

const ProfileStack = createStackNavigator(
    {
        ProfilePreview: {
            screen: Profile
        },
        EditBio: {
            screen: EditBio
        },
        EditPicture: {
            screen: EditPicture
        }
    },
    {
        initialRouteName: "EditPicture",
        headerMode: "none"
    }
);

export default ProfileStack;
