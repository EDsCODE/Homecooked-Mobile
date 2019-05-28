import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import StaticField from "Homecooked/src/components/TextFields/Static";
import Picker from "Homecooked/src/components/Picker/Basic";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

let priceOptions = [];

for (let i = 15; i <= 25; i++) {
    priceOptions.push({
        label: `$${i}`,
        value: i
    });
}

export default class Price extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    state = {
        price: 0,
        pickerVisible: false
    };

    componentDidMount() {
        let { price } = this.props.screenProps.state;
        console.log(price);
        this.setState({
            price
        });
    }

    _goNext = () => {
        let { price } = this.state;
        this.props.screenProps.updateData("price", price);
        this._goBack();
    };

    showPicker = () => {
        this.setState({
            pickerVisible: true
        });
    };

    hidePicker = chosenValue => {
        this.setState({
            pickerVisible: false,
            price: chosenValue
        });
    };

    render() {
        let { price, pickerVisible } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>How much does your event cost?</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Typical meals range between $15-25/person.
                </PromptText>
                <StaticField
                    label={"Price"}
                    value={`$${price}`}
                    containerStyle={{ marginTop: Spacing.larger }}
                    onPress={this.showPicker}
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
                <Picker
                    visible={pickerVisible}
                    done={this.hidePicker}
                    items={priceOptions}
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
