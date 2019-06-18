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
import PrimaryText from "Homecooked/src/components/Text/Primary";
import MinorText from "Homecooked/src/components/Text/Minor";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import Separator from "Homecooked/src/components/Separator";
import { feedTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

import { EventViewTypes } from "Homecooked/src/types/";

import { getEvent } from "Homecooked/src/modules/event/selectors";
import NavigationService from "Homecooked/src/utils/NavigationService";
import { extendedDateWithMealType } from "Homecooked/src/utils/Date";

class Event extends Component {
    componentDidMount() {
        console.log(this.props);
        this.HERO = this._renderHeroSection();
    }

    _goBack = () => {
        let { parentRoute } = this.props;
        NavigationService.navigate(parentRoute);
    };

    _navigateToBooking = () => {
        this.props.navigation.navigate("BookingStack", {
            event: this.props.event
        });
    };

    _navigateToPerson = person => {
        this.props.navigation.navigate("EventPerson", person);
    };

    _renderHeroSection = () => {
        let { startTime, title, media, chef } = this.props.event;
        let DATE_TEXT = extendedDateWithMealType(startTime);
        let { loading } = this.props;
        switch (this.props.mode) {
            case EventViewTypes.HISTORY_PAST:
                return (
                    <View>
                        <PrimaryText
                            style={{ marginHorizontal: Spacing.large }}
                        >
                            {title}
                        </PrimaryText>
                        <MinorText style={{ marginHorizontal: Spacing.large }}>
                            {DATE_TEXT}
                        </MinorText>
                    </View>
                );
            default:
        }

        let name;
        if (chef.user) {
            name = chef.user.firstName;
        }
        return (
            <HeroSection
                loading={loading}
                title={title}
                chefName={name}
                chefDescription={`Nick is a graduating senior at Yale passionate about food sustainability and agriculture. He recently returned from a gap year in Hong Kong and can’t wait share the incredible new recipes he picked up there!`}
                media={media}
            />
        );
    };

    _renderInfoSection = () => {
        let {
            startTime,
            description,
            attributes,
            duration,
            loading
        } = this.props.event;
        let { price } = attributes;
        switch (this.props.mode) {
            case EventViewTypes.HISTORY_PAST:
                return null;
            default:
        }
        return (
            <View>
                <Separator />
                <InfoSection
                    modules={this._formatModules()}
                    startTime={startTime}
                    description={description}
                    price={price}
                    duration={duration}
                />
            </View>
        );
    };

    _formatModules = () => {
        switch (this.props.mode) {
            case EventViewTypes.FEED:
                return ["dateTime", "description", "refundPolicy"];
            case EventViewTypes.HISTORY_UPCOMING:
                return ["dateTime", "location", "description", "refundPolicy"];
            case EventViewTypes.HISTORY_PAST:
                return "What was served";
            case EventViewTypes.HOST_ACTIVE:
                return ["dateTime", "location", "description", "refundPolicy"];
            case EventViewTypes.HOST_IN_REVIEW:
                return ["dateTime", "location", "description", "refundPolicy"];
            default:
        }
    };

    _renderPeopleRow = () => {
        return <PeopleRow people={bookings} onPress={this._navigateToPerson} />;
    };

    _renderMenuSection = () => {
        let { attributes, menu } = this.props.event;
        let { mealType, dietaryRestriction } = attributes;
        let title;
        switch (this.props.mode) {
            case EventViewTypes.FEED:
                title = "What's Cooking";
                break;
            case EventViewTypes.HISTORY_UPCOMING:
                title = "What's Cooking";
                break;
            case EventViewTypes.HISTORY_PAST:
                title = "What was served";
                break;
            case EventViewTypes.HOST_ACTIVE:
                title = "What's Cooking";
                break;
            case EventViewTypes.HOST_IN_REVIEW:
                title = "What's Cooking";
                break;
            default:
                break;
        }
        return (
            <View>
                <Separator />
                <MenuSection
                    title={title}
                    menu={menu}
                    mealType={mealType}
                    dietaryRestriction={dietaryRestriction}
                />
            </View>
        );
    };

    _renderLocationSection = () => {
        switch (this.props.mode) {
            case EventViewTypes.HISTORY_PAST:
                return null;
            default:
                break;
        }
        let { marker } = this.props.event;
        let { formattedAddress, secondaryAddress } = marker;
        let lat = marker.point.coordinates[0];
        let lng = marker.point.coordinates[1];
        return (
            <View>
                <Separator />
                <LocationSection
                    lat={lat}
                    lng={lng}
                    formattedAddress={formattedAddress}
                    secondaryAddress={secondaryAddress}
                />
            </View>
        );
    };

    _renderRatingSection = () => {
        return <RatingSection />;
    };

    _renderUtilityBar = () => {
        let color, mainText, subText, buttonText;
        let { guestCount, attributes } = this.props.event;
        let { tableSizeMax, price } = attributes;
        switch (this.props.mode) {
            case EventViewTypes.FEED:
                color = Color.green;
                mainText = `$${price} / person`;
                subText = `${tableSizeMax - guestCount} seats left`;
                buttonText = "RSVP";
                break;
            case EventViewTypes.HISTORY_UPCOMING:
                color = Color.green;
                mainText = "Status: Booked";
                subText = "Happening in 3 days";
                buttonText = "Refund";
                break;
            case EventViewTypes.HISTORY_PAST:
                return null;
            case EventViewTypes.HOST_ACTIVE:
                color = Color.green;
                mainText = "Status: Active";
                subText = "Happening in 3 days";
                buttonText = "Cancel";
                break;
            case EventViewTypes.HOST_IN_REVIEW:
                color = Color.yellow;
                mainText = "Status: In Review";
                subText = "Happening in 3 days";
                buttonText = "Cancel";
                break;
            default:
                break;
        }
        return (
            <UtilityBar
                mainTextColor={color}
                buttonColor={color}
                mainText={mainText}
                subText={subText}
                buttonText={buttonText}
                onPress={this._onPress()}
            />
        );
    };

    _onPress = () => {
        switch (this.props.mode) {
            case EventViewTypes.FEED:
                return this._navigateToBooking;
            case EventViewTypes.HISTORY_UPCOMING:
                return this.props.refund;
            case EventViewTypes.HISTORY_PAST:
                return null;
            case EventViewTypes.HOST_ACTIVE:
                return this.props.cancel;
            case EventViewTypes.HOST_IN_REVIEW:
                return null;
            default:
                return null;
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title={"Table"} leftOnPress={this._goBack} />
                <ScrollView
                    bounces={false}
                    contentInset={{ bottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    {this._renderHeroSection()}
                    {this._renderInfoSection()}
                    {this._renderMenuSection()}
                    {this._renderLocationSection()}
                </ScrollView>
                {this._renderUtilityBar()}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...getEvent(state)
    };
};

const mapDispatchToProps = dispatch => {
    let refund = () => {};

    let book = () => {};

    let cancel = () => {};

    return {
        refund,
        book,
        cancel
    };
};

export default connect(
    mapStateToProps,
    null
)(Event);
