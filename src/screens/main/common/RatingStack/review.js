import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import NavigationService from 'Homecooked/src/utils/NavigationService';
import HeadingText from 'Homecooked/src/components/Text/Heading';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import UpvoteButton from 'Homecooked/src/components/Buttons/UpvoteButton';
import CloseButton from 'Homecooked/src/components/Buttons/Close';
import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';
import BarButton from 'Homecooked/src/components/Buttons/BarButton';
import TextField from 'Homecooked/src/components/TextFields/Material';
import Header from 'Homecooked/src/components/Headers/Basic';
import Banner from 'Homecooked/src/components/Image/Banner';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const placeHolderWidth = 140;
const PROFILE_PLACEHOLDER_IMAGE = require('Homecooked/src/assets/img/filledTable.jpg');
// <Image source={require(PROFILE_PLACEHOLDER_IMAGE)} />;

export default class Review extends Component {
    _goNext = () => {
        this.props.navigation.navigate('Info');
    };

    _goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Rating and Review" leftOnPress={this._goBack} />
                <Banner
                    eventImage={PROFILE_PLACEHOLDER_IMAGE}
                    eventName={" Barb's Table "}
                    eventDate={'Thu, Mar 28'}
                />
                <View style={styles.parentContainer}>
                    <HeadingText style={{ fontSize: 18, fontWeight: 'bold' }}>
                        How was Barb's Table?
                    </HeadingText>
                    <PromptText style={{ marginTop: Spacing.small }}>
                        Leaving a review signficantly helps our cooks improve
                        upon future meals.
                    </PromptText>
                    <View style={styles.container}>
                        <TextField
                            containerStyle={styles.input}
                            titleTextStyle={{ fontFamily: 'Avenir' }}
                            labelTextStyle={{ fontFamily: 'Avenir' }}
                            tintColor="#4A4A4A"
                            label="Write a review"
                            multiline={true}
                            returnKeyType="done"
                            scrollEnabled={true}
                            blurOnSubmit={true}
                            enablesReturnKeyAutomatically={true}
                        />
                    </View>
                    <PromptText
                        style={{ marginTop: Spacing.small, fontSize: 12 }}
                    >
                        <PromptText
                            style={{ fontSize: 12, color: Color.orange }}
                        >
                            {'Report a guest '}
                        </PromptText>
                        at this meal
                    </PromptText>
                    <BarButton
                        title="Submit"
                        style={{
                            position: 'absolute',
                            bottom: Spacing.large
                        }}
                        borderColor={Color.green}
                        fill={Color.green}
                        onPress={this._goNext}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        margin: Spacing.large,
        flexDirection: 'column'
    },
    exampleTextContainer: {
        flex: 1,
        marginTop: Spacing.small,
        fontSize: 10
    },
    ratingContainer: {
        paddingTop: 0,
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textContainer: {
        flex: 1,
        marginTop: Spacing.small
    },
    container: {
        backgroundColor: Color.white,
        justifyContent: 'center'
    },
    input: {
        marginTop: Spacing.small
        //marginHorizontal: Spacing.large
    }
});
