import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import SecondaryText from "Homecooked/src/components/Text/Secondary";
import PeopleRow from "Homecooked/src/components/Image/Row";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import { eventCardDate } from "Homecooked/src/utils/Date";
import Separator from "Homecooked/src/components/Separator";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import _ from "lodash";

export default class AttendanceReview extends Component {
    state = {
        attendees: []
    };

    componentDidMount() {
        console.log(this.props);
        let confirmed = _.filter(this.props.screenProps.attendees, [
            "selected",
            true
        ]);
        this.setState({
            attendees: confirmed
        });
    }

    _navigateToReport = () => {
        this.props.navigation.navigate("ReportOverview");
    };

    _goNext = () => {
        this.props.screenProps.submit();
    };

    render() {
        let { title, startTime, attributes } = this.props.screenProps.event;
        let { price } = attributes;
        let tax = (price * 0.07).toFixed(2);

        let numGuests = this.state.attendees.length;
        let total = price * numGuests;

        let fee = Math.round(total * 0.05 * 100) / 100;
        let result = total - fee;

        return (
            <View style={styles.container}>
                <CloseButton />
                <HeadingText>{"Review: " + title}</HeadingText>
                <PromptText>
                    {"Happened on " + eventCardDate(startTime)}
                </PromptText>
                <PeopleRow
                    people={this.state.attendees}
                    style={{ marginHorizontal: -Spacing.large }}
                    title={"Confirmed Attendees"}
                />
                <PromptText>
                    <PromptText
                        style={{ color: Color.orange }}
                        onPress={this._navigateToReport}
                    >
                        Report a guest
                    </PromptText>
                    {" at this table"}
                </PromptText>
                <Separator
                    style={{
                        marginHorizontal: -Spacing.large,
                        marginVertical: Spacing.base,
                        width: Spacing.deviceWidth
                    }}
                />
                <HeadingText>{"Payment"}</HeadingText>
                <View style={styles.priceItemContainer}>
                    <SecondaryText style={styles.secondaryTextLeftExtraStyles}>
                        {`${numGuests} guests x $${price}/person`}
                    </SecondaryText>
                    <SecondaryText style={styles.secondaryTextRightExtraStyles}>
                        {`$${total}`}
                    </SecondaryText>
                </View>
                <View style={styles.priceItemContainer}>
                    <SecondaryText style={styles.secondaryTextLeftExtraStyles}>
                        {`5% transaction fee`}
                    </SecondaryText>
                    <SecondaryText style={styles.secondaryTextRightExtraStyles}>
                        {`-$${fee}`}
                    </SecondaryText>
                </View>
                <View style={styles.border} />
                <View style={styles.priceItemContainer}>
                    <SecondaryText style={styles.secondaryTextLeftExtraStyles}>
                        Total:
                    </SecondaryText>
                    <SecondaryText style={styles.secondaryTextRightExtraStyles}>
                        {`$${result}`}
                    </SecondaryText>
                </View>
                <BarButton
                    title="Done!"
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
    },
    border: {
        borderBottomColor: Color.black,
        borderBottomWidth: 1,
        marginVertical: Spacing.smaller
    },
    priceItemContainer: {
        width: "100%",
        flexDirection: "row",
        marginVertical: Spacing.smallest
    },
    secondaryTextLeftExtraStyles: {
        flex: 1,
        textAlign: "left"
    },
    secondaryTextRightExtraStyles: {
        flex: 1,
        textAlign: "right"
    }
});
