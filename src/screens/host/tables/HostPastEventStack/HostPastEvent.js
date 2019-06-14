import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import HeroSection from "Homecooked/src/components/Event/Hero";
import MenuSection from "Homecooked/src/components/Event/Menu";
import InfoSection from "Homecooked/src/components/Event/Info";
import PeopleRow from "Homecooked/src/components/Image/Row";
import RatingSection from "Homecooked/src/components/Event/Ratings";
import Header from "Homecooked/src/components/Headers/Basic";
import UtilityBar from "Homecooked/src/components/Buttons/UtilityBar";
import LocationSection from "Homecooked/src/components/Event/Location";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import Separator from "Homecooked/src/components/Separator";
import PrimaryText from "Homecooked/src/components/Text/Primary";
import MinorText from "Homecooked/src/components/Text/Minor";
import NavigationService from "Homecooked/src/utils/NavigationService";

const people = [
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    },
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    },
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    },
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    },
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    }
];

export default class HostPastEvent extends Component {
    _navigateToPerson = person => {
        this.props.navigation.navigate("HostPastEventPerson", person);
    };

    _goBack = () => {
        NavigationService.navigate("HostTablesMain");
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title={"Nick's Table"} leftOnPress={this._goBack} />
                <ScrollView
                    bounces={false}
                    contentInset={{ bottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <PrimaryText style={{ marginHorizontal: Spacing.large }}>
                        A Texan Treat
                    </PrimaryText>
                    <MinorText style={{ marginHorizontal: Spacing.large }}>
                        Dinner on Thursday, March 28th
                    </MinorText>
                    <PeopleRow
                        people={people}
                        onPress={this._navigateToPerson}
                    />
                    <Separator />
                    <MenuSection />
                </ScrollView>
            </View>
        );
    }
}
