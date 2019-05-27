import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import CheckBoxes from "Homecooked/src/components/CheckBoxes";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

export default class DietaryRestriction extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    state = {
        restrictions: {
            eggs: false,
            nuts: false,
            milk: false,
            fish: false,
            shellfish: false,
            wheat: false,
            soy: false,
            noRestric: false
        },
        preferences: {
            vegan: false,
            glutenFree: false,
            vegetarian: false,
            noPref: false
        }
    };

    _goNext = () => {
        let { restrictions, preferences } = this.state;
        this.props.screenProps.updateData("restrictions", restrictions);
        this.props.screenProps.updateData("preferences", preferences);
        this._goBack();
    };

    _onRestrictionBoxSelected = key => {
        if (key == "noRestric") {
            this.setState({
                restrictions: {
                    eggs: false,
                    nuts: false,
                    milk: false,
                    fish: false,
                    shellfish: false,
                    wheat: false,
                    soy: false,
                    noRestric: true
                }
            });
        } else {
            let newRestrictions = Object.assign({}, this.state.restrictions, {
                [key]: !this.state.restrictions[key],
                noRestric: false
            });
            this.setState({ restrictions: newRestrictions });
        }
    };

    _onPreferenceBoxSelected = key => {
        if (key == "noPref") {
            this.setState({
                preferences: {
                    vegan: false,
                    glutenFree: false,
                    vegetarian: false,
                    noPref: true
                }
            });
        } else {
            let newPreferences = Object.assign({}, this.state.preferences, {
                [key]: !this.state.preferences[key],
                noPref: false
            });
            this.setState({ preferences: newPreferences });
        }
    };

    render() {
        let { restrictions, preferences } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>Dietary Restrictions</HeadingText>
                <PromptText style={{ marginVertical: Spacing.base }}>
                    Please select the following if your meal contains:
                </PromptText>
                <CheckBoxes
                    dict={restrictions}
                    containerStyle={{ height: "30%" }}
                    onBoxSelected={this._onRestrictionBoxSelected}
                />
                <PromptText style={{ marginVertical: Spacing.base }}>
                    Select the following if your meal is:
                </PromptText>
                <CheckBoxes
                    dict={preferences}
                    containerStyle={{ height: "15%" }}
                    onBoxSelected={this._onPreferenceBoxSelected}
                />
                <BarButton
                    title="Confirm"
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
    },
    input: {
        marginHorizontal: Spacing.large
    }
});
