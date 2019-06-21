import React, { Component } from "react";
import { View, ScrollView, Alert } from "react-native";
import HeroSection from "Homecooked/src/components/Event/Hero";
import MenuSection from "Homecooked/src/components/Event/Menu";
import InfoSection from "Homecooked/src/components/Event/Info";
import PeopleRow from "Homecooked/src/components/Image/Row";
import RatingSection from "Homecooked/src/components/Event/Ratings";
import Header from "Homecooked/src/components/Headers/Basic";
import UtilityBar from "Homecooked/src/components/Buttons/UtilityBar";
import LocationSection from "Homecooked/src/components/Event/Location";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import PrimaryText from "Homecooked/src/components/Text/Primary";
import MinorText from "Homecooked/src/components/Text/Minor";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import Separator from "Homecooked/src/components/Separator";
import { eventTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

import { EventViewTypes } from "Homecooked/src/types/";

import { getEvent } from "Homecooked/src/modules/event/selectors";
import NavigationService from "Homecooked/src/utils/NavigationService";
import { extendedDateWithMealType } from "Homecooked/src/utils/Date";

class Event extends Component {
    state = {
        loading: true,
        renderHero: false,
        renderInfo: false,
        renderPeople: false,
        renderMenu: false,
        renderLocation: false,
        renderUtilityBar: false,
        renderTitle: false,
        renderBarButton: false,
        START_TIME: "",
        MEDIA: [],
        CHEF_NAME: "",
        CHEF_DESCRIPTION: "",
        EVENT_TITLE: "",
        EVENT_DESCRIPTION: "",
        EVENT_PRICE: "",
        EVENT_DURATION: "",
        MODULES: [],
        MENU: [],
        MENU_TITLE: "",
        DIETARY_RESTRICTION: [],
        MEAL_TYPE: [],
        MARKER: "",
        BUTTON_COLOR: "",
        TINT_COLOR: "",
        MAIN_TEXT: "",
        SUB_TEXT: "",
        ONPRESS: null,
        BUTTON_TEXT: "",
        USERS: []
    };

    componentDidMount() {
        if (this.props.mode == EventViewTypes.PREVIEW) {
            this._setPreviewDetails();
        } else if (this.props.loading) {
            this.setState({
                loading: true
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.loading && !nextProps.loading) {
            this._setEventDetails();
        } else if (nextProps.mode == EventViewTypes.PREVIEW) {
            this._setPreviewDetails();
        }
    }

    _setPreviewDetails = () => {
        let {
            attributes,
            bookings,
            chef,
            description,
            duration,
            marker,
            media,
            menu,
            specialDirections,
            startTime,
            title
        } = this.props.event;
        let {
            dietaryRestriction,
            mealType,
            price,
            tableSizeMin,
            tableSizeMax
        } = attributes;
        this.setState({
            loading: false,
            renderHero: true,
            renderInfo: true,
            renderPeople: false,
            renderMenu: true,
            renderLocation: true,
            renderUtilityBar: false,
            renderTitle: false,
            renderBarButton: true,
            START_TIME: startTime,
            MEDIA: media,
            CHEF_NAME: chef.user.firstName,
            EVENT_TITLE: title,
            EVENT_DESCRIPTION: description,
            EVENT_PRICE: price,
            EVENT_DURATION: duration,
            MODULES: ["dateTime", "description", "refundPolicy"],
            MENU: menu,
            MENU_TITLE: "What's cooking",
            DIETARY_RESTRICTION: dietaryRestriction,
            MEAL_TYPE: mealType,
            MARKER: marker,
            BUTTON_COLOR: Color.orange,
            ONPRESS: this.props.submit,
            BUTTON_TEXT: "Publish"
        });
    };

    _setEventDetails = () => {
        let {
            attributes,
            bookings,
            chef,
            description,
            duration,
            confirmedBookingCount,
            marker,
            images: media,
            menu,
            specialDirections,
            startTime,
            title,
            users
        } = this.props.event;

        let {
            mealType,
            dietaryRestriction,
            tableSizeMin,
            tableSizeMax,
            price
        } = attributes;
        switch (this.props.mode) {
            case EventViewTypes.FEED:
                this.setState({
                    loading: false,
                    renderHero: true,
                    renderInfo: true,
                    renderPeople: true,
                    renderMenu: true,
                    renderLocation: true,
                    renderUtilityBar: true,
                    renderTitle: false,
                    START_TIME: startTime,
                    MEDIA: media,
                    CHEF_NAME: chef.user.firstName,
                    EVENT_TITLE: title,
                    EVENT_DESCRIPTION: description,
                    EVENT_PRICE: price,
                    EVENT_DURATION: duration,
                    MODULES: ["dateTime", "description", "refundPolicy"],
                    MENU: menu,
                    MENU_TITLE: "What's cooking",
                    DIETARY_RESTRICTION: dietaryRestriction,
                    MEAL_TYPE: mealType,
                    MARKER: marker,
                    BUTTON_COLOR: Color.green,
                    TINT_COLOR: Color.green,
                    MAIN_TEXT: `$${price} per person`,
                    SUB_TEXT: `${tableSizeMax -
                        confirmedBookingCount} seats left`,
                    ONPRESS: this._navigateToBooking,
                    BUTTON_TEXT: "RSVP",
                    USERS: users
                });
                break;
            case EventViewTypes.HISTORY_UPCOMING:
                this.setState({
                    loading: false,
                    renderHero: true,
                    renderInfo: true,
                    renderPeople: true,
                    renderMenu: true,
                    renderLocation: true,
                    renderUtilityBar: true,
                    renderTitle: false,
                    START_TIME: startTime,
                    MEDIA: media,
                    CHEF_NAME: chef.user.firstName,
                    EVENT_TITLE: title,
                    EVENT_DESCRIPTION: description,
                    EVENT_PRICE: price,
                    EVENT_DURATION: duration,
                    MODULES: [
                        "dateTime",
                        "location",
                        "description",
                        "refundPolicy"
                    ],
                    MENU: menu,
                    MENU_TITLE: "What's cooking",
                    DIETARY_RESTRICTION: dietaryRestriction,
                    MEAL_TYPE: mealType,
                    MARKER: marker,
                    BUTTON_COLOR: Color.orange,
                    TINT_COLOR: Color.green,
                    MAIN_TEXT: `Status: Active`,
                    SUB_TEXT: `Upcoming`,
                    ONPRESS: this._refund,
                    BUTTON_TEXT: "Refund",
                    USERS: users
                });
                break;
            case EventViewTypes.HISTORY_PAST:
                this.setState({
                    loading: false,
                    renderHero: false,
                    renderInfo: false,
                    renderPeople: false,
                    renderMenu: true,
                    renderLocation: false,
                    renderUtilityBar: false,
                    renderTitle: true,
                    START_TIME: startTime,
                    MEDIA: media,
                    CHEF_NAME: chef.user.firstName,
                    EVENT_TITLE: title,
                    EVENT_DESCRIPTION: description,
                    EVENT_PRICE: price,
                    EVENT_DURATION: duration,
                    MODULES: [
                        "dateTime",
                        "location",
                        "description",
                        "refundPolicy"
                    ],
                    MENU: menu,
                    MENU_TITLE: "What was served",
                    DIETARY_RESTRICTION: dietaryRestriction,
                    MEAL_TYPE: mealType,
                    MARKER: marker,
                    BUTTON_COLOR: Color.orange,
                    TINT_COLOR: Color.green,
                    MAIN_TEXT: `Status: Active`,
                    SUB_TEXT: `Upcoming`,
                    ONPRESS: this.props.refund,
                    BUTTON_TEXT: "Refund"
                });
                break;
            case EventViewTypes.HOST_ACTIVE:
                this.setState({
                    loading: false,
                    renderHero: true,
                    renderInfo: true,
                    renderPeople: false,
                    renderMenu: true,
                    renderLocation: true,
                    renderUtilityBar: true,
                    renderTitle: false,
                    START_TIME: startTime,
                    MEDIA: media,
                    CHEF_NAME: chef.user.firstName,
                    EVENT_TITLE: title,
                    EVENT_DESCRIPTION: description,
                    EVENT_PRICE: price,
                    EVENT_DURATION: duration,
                    MODULES: [
                        "dateTime",
                        "location",
                        "description",
                        "refundPolicy"
                    ],
                    MENU: menu,
                    MENU_TITLE: "What's cooking",
                    DIETARY_RESTRICTION: dietaryRestriction,
                    MEAL_TYPE: mealType,
                    MARKER: marker,
                    BUTTON_COLOR: Color.orange,
                    TINT_COLOR: Color.green,
                    MAIN_TEXT: `Status: Upcoming`,
                    SUB_TEXT: `Happening soon`,
                    ONPRESS: this.props.cancel,
                    BUTTON_TEXT: "Cancel"
                });
                break;
            case EventViewTypes.HOST_IN_REVIEW:
                this.setState({
                    loading: false,
                    renderHero: true,
                    renderInfo: true,
                    renderPeople: false,
                    renderMenu: true,
                    renderLocation: true,
                    renderUtilityBar: true,
                    renderTitle: false,
                    START_TIME: startTime,
                    MEDIA: media,
                    CHEF_NAME: chef.user.firstName,
                    EVENT_TITLE: title,
                    EVENT_DESCRIPTION: description,
                    EVENT_PRICE: price,
                    EVENT_DURATION: duration,
                    MODULES: [
                        "dateTime",
                        "location",
                        "description",
                        "refundPolicy"
                    ],
                    MENU: menu,
                    MENU_TITLE: "What's cooking",
                    DIETARY_RESTRICTION: dietaryRestriction,
                    MEAL_TYPE: mealType,
                    MARKER: marker,
                    BUTTON_COLOR: Color.orange,
                    TINT_COLOR: Color.green,
                    MAIN_TEXT: `Status: In Review`,
                    SUB_TEXT: `You will be notified soon`,
                    ONPRESS: this.props.refund,
                    BUTTON_TEXT: "Cancel"
                });
                break;
            default:
        }
    };

    _refund = () => {
        Alert.alert(
            "Are you sure?",
            "This action cannot be undone and you will unable to book this meal again.",
            [
                {
                    text: "Refund",
                    onPress: () => this.props.refund(),
                    style: "destructive"
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    };

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

    _renderHeroSection = (loading, title, chefName, chefDescription, media) => {
        return (
            <HeroSection
                loading={loading}
                title={title}
                chefName={chefName}
                chefDescription={chefDescription}
                media={media}
            />
        );
    };

    _renderTitle = (title, startTime) => {
        let dateText = extendedDateWithMealType(startTime);
        return (
            <View>
                <PrimaryText style={{ marginHorizontal: Spacing.large }}>
                    {title}
                </PrimaryText>
                <MinorText style={{ marginHorizontal: Spacing.large }}>
                    {dateText}
                </MinorText>
            </View>
        );
    };

    _renderInfoSection = (
        modules,
        startTime,
        description,
        price,
        duration,
        formattedAddress = null
    ) => {
        return (
            <View>
                <Separator />
                <InfoSection
                    modules={modules}
                    startTime={startTime}
                    description={description}
                    price={price}
                    duration={duration}
                    formattedAddress={formattedAddress}
                />
            </View>
        );
    };

    _renderPeopleRow = (loading, people) => {
        return (
            <PeopleRow
                loading={loading}
                people={people}
                onPress={this._navigateToPerson}
            />
        );
    };

    _renderMenuSection = (title, menu, mealType, dietaryRestriction) => {
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

    _renderLocationSection = marker => {
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

    _renderUtilityBar = (
        utilityColor,
        buttonColor,
        mainText,
        subText,
        buttonText,
        onPress
    ) => {
        return (
            <UtilityBar
                mainTextColor={utilityColor}
                buttonColor={buttonColor}
                mainText={mainText}
                subText={subText}
                buttonText={buttonText}
                onPress={onPress}
            />
        );
    };

    _renderBarButton = (buttonText, color, onPress) => {
        return (
            <BarButton
                title={buttonText}
                style={{
                    position: "absolute",
                    bottom: Spacing.large,
                    left: Spacing.large
                }}
                borderColor={color}
                fill={color}
                onPress={onPress}
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
        let {
            renderHero,
            renderTitle,
            renderInfo,
            renderPeople,
            renderMenu,
            renderLocation,
            renderUtilityBar,
            renderBarButton,
            loading,
            EVENT_TITLE,
            CHEF_NAME,
            CHEF_DESCRIPTION,
            MEDIA,
            MENU,
            MENU_TITLE,
            MODULES,
            START_TIME,
            EVENT_DESCRIPTION,
            EVENT_DURATION,
            EVENT_PRICE,
            MEAL_TYPE,
            DIETARY_RESTRICTION,
            MARKER,
            BUTTON_COLOR,
            TINT_COLOR,
            MAIN_TEXT,
            SUB_TEXT,
            ONPRESS,
            BUTTON_TEXT,
            USERS
        } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header title={"Table"} leftOnPress={this._goBack} />
                <ScrollView
                    bounces={false}
                    contentInset={{ bottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    {renderHero
                        ? this._renderHeroSection(
                              loading,
                              EVENT_TITLE,
                              CHEF_NAME,
                              CHEF_DESCRIPTION,
                              MEDIA
                          )
                        : null}
                    {renderTitle
                        ? this._renderTitle(EVENT_TITLE, START_TIME)
                        : null}
                    {renderInfo
                        ? this._renderInfoSection(
                              MODULES,
                              START_TIME,
                              EVENT_DESCRIPTION,
                              EVENT_PRICE,
                              EVENT_DURATION,
                              MARKER.formattedAddress
                          )
                        : null}
                    {renderPeople
                        ? this._renderPeopleRow(loading, USERS)
                        : null}
                    {renderMenu
                        ? this._renderMenuSection(
                              MENU_TITLE,
                              MENU,
                              MEAL_TYPE,
                              DIETARY_RESTRICTION
                          )
                        : null}
                    {renderLocation
                        ? this._renderLocationSection(MARKER)
                        : null}
                </ScrollView>
                {renderUtilityBar
                    ? this._renderUtilityBar(
                          TINT_COLOR,
                          BUTTON_COLOR,
                          MAIN_TEXT,
                          SUB_TEXT,
                          BUTTON_TEXT,
                          ONPRESS
                      )
                    : null}
                {renderBarButton
                    ? this._renderBarButton(BUTTON_TEXT, BUTTON_COLOR, ONPRESS)
                    : null}
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
    let refund = () => {
        dispatch({
            type: eventTypes.REFUND_BOOKING_REQUEST
        });
    };

    let cancel = () => {
        dispatch({
            type: eventTypes.CANCEL_EVENT_REQUEST
        });
    };

    let submit = () => {
        dispatch({
            type: eventTypes.CREATE_EVENT_REQUEST
        });
    };

    return {
        refund,
        cancel,
        submit
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Event);
