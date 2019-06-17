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
import { Icon } from "react-native-elements";

export default class Row extends Component {
    state = {
        width: 0
    };

    componentDidMount() {
        console.log(this.props);
    }

    _onLayout = event => {
        let { width } = event.nativeEvent.layout;
        this.setState({
            width
        });
    };
    _renderProfiles = width => {
        let imageWidth = width / 5 - Spacing.smallest;
        let { people, onPress } = this.props;
        return (
            <View style={styles.imageContainer}>
                {people.slice(0, 4 || people.length).map((person, index) => (
                    <TouchableOpacity onPress={() => onPress(person.user)}>
                        <Image
                            key={index.toString()}
                            style={{
                                width: imageWidth,
                                height: imageWidth,
                                borderRadius: imageWidth / 2,
                                backgroundColor: "blue",
                                borderColor: Color.orange,
                                borderWidth: 1,
                                marginRight: Spacing.smallest
                            }}
                            source={{ uri: person.user.profileImageSignedUrl }}
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
        return (
            <View style={styles.container} onLayout={this._onLayout}>
                <Text style={styles.title}>At the Table</Text>
                {this._renderProfiles(this.state.width)}
            </View>
        );
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
