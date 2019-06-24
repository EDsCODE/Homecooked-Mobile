import React from "react";
import { createStackNavigator } from "react-navigation";
import EditDescription from "./EditDescription";
import EditPicture from "./EditPicture";
import Person from "Homecooked/src/screens/main/common/Person";

const ProfileStack = createStackNavigator(
    {
        ProfilePreview: {
            screen: ({ navigation }) => (
                <Person navigation={navigation} parentRoute={"AccountMain"} />
            )
        },
        EditDescription: {
            screen: EditDescription
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
