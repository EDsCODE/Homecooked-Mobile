import React, { Component } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    Keyboard
} from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import TextField from "Homecooked/src/components/TextFields/Material";

import { getPossibleMatches } from "Homecooked/src/services/location";
import { reverse } from "Homecooked/src/utils/Strings";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Address extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    state = {
        query: "",
        addressLine2: "",
        results: [],
        selected: null
    };

    _goNext = () => {
        let { selected, addressLine2 } = this.state;
        console.log(selected);
        this.props.screenProps.updateData("address", {
            ...selected,
            addressLine2
        });
        this._goBack();
    };

    onChangeText = async query => {
        this.setState({
            query
        });
        if (query.length > 3) {
            let results = await getPossibleMatches(query);
            this.setState({
                results
            });
        }
    };

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.onRowPressed(item)}>
                <Text
                    style={{
                        fontFamily: Typography.fontFamily,
                        marginVertical: Spacing.smallest
                    }}
                >
                    {reverse(item.label)}
                </Text>
            </TouchableOpacity>
        );
    };

    onRowPressed = item => {
        this.setState({
            query: reverse(item.label),
            results: [],
            selected: item.address
        });
        Keyboard.dismiss();
    };

    onChangeLine2 = text => {
        this.setState({
            addressLine2: text
        });
    };

    render() {
        let { query, results, addressLine2 } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>Where is your event happening?</HeadingText>
                <TextField
                    label={""}
                    tintColor="#4A4A4A"
                    placeholder="Address"
                    multiline={true}
                    value={query}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    onChangeText={this.onChangeText}
                />
                {results.length != 0 ? (
                    <FlatList
                        data={results}
                        renderItem={this.renderItem}
                        keyboardShouldPersistTaps={"handled"}
                    />
                ) : null}
                <TextField
                    label={"Address Line 2 (optional)"}
                    tintColor="#4A4A4A"
                    multiline={true}
                    value={addressLine2}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    onChangeText={this.onChangeLine2}
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
