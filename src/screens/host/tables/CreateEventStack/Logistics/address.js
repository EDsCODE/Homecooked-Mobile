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

import uuid4 from "uuid4";

import {
    getPossibleMatches,
    getLatLong,
    getPlaceDetails
} from "Homecooked/src/services/location";
import { reverse } from "Homecooked/src/utils/Strings";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Address extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    state = {
        query: "",
        secondaryAddress: "",
        results: [],
        selected: null
    };

    componentDidMount() {
        let sessionToken = uuid4();
        this.setState({
            sessionToken
        });
    }

    _goNext = async () => {
        let { selected, secondaryAddress, query } = this.state;
        console.log(selected);

        let address = {
            formattedAddress: query,
            secondaryAddress,
            geometry: selected.geometry.location
        };

        this.props.screenProps.updateData("address", address);
        this._goBack();
    };

    onChangeText = async query => {
        this.setState({
            query
        });
        if (query.length > 3) {
            let results = await getPossibleMatches(
                query,
                this.state.sessionToken
            );
            console.log(results);
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
                    {item.description}
                </Text>
            </TouchableOpacity>
        );
    };

    onRowPressed = async item => {
        let data = await getPlaceDetails(
            item.place_id,
            this.state.sessionToken
        );
        console.log(data);
        this.setState({
            query: data.result.formatted_address,
            results: [],
            selected: data.result
        });
        Keyboard.dismiss();
    };

    onChangeLine2 = text => {
        this.setState({
            secondaryAddress: text
        });
    };

    render() {
        let { query, results, secondaryAddress } = this.state;
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
                    value={secondaryAddress}
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
