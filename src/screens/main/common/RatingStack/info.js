import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationService from 'Homecooked/src/utils/NavigationService';
import HeadingText from 'Homecooked/src/components/Text/Heading';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import UpvoteButton from 'Homecooked/src/components/Buttons/UpvoteButton';
import CloseButton from 'Homecooked/src/components/Buttons/Close';
import { Spacing, Color } from 'Homecooked/src/components/styles';

const VOTING_CATEGORY_ICON_1 = require('Homecooked/src/assets/img/Food.png');
const VOTING_CATEGORY_ICON_2 = require('Homecooked/src/assets/img/Space.png');
const VOTING_CATEGORY_ICON_3 = require('Homecooked/src/assets/img/Hospitality.png');

export default class Info extends Component {
    state = {
        button1: 1,
        button2: 1,
        button3: 0
    };

    _goBack = () => {
        NavigationService.navigate('Ratings');
    };

    render() {
        return (
            <View style={styles.parentContainer}>
                <View style={styles.textContainer}>
                    <CloseButton onPress={this._goBack} />
                    <HeadingText>How do ratings work?</HeadingText>
                    <PromptText style={{ marginTop: Spacing.small }}>
                        After a meal, you can
                        <PromptText style={{ fontWeight: 'bold' }}>
                            {' upvote '}
                        </PromptText>
                        if you felt your host did a great job in a particular
                        category or
                        <PromptText style={{ fontWeight: 'bold' }}>
                            {' downvote '}
                        </PromptText>
                        if you found a significant issue.
                    </PromptText>
                    <PromptText style={{ marginTop: Spacing.small }}>
                        You can also
                        <PromptText style={{ fontWeight: 'bold' }}>
                            {' leave a category blank '}
                        </PromptText>
                        if your host was alright, but not incredible.
                    </PromptText>
                </View>
                <View style={styles.exampleContainer}>
                    <HeadingText style={{ fontSize: 24 }}>Example:</HeadingText>
                    <View style={styles.ratingContainer}>
                        <UpvoteButton
                            id={'button1'}
                            onPress={this.voteOnPress}
                            style={{
                                color: Color.gray
                            }}
                            value={this.state.button1}
                            active={false}
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
                            active={false}
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
                            active={false}
                            iconImage={VOTING_CATEGORY_ICON_3}
                            iconText="Hospitality"
                        />
                    </View>
                </View>
                <PromptText style={styles.textContainer}>
                    "Kevin's roast pork belly was exquisite. He also has a warm
                    personality and knows how to make guests feel at home, but
                    he could have some more time tidying up his place. All in
                    all, still a high-quality experience."
                </PromptText>
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
        margin: Spacing.large,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    exampleTextContainer: {
        flex: 1,
        marginTop: Spacing.small,
        fontSize: 10
    },
    ratingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textContainer: {
        flex: 1,
        marginTop: Spacing.small,
        fontSize: 14
    },
    exampleContainer: {
        flex: 1,
        marginTop: 60,
        flexDirection: 'column'
    }
});
