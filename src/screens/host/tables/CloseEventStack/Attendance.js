import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import PromptText from "Homecooked/src/components/Text/Prompt";
import HeadingText from "Homecooked/src/components/Text/Heading";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import _ from "lodash";
import NavigationService from "Homecooked/src/utils/NavigationService";

import {
    SelectableGrid,
    SelectableCell
} from "Homecooked/src/components/Image/Selectable";

export default class Attendance extends Component {
    state = {
        attendees: [],
        loaded: false
    };

    componentDidMount() {
        let attendees = [];
        console.log("SCREENPROPS", this.props.screenProps);
        if (
            this.props.screenProps.event.users &&
            this.props.screenProps.event.bookings
        ) {
            let users = this.props.screenProps.event.users;
            this.props.screenProps.event.bookings.forEach(booking => {
                if (booking.status == "CNF") {
                    let user = _.find(users, ["id", booking.userId]);
                    attendees.push({
                        bookingId: booking.id,
                        userId: user.id,
                        name: user.firstName,
                        selected: false,
                        profileImageSignedUrl: user.profileImageSignedUrl
                    });
                }
            });
            this.setState({
                attendees: attendees
            });
        }
    }

    _goBack = () => {
        NavigationService.navigate("HostTablesMainEvent");
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (
            !this.state.loaded &&
            nextProps.screenProps.event.users &&
            nextProps.screenProps.event.bookings
        ) {
            let attendees = [];
            let users = nextProps.screenProps.event.users;
            nextProps.screenProps.event.bookings.forEach(booking => {
                if (booking.status == "CNF") {
                    let user = _.find(users, ["id", booking.userId]);
                    attendees.push({
                        bookingId: booking.id,
                        userId: user.id,
                        name: user.firstName,
                        selected: false,
                        profileImageSignedUrl: user.profileImageSignedUrl
                    });
                }
            });
            this.setState({
                attendees: attendees,
                loaded: true
            });
        }
    }

    _renderItem = (item, index) => {
        return (
            <SelectableCell
                key={item.userId}
                onPress={() => this._onPress(item, index)}
                name={item.name}
                selected={item.selected}
                selectedIconType={"checkmark"}
                color={Color.green}
                iconSize={26}
                source={item.profileImageSignedUrl}
            />
        );
    };

    _onPress = (item, index) => {
        this.setState({
            attendees: [
                ...this.state.attendees.slice(0, index),
                Object.assign({}, this.state.attendees[index], {
                    ...item,
                    selected: !item.selected
                }),
                ...this.state.attendees.slice(index + 1)
            ]
        });
    };

    _goNext = () => {
        this.props.screenProps.updateData("attendees", this.state.attendees);
        let reports = [];
        this.state.attendees.forEach(attendee => {
            if (attendee.selected) {
                reports.push({
                    ...attendee,
                    selected: false,
                    report: ""
                });
            }
        });
        this.props.screenProps.updateData("reports", reports);
        this.props.navigation.navigate("AttendanceReview");
    };

    render() {
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>Close Table</HeadingText>
                <PromptText style={{ marginTop: Spacing.base }}>
                    One final step before you receive payment! Please let us
                    know which guests came to your table by tapping on their
                    photo.
                </PromptText>
                <SelectableGrid
                    data={this.state.attendees}
                    renderItem={this._renderItem}
                />
                <BarButton
                    title="Continue"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.green}
                    fill={Color.green}
                    onPress={this._goNext}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: Spacing.large
    }
});
