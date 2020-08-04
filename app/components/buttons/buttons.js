import React, { Component } from "react";
import * as colors from '../../constants/colors'
import {
    View,
    Text,
    TouchableOpacity,

} from "react-native";
import styles from "./style";


export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let buttonColor
        let navigate = this.props.navigation
        console.log("navigate", this.props.buttonNavigation)
        if (navigate.state.routeName == "SignIn" || navigate.state.routeName == 'LoginAuthentication') {
            buttonColor = colors.buttonColor
        }
        else {
            buttonColor = colors.themeColor
        }

        return (

            <TouchableOpacity style={{
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: buttonColor,
                width: '60%',
                borderRadius: 8,
                minHeight: 50,
            }} onPress={() => this.props.navigation.navigate(this.props.buttonNavigation)}>


                <Text style={styles.loginText}>{this.props.buttonText}</Text>

            </TouchableOpacity>)
    }
}