import { createBottomTabNavigator } from "react-navigation";
import React, { Component } from "react";
import { Image } from "react-native";
import Feed from "./feed";
import HistoryStack from "./history";
import Notifications from "./notifications";
import Account from "./account";
import { Color, Spacing } from "Homecooked/src/components/styles";
import branch from "react-native-branch";

const MainStack = createBottomTabNavigator(
    {
        Feed: {
            screen: Feed
        },
        History: {
            screen: HistoryStack,
            navigationOptions: {
                tabBarLabel: "My Tables"
            }
        },
        Notification: {
            screen: Notifications
        },
        Account: {
            screen: Account
        }
    },
    {
        initialRouteName: "Feed",
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                var imgSource;
                if (routeName === "Feed") {
                    // Sometimes we want to add badges to some icons.
                    // You can check the implementation below.
                    imgSource = require("Homecooked/src/assets/img/GOpenTables.png");
                } else if (routeName === "History") {
                    imgSource = require("Homecooked/src/assets/img/GMyTables.png");
                } else if (routeName === "Notification") {
                    imgSource = require("Homecooked/src/assets/img/GHNotifs.png");
                } else if (routeName === "Account") {
                    imgSource = require("Homecooked/src/assets/img/GHProfile.png");
                }

                // You can return any component that you like here!
                return (
                    <Image
                        source={imgSource}
                        style={{
                            width: 22,
                            height: 22,
                            tintColor,
                            padding: Spacing.smaller
                        }}
                        resizeMode="contain"
                    />
                );
            }
        }),
        tabBarOptions: {
            showIcon: true,
            activeTintColor: "#FF674F",
            style: {
                height: 50
            }
        }
    },
    {}
);

class Main extends Component {
    static router = MainStack.router;

    render() {
        const { navigation } = this.props;

        branch.subscribe(({ error, params }) => {
            if (error) {
                console.error("Error from Branch: " + error);
                return;
            }

            // params will never be null if error is null

            if (params["+non_branch_link"]) {
                const nonBranchUrl = params["+non_branch_link"];
                // Route non-Branch URL if appropriate.
                return;
            }

            if (!params["+clicked_branch_link"]) {
                // Indicates initialization success and some other conditions.
                // No link was opened.
                return;
            }

            // A Branch link was opened.
            // Route link based on data in params, e.g.

            // Get title and url for route
            const title = params.$og_title;
            const url = params.$canonical_url;
            const image = params.$og_image_url;

            // Now push the view for this URL
            //this.navigator.push({ title: title, url: url, image: image });

            console.log(title);
            console.log(url);
            console.log(image);
        });

        return <MainStack navigation={navigation} />;
    }
}

export default Main;
