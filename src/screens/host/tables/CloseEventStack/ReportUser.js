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
import TextField from "Homecooked/src/components/TextFields/Material";

export default class ReportUser extends Component {
    state = {
        reports: [],
        index: null,
        input: ""
    };

    componentDidMount() {
        let index = this.props.screenProps.reportView;
        let reports = this.props.screenProps.reports;

        this.setState({
            reports: [
                {
                    ...reports[index],
                    selected: true
                }
            ],
            index
        });
    }

    _renderItem = (item, index) => {
        return (
            <SelectableCell
                name={item.name}
                selected={item.selected}
                selectedIconType={"flag"}
                color={Color.orange}
                iconSize={16}
                source={item.profileImageSignedUrl}
            />
        );
    };

    _goNext = () => {
        let reports = this.props.screenProps.reports;
        let index = this.state.index;
        let newReports = [
            ...reports.slice(0, index),
            {
                ...reports[index],
                comment: this.state.input
            },
            ...reports.slice(index + 1)
        ];
        console.log(newReports);
        this.props.screenProps.updateData("reports", newReports);
        this.props.navigation.goBack();
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
                    data={this.state.reports}
                    renderItem={this._renderItem}
                />
                <TextField
                    tintColor={Color.gray}
                    label="Report"
                    value={this.state.input}
                    multiline={true}
                    maxLength={150}
                    onChangeText={input => this.setState({ input })}
                    blurOnSubmit={true}
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
