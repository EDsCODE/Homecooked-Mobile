import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import NavigationService from "Homecooked/src/utils/NavigationService";
import HeadingText from "Homecooked/src/components/Text/Heading";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import InfoSection from "Homecooked/src/components/Event/Info";
import CreditCardInput from "Homecooked/src/components/TextFields/CreditCardInput";
import { eventTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import { getEvent } from "Homecooked/src/modules/event/selectors";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class Review extends Component {
    state = {
        modules: ["dateTime", "price"],
        cardDetails: {}
    };

    _goBack = () => {
        NavigationService.navigate("Event");
    };

    componentWillReceiveProps(nextProps) {
        if (
            this.props.actionLoading &&
            !nextProps.actionLoading &&
            !nextProps.error
        ) {
            this.props.navigation.navigate("Confirmed");
        }
    }

    _onChange = form =>
        this.setState(
            {
                cardDetails: form
            },
            () => {
                console.log(this.state);
            }
        );

    _goNext = () => {
        let { id } = this.props.navigation.state.params.event;
        if (this.props.isProfileComplete) {
            this.props.bookEvent("123");
        } else {
            Alert.alert(
                "Profile incomplete",
                "In order to book this event complete your profile!",
                [
                    {
                        text: "Edit",
                        onPress: () =>
                            NavigationService.navigate("EditProfileStack", {
                                parentRoute: "Review"
                            })
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    }
                ],
                { cancelable: false }
            );
        }

        // TODO: payment token placeholder

        // this.props.navigation.navigate("Confirmed");
    };

    render() {
        let { actionLoading } = this.props;
        let { attributes, startTime, duration } = this.props.event;
        let { price } = attributes;
        return (
            <View style={{ flex: 1, paddingTop: 30 }}>
                <KeyboardAwareScrollView
                    extraScrollHeight={120}
                    extraHeight={50}
                    keyboardShouldPersistTaps={"handled"}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <View style={styles.headerContainer}>
                        <CloseButton onPress={this._goBack} />
                        <HeadingText>Review</HeadingText>
                    </View>
                    <InfoSection
                        modules={this.state.modules}
                        startTime={startTime}
                        price={price}
                        duration={duration}
                    />

                    <CreditCardInput
                        onChange={this._onChange}
                        valid={this.state.cardDetails.valid}
                    />
                </KeyboardAwareScrollView>
                <BarButton
                    title="RSVP"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.green}
                    fill={Color.green}
                    onPress={this._goNext}
                    loading={actionLoading}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { events, currentUser } = state;
    return {
        isProfileComplete: currentUser.isComplete,
        ...getEvent(state),
        actionLoading: events.actionLoading,
        error: events.error
    };
};

const mapDispatchToProps = dispatch => {
    const bookEvent = paymentToken => {
        dispatch({
            type: eventTypes.BOOK_EVENT_REQUEST,
            payload: {
                paymentToken
            }
        });
    };
    return {
        bookEvent
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Review);

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: Spacing.large
    }
});
