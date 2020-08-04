import React, { Component } from "react";
import {
    View,
    Modal,
    Text,
    TextInput,
    ScrollView,
    ImageBackground,
    Image, TouchableOpacity,
    Alert
} from "react-native";
import {
    Header,
    Left,
    Body,
    Right,
    Title,
    Container,
    Content
} from 'native-base';
import styles from "./style";
import * as colors from '../../constants/colors';
import Button from '../../components/buttons/buttons'
import HeaderComponent from '../../components/header/index';
import * as utility from "../../utility/index";


export default class EmailVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp1: '',
            otp2: '',
            otp3: '',
            otp4: "",
            generatedOtp: this.props.navigation.state.params.otp,
            clientId: this.props.navigation.state.params.clientId
        }

    }

    otpVerification() {
        let otp = this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4
        console.log('otp', otp)

        if (!utility.isValidOtp(otp)) {

            this.setState({
                isLoading: false
            })
            Alert.alert("Enter Valid otp")
            return
        }
        console.log('generatedOtp........', this.state.generatedOtp)
        if (otp != this.state.generatedOtp) {
            Alert.alert("Invalid otp")
            return
        } else {

            this.props.navigation.navigate('ResetPassword', { clientId: this.state.clientId })
        }


    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <HeaderComponent
                        navigation={this.props.navigation}
                        titleText={'Email Verification'}>
                    </HeaderComponent>
                    <View style={{ margin: '5%' }}>
                        <View style={styles.mainView}>
                            <Text style={{ color: colors.contentColor, fontSize: 18, fontWeight: 'bold', }}>Email Verification</Text>
                        </View>
                        <View style={styles.mainView}>
                            <Text style={{ color: colors.contentColor, }}>Please enter verification code sent to your email</Text>
                        </View>
                        <View style={styles.paswordTextInputView}>

                            <View style={styles.paswordTextInput}>
                                <TextInput
                                    style={styles.TextInputstyles}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    selectionColor={colors.primaryColor}
                                    ref="input_1"
                                    onChangeText={otp1 => {
                                        this.setState({ otp1 })
                                        if (otp1) this.refs.input_2.focus(); //assumption is TextInput ref is input_2
                                    }}
                                />
                            </View>


                            <View style={styles.paswordTextInput}>
                                <TextInput
                                    style={styles.TextInputstyles}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    selectionColor={colors.primaryColor}
                                    ref="input_2"
                                    onChangeText={otp2 => {
                                        this.setState({ otp2 })
                                        if (otp2) this.refs.input_3.focus(); //assumption is TextInput ref is input_2
                                    }}
                                />
                            </View>

                            <View style={styles.paswordTextInput}>
                                <TextInput
                                    style={styles.TextInputstyles}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    selectionColor={colors.primaryColor}
                                    ref="input_3"
                                    onChangeText={otp3 => {
                                        this.setState({ otp3 })
                                        if (otp3) this.refs.input_4.focus(); //assumption is TextInput ref is input_2
                                    }}
                                />
                            </View>

                            <View style={styles.paswordTextInput}>
                                <TextInput
                                    style={styles.TextInputstyles}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    selectionColor={colors.primaryColor}
                                    ref="input_4"
                                    onChangeText={(otp4) => this.setState({ otp4 })}

                                />
                            </View>
                        </View>

                        <View style={{ marginTop: '30%' }}>
                            {/* <Button
                                navigation={this.props.navigation}
                                buttonText={'Verify Code'}
                                buttonNavigation={'ResetPassword'}>
                            </Button> */}
                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignSelf: 'center',
                                // alignContent: 'center',
                                // alignItems: 'center',
                                backgroundColor: colors.themeColor,
                                width: '60%',
                                borderRadius: 8,
                                height: 50,
                                // marginTop: '5%'
                            }}
                                // onPress={() => this.props.navigation.navigate('EmailVerification')}
                                onPress={() => this.otpVerification()}
                            >
                                <Text style={styles.loginText}>Verify Code</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.verificationMeassageView}>
                            <Text >Your email/SMS should arrive </Text>
                            <Text >within 58 second(s)</Text>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}