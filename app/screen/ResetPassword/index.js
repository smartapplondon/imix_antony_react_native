import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Image, TouchableOpacity,
    Alert
} from "react-native";
import {
    Container,
} from 'native-base';
import styles from "./style";
import * as colors from '../../constants/colors';
import HeaderComponent from '../../components/header/index';
import Modal from "react-native-modal";
import * as utility from "../../utility/index";
import * as api from "../../constants/urls";
import * as Service from '../../api/services'
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            newPassword: '',
            confirmPassword: '',
            memorable: '',
            clientId: this.props.navigation.state.params.clientId
        }
    }



    resetPassword = async () => {
        console.log('inside reset.........')

        // for loader
        this.setState({
            isLoading: true
        })

        // validation part start
        if (utility.isFieldEmpty(this.state.memorable && this.state.newPassword && this.state.confirmPassword)) {
            this.setState({
                isLoading: false
            })
            Alert.alert("All Fields are mandatory");
            return
        }

        if (utility.isValidComparedPassword(this.state.newPassword, this.state.confirmPassword)) {
            Alert.alert("Password and confirm pasword  doesnot match!!")
            return
        }
        // validation part End
        let body = {
            // email: this.state.email,
            clientId: this.state.clientId,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword,
            memorable: this.state.memorable
        }
        console.log('resetPassword::::::::::::body', body)
        let response = await Service.post(api.RESETPASSWORD_URL, '', body)
        // console.log('forgotPassword::response', response)
        this.setState({
            isLoading: false
        })

        if (response.isSuccess === true) {
            // this.props.navigation.navigate('EmailVerification')
            this.toggleModal()
        }
        else {
            Alert.alert('', response.error)
        }
    }


    toggleModal = () => {
        console.log('inside modal')
        this.setState({ isModalVisible: !this.state.isModalVisible });
        setTimeout(() => {
            this.setState({
                isModalVisible: false
            })
            console.log('mess')
            this.props.navigation.navigate('SignIn');
        }, 4000);

    };

    render() {
        return (
            <Container>
                <ScrollView>
                    <HeaderComponent
                        navigation={this.props.navigation}
                        titleText={'Reset Password'}>
                    </HeaderComponent>

                    <View style={{ margin: '5%' }}>
                        <View style={styles.mainView}>
                            <Text style={{ color: colors.contentColor, }}>Set new password that is hard to guess.</Text>
                        </View>
                        <View style={styles.mainView}>
                            <Text style={[styles.text, { marginTop: '10%' }]}>Enter New Password</Text>
                        </View>
                        <View style={styles.mainView}>
                            <TextInput
                                // placeholder=' Enter Your Email'
                                selectionColor={colors.primaryColor}
                                style={styles.TextInputField}
                                onChangeText={(newPassword) => this.setState({ newPassword })}
                            />
                        </View>
                        <View style={styles.mainView}>
                            <Text style={[styles.text, { marginTop: '3%' }]}>Confirm New password</Text>
                        </View>
                        <View style={styles.mainView}>
                            <TextInput
                                // placeholder=' Enter Your Email'
                                selectionColor={colors.primaryColor}
                                style={styles.TextInputField}
                                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                            />
                        </View>
                        <View style={styles.mainView}>
                            <Text style={[styles.text, { marginTop: '3%' }]}>Memorable Word</Text>
                        </View>
                        <View style={styles.SectionStyle}>
                            {/* <MemorableHintModal ref={instance => { this.child = instance; }} ></MemorableHintModal>
                            <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'flex-end', }} onPress={() => { this.child.toggleModal(); }} >

                                <Icon name='question-circle' size={26} style={styles.ImageStyle} />
                            </TouchableOpacity> */}
                            <TextInput
                                placeholder=' Enter Memorable Word'
                                style={styles.loginTxtInput}
                                selectionColor={colors.primaryColor}
                                onChangeText={(memorable) => this.setState({ memorable })}

                            />
                        </View>
                        <View style={{ marginTop: '15%' }} >
                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignSelf: 'center',
                                backgroundColor: colors.themeColor,
                                width: '60%',
                                borderRadius: 8,
                                minHeight: 50,
                            }}
                                // onPress={() => this.resetPassword()}
                                onPress={() => this.resetPassword()}
                            >


                                <Text style={styles.loginText}>Save Password</Text>


                                <Modal isVisible={this.state.isModalVisible}
                                >
                                    <View style={styles.modalInnerView}>
                                        <View style={{ width: '60%', height: '60%', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', marginTop: '5%' }}>
                                            <Image source={require('../../components/assets/tick.png')} style={{ width: 120, height: 85, alignSelf: 'center' }} />
                                        </View>
                                        <Text style={{ color: colors.primaryColor, marginTop: '10%', textAlign: 'center' }}>Success Password Reset</Text>
                                    </View>
                                </Modal>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}