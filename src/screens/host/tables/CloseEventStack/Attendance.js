import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import PromptText from "Homecooked/src/components/Text/Prompt";
import HeadingText from "Homecooked/src/components/Text/Heading";
import BarButton from "Homecooked/src/components/Buttons/BarButton";

import {
    SelectableGrid,
    SelectableCell
} from "Homecooked/src/components/Image/Selectable";

export default class Attendance extends Component {
    _renderItem = ({ item }) => {
        return <SelectableCell />;
    };

    render() {
        return (
            <View style={styles.container}>
                <CloseButton />
                <HeadingText>Close Table</HeadingText>
                <PromptText style={{ marginTop: Spacing.base }}>
                    One final step before you receive payment! Please let us
                    know which guests came to your table by tapping on their
                    photo.
                </PromptText>
                <SelectableGrid
                    data={["hello", "goodbye", "use", "new"]}
                    renderItem={this._renderItem}
                />
                <BarButton
                    title="Continue"
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
    }
});
