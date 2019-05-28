import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import MinorText from "Homecooked/src/components/Text/Minor";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import FieldButton from "Homecooked/src/components/TextFields/Button";
import moment from "moment";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

export default class DetailsMain extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    _navigateToAddressField = () => {
        this.props.navigation.navigate("LogisticsAddress");
    };

    _navigateToDateField = () => {
        this.props.navigation.navigate("LogisticsDate");
    };

    _navigateToGuestField = () => {
        this.props.navigation.navigate("LogisticsGuests");
    };

    _navigateToDirectionsField = () => {
        this.props.navigation.navigate("LogisticsDirections");
    };

    _navigateToPriceField = () => {
        this.props.navigation.navigate("LogisticsPrice");
    };

    _navigateToTimeField = () => {
        this.props.navigation.navigate("LogisticsTime");
    };

    render() {
        let {
            address,
            specialDirections,
            date,
            startTime,
            duration,
            price,
            minGuests,
            maxGuests
        } = this.props.screenProps.state;
        console.log(date);

        // format time
        let endTime;
        let parsedTime;
        if (startTime) {
            endTime = moment(startTime).add(duration, "hours");
            parsedTime =
                moment(startTime).format("hh:mm a") +
                " to " +
                moment(endTime).format("hh:mm a");
        }

        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} icon={"arrow-round-back"} />
                <ScrollView
                    contentInset={{ bottom: 90 }}
                    showsVerticalScrollIndicator={false}
                >
                    <MinorText>Step 3 of 3</MinorText>
                    <HeadingText>The Logistics</HeadingText>
                    <PromptText style={{ marginTop: Spacing.large }}>
                        Essential information for guests to know before joining
                        your table.
                    </PromptText>
                    <FieldButton
                        containerStyle={{ marginVertical: Spacing.smaller }}
                        title={"Address"}
                        value={address}
                        onPress={this._navigateToAddressField}
                    />
                    <FieldButton
                        containerStyle={{ marginVertical: Spacing.smaller }}
                        title={"Special Directions"}
                        value={specialDirections}
                        onPress={this._navigateToDirectionsField}
                    />
                    <FieldButton
                        containerStyle={{ marginVertical: Spacing.smaller }}
                        title={"Date"}
                        value={date ? date.format("dddd, MMMM Do") : ""}
                        onPress={this._navigateToDateField}
                    />
                    <FieldButton
                        containerStyle={{ marginVertical: Spacing.smaller }}
                        title={"Time"}
                        value={startTime ? parsedTime : ""}
                        onPress={this._navigateToTimeField}
                    />
                    <FieldButton
                        containerStyle={{ marginVertical: Spacing.smaller }}
                        title={"Number of Guests"}
                        value={
                            minGuests && maxGuests
                                ? `${minGuests} to ${maxGuests} people`
                                : ""
                        }
                        onPress={this._navigateToGuestField}
                    />
                    <FieldButton
                        containerStyle={{ marginVertical: Spacing.smaller }}
                        title={"Price"}
                        value={price ? `$${price}` : ""}
                        onPress={this._navigateToPriceField}
                    />
                </ScrollView>

                <BarButton
                    title="Preview"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.orange}
                    fill={Color.orange}
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
