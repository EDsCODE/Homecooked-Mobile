import React, { Component } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import NavigationService from "Homecooked/src/utils/NavigationService";
import HeadingText from "Homecooked/src/components/Text/Heading";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import InfoSection from "Homecooked/src/components/Event/Info";
import CreditCardInput from "Homecooked/src/components/TextFields/CreditCardInput";
import { eventTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import { getEvent } from "Homecooked/src/modules/event/selectors";
import { createToken, formatCardDetails } from "Homecooked/src/services/stripe";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CheckBox from "react-native-check-box";

class Review extends Component {
    state = {
        modules: ["dateTime", "price"],
        cardDetails: {},
        savePayment: false
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

    _goNext = async () => {
        let { id } = this.props.navigation.state.params.event;
        if (this.props.isProfileComplete) {
            try {
                if (this.props.isCustomer) {
                    let payment = {
                        type: "customer"
                    };
                    this.props.bookEvent(payment);
                } else {
                    let details = formatCardDetails(
                        this.state.cardDetails.values
                    );
                    let res = await createToken(details);
                    let payment = {
                        source: res.id,
                        type: this.state.savePayment ? "customer" : "token"
                    };
                    this.props.bookEvent(payment);
                }
            } catch (err) {
                console.log(err.message);
            }
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

        let cardDetailsValid = this.state.cardDetails.valid ? true : false;
        return (
            <View style={{ flex: 1, paddingTop: 30 }}>
                <KeyboardAwareScrollView
                    extraScrollHeight={100}
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

                    {this.props.isCustomer ? null : (
                        <CreditCardInput
                            onChange={this._onChange}
                            valid={this.state.cardDetails.valid}
                        />
                    )}
                    {this.state.cardDetails.valid ? (
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    savePayment: !this.state.savePayment
                                });
                            }}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                alignSelf: "center",
                                marginVertical: 15,
                                marginRight: Spacing.largest
                            }}
                        >
                            <CheckBox
                                style={{ paddingRight: 10 }}
                                checkBoxColor={Color.lightGray}
                                checkedCheckBoxColor={Color.green}
                                isChecked={this.state.savePayment}
                                onClick={() => {
                                    this.setState({
                                        savePayment: !this.state.savePayment
                                    });
                                }}
                            />
                            <Text
                                style={{
                                    fontFamily: "Avenir",
                                    fontSize: 14,
                                    fontWeight: "300"
                                }}
                            >
                                {"Save Payment Information"}
                            </Text>
                        </TouchableOpacity>
                    ) : null}
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
                    active={cardDetailsValid || this.props.isCustomer}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { events, currentUser } = state;
    return {
        isProfileComplete: currentUser.isComplete,
        isCustomer: currentUser.stripeCustomerId,
        ...getEvent(state),
        actionLoading: events.actionLoading,
        error: events.error
    };
};

const mapDispatchToProps = dispatch => {
    const bookEvent = payment => {
        dispatch({
            type: eventTypes.BOOK_EVENT_REQUEST,
            payload: {
                payment
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
