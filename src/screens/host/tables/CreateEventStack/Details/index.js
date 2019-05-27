import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";
import Title from "./title";
import Description from "./description";

const CreateEventDetailsStack = createStackNavigator(
    {
        DetailsMain: {
            screen: Main
        },
        DetailsTitle: {
            screen: Title
        },
        DetailsDescription: {
            screen: Description
        }
    },
    {
        initialRouteName: "DetailsMain",
        headerMode: "none",
        mode: "modal"
    }
);

class CreateEventDetails extends Component {
    static router = CreateEventDetailsStack.router;

    state = {
        eventTitle: "",
        eventDescription: ""
    };

    updateData = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const { navigation } = this.props;

        return (
            <CreateEventDetailsStack
                navigation={navigation}
                screenProps={{ updateData: this.updateData, state: this.state }}
            />
        );
    }
}

export default CreateEventDetails;
