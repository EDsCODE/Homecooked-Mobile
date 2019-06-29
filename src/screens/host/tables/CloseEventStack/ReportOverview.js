import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import PromptText from "Homecooked/src/components/Text/Prompt";
import HeadingText from "Homecooked/src/components/Text/Heading";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import _ from "lodash";
import {
    SelectableGrid,
    SelectableCell
} from "Homecooked/src/components/Image/Selectable";

export default class ReportOverview extends Component {
    _renderItem = (item, index) => {
        return (
            <SelectableCell
                onPress={() => this._onPress(item, index)}
                name={item.name}
                selected={item.comment}
                selectedIconType={"flag"}
                color={Color.orange}
                iconSize={16}
                source={item.profileImageSignedUrl}
            />
        );
    };

    _onPress = (item, index) => {
        this.props.screenProps.updateData("reportView", index);
        this.props.navigation.navigate("ReportUser");
    };

    _goNext = () => {
        this.props.navigation.navigate("AttendanceReview");
    };

    _goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>Report a User</HeadingText>
                <PromptText>
                    We want all of our users to have great experiences at the
                    table. Please feel free to report any guests that made the
                    meal less than wonderful for you.
                </PromptText>
                <PromptText style={{ marginTop: Spacing.small }}>
                    All reports will be kept confidential.
                </PromptText>
                <SelectableGrid
                    data={this.props.screenProps.reports}
                    renderItem={this._renderItem}
                />
                <BarButton
                    title="Done"
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
