import React, { Component } from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";
import Attendance from "./Attendance";
import AttendanceReview from "./AttendanceReview";
import ReportOverview from "./ReportOverview";
import ReportUser from "./ReportUser";
import { eventTypes } from "Homecooked/src/modules/types";

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

    state = {
        attendees: [],
        reports: [],
        reportView: null
    };

    updateData = (key, value, cb) => {
        this.setState(
            {
                [key]: value
            },
            () => {
                typeof cb === "function" && cb();
            }
        );
    };

    submit = () => {
        let eventId = this.props.event.id;
        let { attendees, reports } = this.state;
        this.props.submitAttendance(eventId, attendees, reports);
    };

    render() {
        const { navigation } = this.props;
        return (
            <CloseEventStack
                navigation={navigation}
                screenProps={{
                    ...this.props,
                    updateData: this.updateData,
                    attendees: this.state.attendees,
                    reports: this.state.reports,
                    reportView: this.state.reportView,
                    submit: this.submit
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

const mapDispatchToProps = dispatch => {
    let submitAttendance = (eventId, attendees, reports) => {
        dispatch({
            type: eventTypes.MARK_ATTENDANCE_REQUEST,
            payload: {
                eventId,
                attendees,
                reports
            }
        });
    };
    return {
        submitAttendance
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CloseEvent);
