import React, { Component } from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";
import Attendance from "./Attendance";
import AttendanceReview from "./AttendanceReview";
import ReportOverview from "./ReportOverview";
import ReportUser from "./ReportUser";

import { connect } from "react-redux";
import { getEvent } from "Homecooked/src/modules/event/selectors";

const CloseEventStack = createStackNavigator(
    {
        Attendance: {
            screen: Attendance
        },
        AttendanceReview: {
            screen: AttendanceReview
        },
        ReportOverview: {
            screen: ReportOverview
        },
        ReportUser: {
            screen: ReportUser
        }
    },
    {
        initialRouteName: "Attendance",
        headerMode: "none"
    }
);

class CloseEvent extends Component {
    static router = CloseEventStack.router;

    render() {
        const { navigation } = this.props;
        return (
            <CloseEventStack
                navigation={navigation}
                screenProps={{
                    event: this.props
                }}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...getEvent(state)
    };
};

export default connect(
    mapStateToProps,
    null
)(CloseEvent);
