import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert
} from "react-native";
import {
    Container,
} from 'native-base';
import styles from "./style";
import * as colors from '../../constants/colors';
import HeaderComponent from '../../components/header/index';
import * as api from "../../constants/urls";
import * as Service from '../../api/services'
import * as utility from "../../utility/index";
export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            heading: this.props.navigation.state.params.heading
        }
    }

    forgotPassword = async () => {

        // for loader
        this.setState({
            isLoading: true
        })

        // validation part start
        if (utility.isFieldEmpty(this.state.email)) {
            this.setState({
                isLoading: false
            })
            Alert.alert("Please enter Email");
            return
        }

        if (utility.isValidEmail(this.state.email)) {
            this.setState({
                isLoading: false
            })
            Alert.alert("Enter Valid email")
            return
        }
        // validation part End
        let body = {
            email: this.state.email,
        }
        console.log('forgotPassword::body', body)
        let response = await Service.post(api.FORGOTPASSWORD_URL, '', body)
        console.log('forgotPassword::response', response)
        this.setState({
            isLoading: false
        })

        if (response.isSuccess === true) {
            this.props.navigation.navigate('EmailVerification', { otp: response.data.otp, clientId: response.data.client_id })
        }
        else {
            Alert.alert('', response.error)
        }
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <HeaderComponent
                        navigation={this.props.navigation}
                        titleText={this.state.heading}>
                    </HeaderComponent>

                    <View style={{ margin: '5%' }}>
                        <View style={styles.mainView}>
                            <Text style={{ color: colors.contentColor, fontSize: 18, fontWeight: 'bold', }}>{this.state.heading}</Text>
                        </View>
                        <View style={styles.mainView}>
                            <Text style={{ color: colors.contentColor, }}>Please enter your email address.To ensure security of your account, an OTP code will be sent to your email. </Text>
                        </View>
                        <View style={[styles.mainView, { marginLeft: '3%' }]}>
                            <Text style={{ color: colors.contentColor, fontSize: 16, fontWeight: 'bold' }}>Email Address</Text>
                        </View>

                        <View style={styles.mainView}>
                            <TextInput
                                placeholder=' Enter your email'
                                selectionColor={colors.primaryColor}
                                onChangeText={(email) => this.setState({ email })}
                                style={{ marginBottom: '5%', justifyContent: "center", alignSelf: 'flex-start', height: 50, borderColor: 'gray', borderWidth: 1, width: '90%', borderRadius: 5, }}
                            />
                        </View>
                        {/* <Button
                            navigation={this.props.navigation}
                            buttonText={'Start Verification'}
                            buttonNavigation={'EmailVerification'}>
                        </Button> */}
                        <View style={{ marginTop: '10%' }}>
                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignSelf: 'center',
                                backgroundColor: colors.themeColor,
                                width: '60%',
                                borderRadius: 8,
                                height: 50,
                            }}
                                // onPress={() => this.props.navigation.navigate('EmailVerification')}
                                onPress={() => this.forgotPassword()}
                            >
                                <Text style={styles.loginText}>Start Verification</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}