import React, { Component } from "react";
import {
    View,
    Modal,
    Text,
    TextInput,
    ScrollView,
    ImageBackground,
    Image, TouchableOpacity,

} from "react-native";
import styles from "./style";
import * as colors from '../../constants/colors';
import Button from '../../components/buttons/buttons'
import { Header, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // <Header style={{
            //     backgroundColor: colors.primaryColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingTop: '10%', paddingBottom: '30%'
            // }}>
            //     <View style={{ justifyContent: 'center', alignContent: 'center', }}>
            //         <Image source={require('../../components/assets/logo.png')} style={{ width: 264, height: 47, }} />
            //     </View>
            // </Header>
            <Header style={{
                backgroundColor: colors.primaryColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: '20%', paddingTop: '5%'
            }}>
                <Left>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <Icon size={40} style={{ color: '#fff', paddingLeft: '2%' }} name='angle-left' />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Title>{this.props.titleText}</Title>
                </Body>

            </Header>


        );
    }
}
