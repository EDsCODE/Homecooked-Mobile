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
import { extendedDateWithMealType } from "Homecooked/src/utils/Date";

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

const MENU_TITLE = "What was served";

export default class Feed extends Component {
    _navigateToPerson = person => {
        this.props.navigation.navigate("PastEventPerson", person);
    };

    _goBack = () => {
        NavigationService.navigate("HistoryMain");
    };

    render() {
        let {
            title,
            date,
            distance,
            price,
            startTime,
            description,
            menu,
            marker,
            key
        } = this.props.navigation.state.params.event;
        let DATE_TEXT = extendedDateWithMealType(startTime);

        return (
            <View style={{ flex: 1 }}>
                <Header title={title} leftOnPress={this._goBack} />
                <ScrollView
                    bounces={false}
                    contentInset={{ bottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <PrimaryText style={{ marginHorizontal: Spacing.large }}>
                        {title}
                    </PrimaryText>
                    <MinorText style={{ marginHorizontal: Spacing.large }}>
                        {DATE_TEXT}
                    </MinorText>
                    <PeopleRow
                        people={people}
                        onPress={this._navigateToPerson}
                    />
                    <Separator />
                    <MenuSection title={MENU_TITLE} menu={menu} />
                </ScrollView>
            </View>
        );
    }
}
