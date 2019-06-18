import React, { Component } from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import MinorText from "Homecooked/src/components/Text/Secondary";
import Separator from "Homecooked/src/components/Separator";
import CloseButton from "Homecooked/src/components/Buttons/Close";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

const SAMPLE_IMAGE = "Homecooked/src/assets/img/filledTable.jpg";

export default class Person extends Component {
    _goBack = () => {
        let { parentRoute } = this.props;
        NavigationService.navigate(parentRoute);
    };

    render() {
        let {
            bio,
            profileImageSignedUrl,
            firstName
        } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: profileImageSignedUrl }}
                    style={styles.image}
                />
                <View style={styles.infoContainer}>
                    <HeadingText>{firstName}</HeadingText>
                    <Separator style={styles.separatorSpacing} />
                    <MinorText style={styles.separatorSpacing}>{bio}</MinorText>
                </View>
                <View style={styles.headerContainer}>
                    <CloseButton onPress={this._goBack} color={Color.white} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    infoContainer: {
        margin: Spacing.large
    },
    separatorSpacing: {
        marginVertical: Spacing.small
    },
    image: {
        width: Spacing.deviceWidth,
        height: Spacing.deviceWidth
    },
    headerContainer: {
        position: "absolute",
        paddingTop: 30,
        paddingHorizontal: Spacing.large
    }
});
