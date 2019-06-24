import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import FastImage from "react-native-fast-image";

export default class Row extends Component {
    state = {
        width: 0
    };

    _onLayout = event => {
        let { width } = event.nativeEvent.layout;
        console.log(width);
        this.setState({
            width
        });
    };

    _renderProfiles = width => {
        let imageWidth = width / 5 - Spacing.smallest;
        let { people, onPress, style } = this.props;
        return (
            <View style={styles.imageContainer}>
                {people.slice(0, 4 || people.length).map((person, index) => (
                    <TouchableOpacity
                        key={index.toString()}
                        onPress={() => onPress(person)}
                    >
                        <FastImage
                            style={{
                                width: imageWidth,
                                height: imageWidth,
                                borderRadius: imageWidth / 2,
                                backgroundColor: "blue",
                                borderColor: Color.orange,
                                borderWidth: 1,
                                marginRight: Spacing.smallest
                            }}
                            source={{
                                uri: person.profileImageSignedUrl,
                                priority: FastImage.priority.normal
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </TouchableOpacity>
                ))}
                {people.length > 4 ? this._renderExtraTile(imageWidth) : null}
            </View>
        );
    };

    _renderExtraTile = imageWidth => {
        let { people } = this.props;
        return (
            <ImageBackground
                style={{
                    width: imageWidth,
                    height: imageWidth,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                imageStyle={{
                    borderRadius: imageWidth / 2,
                    borderColor: Color.orange,
                    borderWidth: 1
                }}
                source={people[4].imageUri}
            >
                <View
                    style={{
                        width: imageWidth,
                        height: imageWidth,
                        borderRadius: imageWidth / 2,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0.0,0.0,0.0,0.5)"
                    }}
                >
                    <Text style={styles.extraPeopleText}>
                        {`+${people.length - 4}`}
                    </Text>
                </View>
            </ImageBackground>
        );
    };

    render() {
        let { people, style, title } = this.props;
        return people.length ? (
            <View style={style}>
                <View style={styles.container} onLayout={this._onLayout}>
                    <Text style={styles.title}>
                        {title ? title : "At the Table"}
                    </Text>
                    {this._renderProfiles(this.state.width)}
                </View>
            </View>
        ) : null;
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.baseFontSize,
        marginBottom: Spacing.smaller,
        fontWeight: Typography.heavy
    },
    container: {
        margin: Spacing.large
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    extraPeopleText: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.largeHeaderFontSize,
        color: Color.orange
    }
});
