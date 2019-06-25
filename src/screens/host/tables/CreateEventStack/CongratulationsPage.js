import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import { Spacing, Color, Typography } from "Homecooked/src/components/styles";

import PhoneInput from "react-native-phone-input";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { connect } from "react-redux";

class CongratulationsPage extends Component {
    state = {
        email: "",
        phoneNumber: "",
        password: ""
    };

    _navigateNext = () => {
        this.props.screenProps.updateData("email", this.state.email);
        this.props.navigation.navigate("Password");
    };

    _goNext = () => {
        NavigationService.navigate("HostTablesMain");
    };

    render() {
        return (
            <View style={{ flex: 1, marginTop: 70 }}>
                <View style={styles.container}>
                    <HeadingText>Congratulations! </HeadingText>
                    <PromptText>
                        Start filling your table by inviting friends and posting
                        to social media using the following link:
                    </PromptText>
                </View>
                <BarButton
                    title="Finish"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.green}
                    fill={Color.green}
                    onPress={this._goNext}
                    loading={this.props.loading}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.white,
        flex: 1,
        marginHorizontal: Spacing.large
    }
});

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    };
};

export default connect(
    mapStateToProps,
    null
)(CongratulationsPage);
