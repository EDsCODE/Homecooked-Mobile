import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import TextField from "Homecooked/src/components/TextFields/Material";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

export default class DetailsTitle extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    state = {
        eventTitle: ""
    };

    componentDidMount() {
        let { eventTitle } = this.props.screenProps.state;
        this.setState({
            eventTitle
        });
    }

    _goNext = () => {
        let { eventTitle } = this.state;
        this.props.screenProps.updateData("eventTitle", eventTitle);
        this._goBack();
    };

    render() {
        let { eventTitle } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>Event Title</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Help your event stand out with an original title.
                </PromptText>
                <TextField
                    label={""}
                    tintColor="#4A4A4A"
                    placeholder="Ex. “Homemade Syrian Feast with Love”"
                    value={eventTitle}
                    onChangeText={eventTitle => this.setState({ eventTitle })}
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
