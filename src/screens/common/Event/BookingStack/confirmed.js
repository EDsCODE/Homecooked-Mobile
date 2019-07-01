import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationService from 'Homecooked/src/utils/NavigationService';
import HeadingText from 'Homecooked/src/components/Text/Heading';
import CloseButton from 'Homecooked/src/components/Buttons/Close';
import InfoSection from 'Homecooked/src/components/Event/Info';
import BarButton from 'Homecooked/src/components/Buttons/BarButton';

import { connect } from 'react-redux';
import { getEvent } from 'Homecooked/src/modules/event/selectors';
import branch, { BranchEvent } from 'react-native-branch';

import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';
import Banner from 'Homecooked/src/components/Image/Banner';

class Confirmed extends Component {
    state = {
        modules: ['dateTime', 'location', 'reminder', 'invite']
    };
    _goBack = () => {
        NavigationService.navigate('Feed');
    };

    _goNext = () => {
        this.props.navigation.navigate('Photo');
    };

    getReferralLink = async () => {
        //branch.setIdentity('theUserId') // <- Identifiy the user in branch
        let branchUniversalObject = await branch.createBranchUniversalObject(
            'canonicalIdentifier',
            {
                automaticallyListOnSpotlight: true,
                metadata: { prop1: 'test', prop2: 'abc' },
                title: "You're Invited!",
                contentDescription:
                    '' + firstName + ' has invited you to join Gathr!'
            }
        );
        let linkProperties = {
            feature: 'referral',
            channel: 'SMS'
        };
        let controlParams = {
            $desktop_url: 'http://gathrtable.com'
        };

        var firstName = this.props.currentUser.firstName;
        let shareOptions = {
            messageHeader: "You're Invited!",
            messageBody:
                '' +
                firstName +
                ' has invited you to Gathr. Come join the table!'
        };
        let {
            channel,
            completed,
            error
        } = await branchUniversalObject.showShareSheet(
            shareOptions,
            linkProperties,
            controlParams
        );

        return { channel, completed, error };
    };

    render() {
        let { chef, startTime, marker, duration, images } = this.props.event;
        let { formattedAddress } = marker;
        let {
            user: { firstName }
        } = chef;
        return (
            <View style={{ flex: 1, paddingTop: 30 }}>
                <View style={styles.headerContainer}>
                    <CloseButton onPress={this._goBack} />
                    {/* <HeadingText>Booking Confirmed!</HeadingText> */}
                </View>
                <Banner
                    eventImage={images[0]}
                    eventBannerDescription={`Booking Confirmed! \n${firstName}'s Table`}
                    eventDate={startTime}
                />
                <InfoSection
                    modules={this.state.modules}
                    startTime={startTime}
                    duration={duration}
                    formattedAddress={formattedAddress}
                />
                <BarButton
                    title="Invite"
                    style={{
                        position: 'absolute',
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.orange}
                    fill={Color.orange}
                    onPress={this.getReferralLink}
                    loading={false}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { events, currentUser } = state;
    return {
        currentUser,
        ...getEvent(state),
        actionLoading: events.actionLoading,
        error: events.error
    };
};

export default connect(
    mapStateToProps,
    null
)(Confirmed);

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: Spacing.large
    }
});
