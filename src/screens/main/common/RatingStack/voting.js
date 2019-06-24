import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationService from 'Homecooked/src/utils/NavigationService';
import HeadingText from 'Homecooked/src/components/Text/Heading';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import UpvoteButton from 'Homecooked/src/components/Buttons/UpvoteButton';
import CloseButton from 'Homecooked/src/components/Buttons/Close';
import { Spacing, Color } from 'Homecooked/src/components/styles';
import BarButton from 'Homecooked/src/components/Buttons/BarButton';
import Header from 'Homecooked/src/components/Headers/Basic';
import Banner from 'Homecooked/src/components/Image/Banner';

const PROFILE_PLACEHOLDER_IMAGE = require('Homecooked/src/assets/img/filledTable.jpg');
const VOTING_CATEGORY_ICON_1 = require('Homecooked/src/assets/img/Food.png');
const VOTING_CATEGORY_ICON_2 = require('Homecooked/src/assets/img/Space.png');
const VOTING_CATEGORY_ICON_3 = require('Homecooked/src/assets/img/Hospitality.png');
export default class Voting extends Component {
    state = {
        button1: 0,
        button2: 0,
        button3: 0,
        image: PROFILE_PLACEHOLDER_IMAGE
    };

    _goNext = () => {
        this.props.navigation.navigate('Review');
    };

    _goBack = () => {
        NavigationService.navigate('Info');
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Rating and Review" leftOnPress={this._goBack} />
                <Banner
                    eventImage={PROFILE_PLACEHOLDER_IMAGE}
                    eventName={" Barb's Table"}
                    eventDate={' Thu, Mar 28'}
                />
                <View style={styles.parentContainer}>
                    <View style={styles.textContainer}>
                        <HeadingText>How was Barb's Table?</HeadingText>
                        <PromptText style={{ marginTop: Spacing.small }}>
                            <PromptText style={{ fontWeight: 'bold' }}>
                                {'Upvote '}
                            </PromptText>
                            if you felt your host was spectacular in a
                            particular category,
                            <PromptText style={{ fontWeight: 'bold' }}>
                                {' downvote '}
                            </PromptText>
                            if you thought there were categories for
                            improvement, or
                            <PromptText style={{ fontWeight: 'bold' }}>
                                {' leave a category blank '}
                            </PromptText>
                            if your host did alright, but not incredible.
                        </PromptText>
                    </View>
                    <View style={styles.ratingContainer}>
                        <UpvoteButton
                            id={'button1'}
                            onPress={this.voteOnPress}
                            style={{
                                color: Color.gray
                            }}
                            value={this.state.button1}
                            active={true}
                            iconImage={VOTING_CATEGORY_ICON_1}
                            iconText="Food"
                        />
                        <UpvoteButton
                            id={'button2'}
                            onPress={this.voteOnPress}
                            style={{
                                color: Color.gray
                            }}
                            value={this.state.button2}
                            active={true}
                            iconImage={VOTING_CATEGORY_ICON_2}
                            iconText="Space"
                        />
                        <UpvoteButton
                            id={'button3'}
                            onPress={this.voteOnPress}
                            style={{
                                color: Color.gray
                            }}
                            value={this.state.button3}
                            active={true}
                            iconImage={VOTING_CATEGORY_ICON_3}
                            iconText="Hospitality"
                        />
                    </View>
                    <BarButton
                        title="Next"
                        style={{
                            position: 'absolute',
                            bottom: Spacing.small
                        }}
                        borderColor={Color.green}
                        fill={Color.green}
                        onPress={this._goNext}
                    />
                </View>
            </View>
        );
    }

    voteOnPress = (id, value) => {
        if (this.state[id] == value) {
            console.log(this.state[id]);
            this.setState({
                [id]: 0
            });
        } else {
            this.setState({
                [id]: value
            });
        }
    };
}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        margin: Spacing.small,
        flexDirection: 'column'
    },
    ratingContainer: {
        paddingTop: 0,
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textContainer: {
        marginTop: Spacing.small
    }
});
