import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import EditBio from "./EditBio";
import EditPicture from "./EditPicture";
import Person from "Homecooked/src/screens/main/common/Person";

const ProfileStack = createStackNavigator(
    {
        ProfilePreview: {
            screen: ({ navigation }) => {
                return <Person navigation={navigation} />;
            }
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

class Profile extends Component {
    static router = ProfileStack.router;

    render() {
        const { navigation } = this.props;

        return (
            <ProfileStack
                navigation={navigation}
                screenProps={{
                    parentRoute: this.props.navigation.state.params.parentRoute
                }}
            />
        );
    }
}

export default Profile;
