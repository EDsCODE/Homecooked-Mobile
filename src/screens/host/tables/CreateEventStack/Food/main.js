import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import MinorText from "Homecooked/src/components/Text/Minor";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import FloatyButton from "Homecooked/src/components/Buttons/FloatyButton";
import FieldButton from "Homecooked/src/components/TextFields/Button";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";
import { objectUtils } from "Homecooked/src/utils";

export default class DetailsMain extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    _navigateToMenuField = () => {
        this.props.navigation.navigate("FoodMenu");
    };

    _navigateToDietaryField = () => {
        this.props.navigation.navigate("FoodDietary");
    };

    _goNext = () => {
        this.props.screenProps.submit();
        this.props.navigation.navigate("CreateEventLogistics");
    };

    render() {
        let { menu, restrictions, preferences } = this.props.screenProps.state;
        let filteredRestrictions = Object.keys(restrictions).filter(
            key => restrictions[key]
        );
        let parsedRestrictions = filteredRestrictions.join(", ");

        let filteredPreferences = Object.keys(preferences).filter(
            key => preferences[key]
        );
        let parsedPreferences = filteredPreferences.join(", ");

        let dietaryInfo =
            (parsedRestrictions
                ? "Contains: " +
                  parsedRestrictions +
                  (parsedPreferences ? "\n" : "")
                : "") + (parsedPreferences ? parsedPreferences : "");
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} icon={"arrow-round-back"} />
                <ScrollView>
                    <MinorText>Step 2 of 3</MinorText>
                    <HeadingText>The Food</HeadingText>
                    <PromptText style={{ marginTop: Spacing.large }}>
                        It’s not quite a Homecooked experience without
                        homecooked food.
                    </PromptText>
                    <FieldButton
                        type={"menu"}
                        containerStyle={{ marginVertical: Spacing.smaller }}
                        title={"Menu"}
                        value={menu}
                        onPress={this._navigateToMenuField}
                    />
                    <FieldButton
                        containerStyle={{ marginVertical: Spacing.smaller }}
                        title={"Dietary Restrictions"}
                        value={dietaryInfo}
                        onPress={this._navigateToDietaryField}
                    />
                </ScrollView>

                <FloatyButton
                    onPress={this._goNext}
                    style={{
                        position: "absolute",
                        bottom: Spacing.largest,
                        right: Spacing.largest
                    }}
                    active={
                        menu.length > 0 &&
                        !objectUtils.isEmpty(restrictions) &&
                        !objectUtils.isEmpty(preferences)
                    }
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
