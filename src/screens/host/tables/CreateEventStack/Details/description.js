import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import TextField from "Homecooked/src/components/TextFields/Material";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

export default class DetailsDescription extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    state = {
        eventDescription: ""
    };

    componentDidMount() {
        let { eventDescription } = this.props.screenProps.state;
        this.setState({
            eventDescription
        });
    }

    _goNext = () => {
        let { eventDescription } = this.state;
        this.props.screenProps.updateData("eventDescription", eventDescription);
        this._goBack();
    };

    render() {
        let { eventDescription } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>Event Description</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Ex. “Join me for my first Homecooked meal! Can’t wait to
                    share my family’s secret gumbo recipe with you all.”
                </PromptText>
                <TextField
                    label={""}
                    tintColor="#4A4A4A"
                    placeholder="Ex. “Homemade Syrian Feast with Love”"
                    value={eventDescription}
                    onChangeText={eventDescription =>
                        this.setState({ eventDescription })
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
                    active={eventDescription}
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
