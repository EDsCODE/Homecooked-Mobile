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

const TITLE = "What's cooking?";

export default class Event extends Component {
    componentDidMount() {
        console.log(this.props);
    }

    state = {
        modules: ["dateTime", "description", "refundPolicy"]
    };
    _navigateToCreateProfile = () => {
        this.props.navigation.navigate("BookingStack", {
            event: this.props.navigation.state.params.event
        });
    };

    _navigateToPerson = person => {
        this.props.navigation.navigate("EventPerson", person);
    };

    render() {
        let {
            title,
            date,
            distance,
            attributes,
            startTime,
            description,
            menu,
            marker,
            duration,
            bookings,
            key
        } = this.props.navigation.state.params.event;
        let { price, mealType, dietaryRestriction } = attributes;
        let { formattedAddress, secondaryAddress } = marker;
        let lat = marker.point.coordinates[0];
        let lng = marker.point.coordinates[1];

        return (
            <View style={{ flex: 1 }}>
                <Header title={"Nick's Table"} />
                <ScrollView
                    bounces={false}
                    contentInset={{ bottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <HeroSection
                        title={title}
                        chefName={"Nick"}
                        chefDescription={`Nick is a graduating senior at Yale passionate about food sustainability and agriculture. He recently returned from a gap year in Hong Kong and can’t wait share the incredible new recipes he picked up there!`}
                    />
                    <Separator />
                    <InfoSection
                        modules={this.state.modules}
                        startTime={startTime}
                        description={description}
                        price={price}
                        duration={duration}
                    />
                    <PeopleRow
                        people={bookings}
                        onPress={this._navigateToPerson}
                    />
                    <Separator />
                    <MenuSection
                        title={TITLE}
                        menu={menu}
                        mealType={mealType}
                        dietaryRestriction={dietaryRestriction}
                    />
                    <Separator />
                    <LocationSection
                        lat={lat}
                        lng={lng}
                        formattedAddress={formattedAddress}
                        secondaryAddress={secondaryAddress}
                    />
                    <Separator />
                    <RatingSection />
                </ScrollView>
                <UtilityBar
                    mainTextColor={Color.green}
                    buttonColor={Color.green}
                    mainText={`$${price} / person`}
                    subText={"2 seats left"}
                    buttonText={"RSVP"}
                    onPress={this._navigateToCreateProfile}
                />
            </View>
        );
    }
}
