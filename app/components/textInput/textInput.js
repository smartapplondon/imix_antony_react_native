import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,

} from "react-native";
import styles from "./style";


export default class TextInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: '2%', marginTop: '10%' }}>
                <TextInput
                    placeholder={this.props.placeholder}
                    style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '90%', borderRadius: 5 }}
                >

                </TextInput>
            </View>
        );
    }
}