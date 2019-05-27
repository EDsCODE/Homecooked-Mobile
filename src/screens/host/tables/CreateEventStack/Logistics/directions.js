import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import TextField from "Homecooked/src/components/TextFields/Material";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Directions extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    state = {
        specialDirections: ""
    };

    componentDidMount() {
        let { specialDirections } = this.props.screenProps.state;
        this.setState({
            specialDirections
        });
    }

    _goNext = () => {
        let { specialDirections } = this.state;
        this.props.screenProps.updateData(
            "specialDirections",
            specialDirections
        );
        this._goBack();
    };

    render() {
        let { specialDirections } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>Special Directions</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Special Directions are extremely useful in helping guests
                    find your home.  Ex: “My apartment is on the second floor
                    with a purple welcome mat. Please knock since my dogs hate
                    the doorbell.”
                </PromptText>
                <TextField
                    label={""}
                    tintColor="#4A4A4A"
                    placeholder="Your directions"
                    multiline={true}
                    value={specialDirections}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    onChangeText={specialDirections =>
                        this.setState({ specialDirections })
                    }
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
