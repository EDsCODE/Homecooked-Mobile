import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

import HeadingText from 'Homecooked/src/components/Text/Heading';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import CloseButton from 'Homecooked/src/components/Buttons/Close';
import FloatyButton from 'Homecooked/src/components/Buttons/FloatyButton';
import ImagePlaceholder from 'Homecooked/src/components/Image/Placeholder';

import ImagePicker from 'react-native-image-picker';

import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';

import { userTypes } from 'Homecooked/src/modules/types';
import { connect } from 'react-redux';

const placeHolderWidth = Spacing.deviceWidth - 80;

class Photo extends Component {
    state = {
        image: null
    };

    _goBack = () => {
        this.props.navigation.goBack();
    };

    _goNext = () => {
        this.props.navigation.navigate('Bio');
    };

    openPicker = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options, response => {
            this.setState({
                image: response
            });
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} icon={'arrow-round-back'} />
                <HeadingText>Profile Picture</HeadingText>
                <PromptText style={{ marginTop: Spacing.small }}>
                    gathr meals are warm and inviting. Upload a photo that
                    captures that spirit!
                </PromptText>
                <ImagePlaceholder
                    style={{
                        width: placeHolderWidth,
                        height: placeHolderWidth,
                        alignSelf: 'center',
                        marginTop: Spacing.base
                    }}
                    caption={'Picture'}
                    onPress={this.openPicker}
                    source={{
                        uri: this.state.image ? this.state.image.uri : null
                    }}
                />
                <FloatyButton
                    onPress={this._goNext}
                    style={{
                        position: 'absolute',
                        bottom: Spacing.largest,
                        right: Spacing.largest
                    }}
                />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    const uploadImage = image => {
        dispatch({
            type: userTypes.UPLOAD_USER_IMAGE_REQUEST,
            payload: { image }
        });
    };
    return {
        uploadImage
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Photo);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: Spacing.large
    },
    placeholderContainer: {
        marginTop: Spacing.small,
        width: placeHolderWidth * 2 + 20,
        height: placeHolderWidth * 2 + 20,
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'space-around'
    }
});
