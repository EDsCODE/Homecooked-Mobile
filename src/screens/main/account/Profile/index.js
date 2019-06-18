import React from "react";
import { createStackNavigator } from "react-navigation";
import Profile from "./Profile";
import EditBio from "./EditBio";
import EditPicture from "./EditPicture";
import Person from "Homecooked/src/screens/main/common/Person";

const ProfileStack = createStackNavigator(
    {
        ProfilePreview: {
            screen: ({ navigation }) => (
                <Person navigation={navigation} parentRoute={"AccountMain"} />
            )
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
