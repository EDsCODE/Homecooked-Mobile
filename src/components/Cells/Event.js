import React, { PureComponent } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { dateWithMealType, eventCardDate } from "Homecooked/src/utils/Date";
import TitleText from "Homecooked/src/components/Text/Title";
import MinorText from "Homecooked/src/components/Text/Minor";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";

export default class EventCard extends PureComponent {
    state = {
        activeSlide: 0,
        image: "",
        distance: "",
        loadingDistance: false,
        imagesLoaded: false
    };

    _renderCard = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={"eventcell" + index}
                onPress={this.onPress}
                activeOpacity={1.0}
            >
                <View
                    style={styles.imageContainer}
                    borderTopLeftRadius={5}
                    borderTopRightRadius={5}
                >
                    <FastImage
                        style={styles.image}
                        source={{
                            uri: item,
                            priority: FastImage.priority.normal
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    >
                        <LinearGradient
                            colors={["rgba(0,0,0,0.8)", "transparent"]}
                            style={styles.linGradient}
                            start={{ x: 0.5, y: 1.0 }}
                            end={{ x: 0.5, y: 0.7 }}
                        />
                    </FastImage>
                </View>
            </TouchableOpacity>
        );
    };

    get pagination() {
        const { activeSlide } = this.state;
        let { images } = this.props.event;
        return (
            <Pagination
                dotsLength={images.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    paddingTop: Spacing.base,
                    paddingBottom: 0
                }}
                dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 0,
                    backgroundColor: "rgba(75, 75, 75, 1.00)"
                }}
                inactiveDotStyle={{
                    backgroundColor: "rgba(160, 160, 160, 1.00)"
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    onPress = () => {
        this.props.onPress(this.props.event);
    };

    render() {
        let {
            title,
            startTime,
            attributes,
            key,
            marker,
            chef,
            images,
            confirmedBookingCount
        } = this.props.event;
        let { price } = attributes;
        let MEALTYPE_TIME = dateWithMealType(startTime);
        let LOCATION = `${marker.city}, ${marker.state}`;
        let SEATS_LEFT =
            attributes.tableSizeMax -
            parseInt(confirmedBookingCount) +
            " seats left";
        let EVENT_CARD_DATE = eventCardDate(startTime);
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={this.onPress}
                activeOpacity={1.0}
                key={key}
            >
                <TouchableOpacity onPress={this.onPress} activeOpacity={0.9}>
                    <Carousel
                        data={images}
                        renderItem={this._renderCard}
                        sliderWidth={Spacing.deviceWidth - 30}
                        itemWidth={Spacing.deviceWidth - 30}
                        layout="default"
                        inactiveSlideScale={1.0}
                        onSnapToItem={index =>
                            this.setState({ activeSlide: index })
                        }
                    />
                    {this.pagination}
                    <View style={styles.infoContainer}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <TitleText>{title}</TitleText>
                            <TitleText>{"$" + price}</TitleText>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <MinorText>{MEALTYPE_TIME}</MinorText>
                            <MinorText>{LOCATION}</MinorText>
                        </View>
                    </View>
                    <View style={styles.badgeContainer}>
                        <View
                            style={[
                                styles.badge,
                                {
                                    borderBottomLeftRadius: 0,
                                    borderTopRightRadius: 5,
                                    backgroundColor: Color.black
                                }
                            ]}
                        >
                            <MinorText style={{ color: "white" }}>
                                {EVENT_CARD_DATE}
                            </MinorText>
                        </View>
                        <View style={[styles.badge]}>
                            <MinorText style={{ color: "white" }}>
                                {SEATS_LEFT}
                            </MinorText>
                        </View>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        alignItems: "center",
        overflow: "hidden"
    },
    image: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        width: Spacing.deviceWidth - 30,
        height: Spacing.deviceWidth - 30
    },
    linGradient: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        height: Spacing.deviceWidth - 30
    },
    card: {
        margin: 15,
        marginBottom: 15,
        shadowOffset: { width: 0, height: 10 },
        shadowColor: "gray",
        shadowOpacity: 0.3,
        shadowRadius: 20,
        backgroundColor: "white",
        borderRadius: 5
    },
    infoContainer: {
        padding: Spacing.base
    },
    time: {
        color: "white",
        fontFamily: "Avenir",
        fontWeight: "400",
        fontSize: 14
    },
    badgeContainer: {
        position: "absolute",
        right: 0,
        top: 0
    },
    badge: {
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        borderBottomLeftRadius: 5,
        backgroundColor: "#e55a44",
        justifyContent: "center",
        alignItems: "center"
    }
});
