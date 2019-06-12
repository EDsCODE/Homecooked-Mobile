import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import CheckBoxes from "Homecooked/src/components/CheckBoxes";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { normalize } from "Homecooked/src/utils/normalize";

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
        mealType: {
            vegan: false,
            glutenFree: false,
            vegetarian: false,
            noPref: false
        }
    };

    componentDidMount() {
        console.log(this.props.screenProps);
        let restrictions = this.props.screenProps.fields.dietaryRestriction
            .allowedValues;
        let mealType = this.props.screenProps.fields.mealType.allowedValues;
        Object.keys(restrictions).forEach(key => {
            restrictions[key].selected = false;
        });
        Object.keys(mealType).forEach(key => {
            mealType[key].selected = false;
        });
        this.setState({
            restrictions,
            mealType
        });
    }

    _goNext = () => {
        let { restrictions, mealType } = this.state;
        this.props.screenProps.updateData("restrictions", restrictions);
        this.props.screenProps.updateData("mealType", mealType);
        this._goBack();
    };

    _onRestrictionBoxSelected = key => {
        if (key == "No Restriction") {
            let reset = this.state.restrictions;
            Object.keys(this.state.restrictions).forEach(
                item => (reset[item].selected = false)
            );
            this.setState({
                restrictions: {
                    ...reset,
                    ["No Restriction"]: {
                        ...this.state.restrictions["No Restriction"],
                        selected: true
                    }
                }
            });
        } else {
            let newRestrictions = Object.assign({}, this.state.restrictions, {
                [key]: {
                    ...this.state.restrictions[key],
                    selected: !this.state.restrictions[key].selected
                },
                ["No Restriction"]: {
                    ...this.state.restrictions["No Restriction"],
                    selected: false
                }
            });
            this.setState({ restrictions: newRestrictions });
        }
    };

    _onPreferenceBoxSelected = key => {
        if (key == "No Preference") {
            let reset = this.state.mealType;
            Object.keys(this.state.mealType).forEach(
                item => (reset[item].selected = false)
            );
            this.setState({
                mealType: {
                    ...reset,
                    ["No Preference"]: {
                        ...this.state.mealType["No Preference"],
                        selected: true
                    }
                }
            });
        } else {
            let newMealType = Object.assign({}, this.state.mealType, {
                [key]: {
                    ...this.state.mealType[key],
                    selected: !this.state.mealType[key].selected
                },
                ["No Preference"]: {
                    ...this.state.mealType["No Preference"],
                    selected: false
                }
            });
            this.setState({ mealType: newMealType });
        }
    };

    render() {
        let { restrictions, mealType } = this.state;
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
                    dict={mealType}
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
