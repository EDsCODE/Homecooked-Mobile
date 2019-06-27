import React, { Component } from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Keyboard
} from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import MinorText from "Homecooked/src/components/Text/Minor";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import FloatyButton from "Homecooked/src/components/Buttons/FloatyButton";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

import {
    getPossibleMatches,
    getPlaceDetails
} from "Homecooked/src/services/location";

import TextField from "Homecooked/src/components/TextFields/Material";

export default class BasicInfo extends Component {
    state = {
        query: "",
        results: [],
        selected: null,
        phoneNumber: ""
    };

    _goBack = () => {
        NavigationService.navigate("AccountMain");
    };

    _goNext = () => {
        let { phoneNumber, selected } = this.state;

        this.props.screenProps.updateData("address", selected);
        this.props.screenProps.updateData("phoneNumber", phoneNumber);
        this.props.navigation.navigate("ShortResponse");
    };

    onChangeText = async query => {
        this.setState({
            query
        });
        if (query.length > 1) {
            let results = await getPossibleMatches(
                query,
                this.state.sessionToken
            );
            results;
            this.setState({
                results
            });
        }
    };

    onRowPressed = async item => {
        let data = await getPlaceDetails(
            item.place_id,
            this.state.sessionToken
        );
        data;
        this.setState({
            query: data.formattedAddress,
            results: [],
            selected: data
        });
        Keyboard.dismiss();
    };

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.description}
                onPress={() => this.onRowPressed(item)}
            >
                <Text
                    style={{
                        fontFamily: Typography.fontFamily,
                        marginVertical: Spacing.smallest
                    }}
                >
                    {item.description}
                </Text>
            </TouchableOpacity>
        );
    };

    _keyExtractor = (item, index) => item.description;

    render() {
        let { phoneNumber, query, results, selected } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <MinorText>Step 1 of 3</MinorText>
                <HeadingText>Basic Information</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    We phone screen our hosts to determine if you’re a right fit
                    for Homecooked.
                </PromptText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Your location helps us gauge how many chefs are in your
                    area.
                </PromptText>
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
                        keyExtractor={this._keyExtractor}
                        data={results}
                        renderItem={this.renderItem}
                        keyboardShouldPersistTaps={"handled"}
                    />
                ) : null}
                <TextField
                    returnKeyType={"done"}
                    tintColor={Color.gray}
                    label="Phone Number"
                    value={phoneNumber}
                    keyboardType={"phone-pad"}
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                />
                <FloatyButton
                    onPress={this._goNext}
                    style={{
                        position: "absolute",
                        bottom: Spacing.largest,
                        right: Spacing.largest
                    }}
                    active={selected && phoneNumber}
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
