import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import TextField from "Homecooked/src/components/TextFields/Material";
import Header from "Homecooked/src/components/Headers/Basic";
import Banner from "Homecooked/src/components/Image/Banner";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

const placeHolderWidth = 140;
const PROFILE_PLACEHOLDER_IMAGE = require("Homecooked/src/assets/img/filledTable.jpg");
// <Image source={require(PROFILE_PLACEHOLDER_IMAGE)} />;

class Review extends Component {
    state = {
        review: ""
    };

    _goNext = () => {
        this.props.screenProps.updateData("review", this.state.review, () => {
            this.props.screenProps.submit();
        });
    };

    _goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        let { chef, startTime } = this.props.screenProps.event;
        let {
            user: { firstName }
        } = chef;
        return (
            <View style={{ flex: 1 }}>
                <Header title="Rating and Review" leftOnPress={this._goBack} />
                <Banner
                    eventImage={PROFILE_PLACEHOLDER_IMAGE}
                    eventName={`${firstName}'s table`}
                    eventDate={startTime}
                />
                <View style={styles.parentContainer}>
                    <KeyboardAwareScrollView
                        extraScrollHeight={120}
                        extraHeight={50}
                        keyboardShouldPersistTaps={"handled"}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                    >
                        <HeadingText
                            style={{ fontSize: 18, fontWeight: "bold" }}
                        >
                            {`How was ${firstName}'s Table?`}
                        </HeadingText>
                        <PromptText style={{ marginTop: Spacing.small }}>
                            Leaving a review signficantly helps our cooks
                            improve upon future meals.
                        </PromptText>
                        <View style={styles.container}>
                            <TextField
                                containerStyle={styles.input}
                                titleTextStyle={{ fontFamily: "Avenir" }}
                                labelTextStyle={{ fontFamily: "Avenir" }}
                                tintColor="#4A4A4A"
                                label="Write a review"
                                multiline={true}
                                returnKeyType="done"
                                scrollEnabled={true}
                                blurOnSubmit={true}
                                enablesReturnKeyAutomatically={true}
                                value={this.state.review}
                                onChangeText={review =>
                                    this.setState({ review })
                                }
                            />
                        </View>
                    </KeyboardAwareScrollView>
                    <BarButton
                        title="Submit"
                        style={{
                            position: "absolute",
                            bottom: Spacing.large
                        }}
                        borderColor={Color.green}
                        fill={Color.green}
                        onPress={this._goNext}
                        loading={this.props.loading}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.events.actionLoading
    };
};

export default connect(
    mapStateToProps,
    null
)(Review);

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        margin: Spacing.large,
        flexDirection: "column"
    },
    exampleTextContainer: {
        flex: 1,
        marginTop: Spacing.small,
        fontSize: 10
    },
    ratingContainer: {
        paddingTop: 0,
        margin: 0,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    textContainer: {
        flex: 1,
        marginTop: Spacing.small
    },
    container: {
        backgroundColor: Color.white,
        justifyContent: "center"
    },
    input: {
        marginTop: Spacing.small
        //marginHorizontal: Spacing.large
    }
});
