import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationService from 'Homecooked/src/utils/NavigationService';
import PrimaryText from 'Homecooked/src/components/Text/Primary';
import MinorText from 'Homecooked/src/components/Text/Minor';
import UpvoteButton from 'Homecooked/src/components/Buttons/UpvoteButton';
import CloseButton from 'Homecooked/src/components/Buttons/Close';
import { Spacing, Color } from 'Homecooked/src/components/styles';
import BarButton from 'Homecooked/src/components/Buttons/BarButton';
import Header from 'Homecooked/src/components/Headers/Basic';
import Banner from 'Homecooked/src/components/Image/Banner';

const PROFILE_PLACEHOLDER_IMAGE = require('Homecooked/src/assets/img/filledTable.jpg');
const VOTING_CATEGORY_ICON_1 = require('Homecooked/src/assets/img/Food_1.png');
const VOTING_CATEGORY_ICON_2 = require('Homecooked/src/assets/img/Space_1.png');
const VOTING_CATEGORY_ICON_3 = require('Homecooked/src/assets/img/Hospitality_1.png');
export default class Voting extends Component {
    state = {
        button1: 0,
        button2: 0,
        button3: 0
    };

    _goNext = () => {
        let { button1, button2, button3 } = this.state;
        this.props.screenProps.updateData('ratings', [
            button1,
            button2,
            button3
        ]);
        this.props.navigation.navigate('Review');
    };

    _goBack = () => {
        this.props.screenProps.goBack();
    };

    render() {
        let { chef, title, startTime, images } = this.props.screenProps.event;

        let {
            user: { firstName }
        } = chef;
        return (
            <View style={{ flex: 1 }}>
                <Header title="Rating and Review" leftOnPress={this._goBack} />
                <Banner
                    eventImage={images[0]}
                    eventName={`${firstName}'s Table`}
                    eventDate={startTime}
                />
                <View style={styles.parentContainer}>
                    <View style={styles.textContainer}>
                        <PrimaryText>{`How was ${firstName}'s Table?`}</PrimaryText>
                        <MinorText style={{ marginTop: Spacing.small }}>
                            <MinorText style={{ fontWeight: 'bold' }}>
                                {'Upvote '}
                            </MinorText>
                            if you felt your host was spectacular in a
                            particular category,
                            <MinorText style={{ fontWeight: 'bold' }}>
                                {' downvote '}
                            </MinorText>
                            if you thought there were categories for
                            improvement, or
                            <MinorText style={{ fontWeight: 'bold' }}>
                                {' leave a category blank '}
                            </MinorText>
                            if your host did alright, but not incredible.
                        </MinorText>
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
                            bottom: Spacing.small,
                            alignSelf: 'center'
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
        margin: Spacing.large,
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
