import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import MinorText from "Homecooked/src/components/Text/Minor";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import FloatyButton from "Homecooked/src/components/Buttons/FloatyButton";
import FieldButton from "Homecooked/src/components/TextFields/Button";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

export default class DetailsMain extends Component {
    _goBack = () => {
        NavigationService.navigate("HostTablesMain");
    };

    _navigateToTitleField = () => {
        this.props.navigation.navigate("DetailsTitle");
    };

    _navigateToDescriptionField = () => {
        this.props.navigation.navigate("DetailsDescription");
    };

    _goNext = () => {
        this.props.navigation.navigate("CreateEventFood");
    };

    render() {
        let { eventTitle, eventDescription } = this.props.screenProps.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <MinorText>Step 1 of 3</MinorText>
                <HeadingText>The Details</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Unique Event Titles and Descriptions significantly help
                    cooks book out meals.
                </PromptText>
                <FieldButton
                    containerStyle={{ marginVertical: Spacing.smaller }}
                    title={"Event Title"}
                    value={eventTitle}
                    onPress={this._navigateToTitleField}
                />
                <FieldButton
                    containerStyle={{ marginVertical: Spacing.smaller }}
                    title={"Event Description"}
                    value={eventDescription}
                    onPress={this._navigateToDescriptionField}
                />
                <FloatyButton
                    onPress={this._goNext}
                    style={{
                        position: "absolute",
                        bottom: Spacing.largest,
                        right: Spacing.largest
                    }}
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
