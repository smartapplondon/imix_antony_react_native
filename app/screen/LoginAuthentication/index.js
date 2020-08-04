import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from "react-native";

import { Header, Container } from 'native-base';
import styles from "./style";
import * as colors from '../../constants/colors';
import * as api from "../../constants/urls";
import * as Service from '../../api/services';
import Loader from '../../components/Loader/index';
import * as utility from "../../utility/index";

export default class LoginAuthentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isModalVisible: false,
            password2: '',
            password5: '',
            password7: '',
            memorable: "",
            value: ''
        }

    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    login = async () => {

        let username = this.props.navigation.state.params.username;
        // for loader

        // validation part start
        if (utility.isFieldEmpty(this.state.password2 && this.state.password5 && this.state.password7)) {
            this.setState({
                isLoading: false
            })
            Alert.alert("Please enter password");
            return
        }

        if (utility.isFieldEmpty(this.state.memorable)) {
            this.setState({
                isLoading: false
            })
            Alert.alert("Please enter memory word");
            return
        }

        let body = {
            username: username,
            password: this.state.password2 + this.state.password5 + this.state.password7,
            memorable: this.state.memorable
        }
        this.setState({
            isLoading: true
        })
        console.log('body', body)
        let response = await Service.post(api.LOGIN_URL, '', body)
        this.setState({
            isLoading: false
        })
        console.log('login::response', response)
        //  Alert.alert('login::response', response)
        if (response.isSuccess === true) {
            console.log('clientData', response.data);
            AsyncStorage.setItem('clientData', JSON.stringify(response.data));
            AsyncStorage.setItem('clientId', response.data.id.toString());
            global.clientData = response.data;
            this.props.navigation.navigate('tab1')
        }
        else {
            console.log('response', response)
            this.setState({
                isLoading: false
            })
            Alert.alert('Error', response.error)
            // this.setState({
            //     isLoading: false
            // })
        }
    }



    render() {
        return (
            <Container>
                <Loader isLoading={this.state.isLoading}></Loader>
                <ScrollView>
                    <Header style={styles.headerStyle}>
                        <View style={{ justifyContent: 'center', alignContent: 'center', }}>
                            <Image source={require('../../components/assets/logo.png')} style={{ width: 264, height: 47, }} />
                        </View>
                    </Header>

                    <View style={{ margin: '5%' }}>
                        <View style={styles.mainView}>
                            <Text style={{ color: colors.primaryColor, fontSize: 22, fontWeight: 'bold', }}>Welcome Back</Text>
                        </View>
                        <View style={styles.mainView}>
                            <Text style={{ color: colors.contentColor, fontSize: 18, fontWeight: 'bold', }}>Password</Text>
                        </View>
                        <View style={styles.mainView}>
                            <Text style={{ color: colors.contentColor, }}>Please enter the 2, 5, 7 characters of your password  and keep in mind it is key sensitive.</Text>
                        </View>



                        <View style={styles.paswordTextInputView}>

                            <View style={styles.paswordTextInput}>
                                <Text style={styles.paswordText}>2</Text>
                                <TextInput
                                    // onChangeText={(password2) => this.setState({ password2 })}
                                    style={styles.TextInputstyles}
                                    maxLength={1}
                                    ref="input_1"
                                    selectionColor={colors.primaryColor}
                                    onChangeText={password2 => {
                                        this.setState({ password2 })
                                        if (password2) this.refs.input_2.focus(); //assumption is TextInput ref is input_2
                                    }}
                                    secureTextEntry
                                />
                            </View>


                            <View style={styles.paswordTextInput}>
                                <Text style={styles.paswordText}>5</Text>
                                <TextInput
                                    //  onChangeText={(password5) => this.setState({ password5 })}
                                    style={styles.TextInputstyles}
                                    maxLength={1}
                                    ref="input_2"
                                    selectionColor={colors.primaryColor}
                                    onChangeText={password5 => {
                                        this.setState({ password5 })
                                        if (password5) this.refs.input_3.focus(); //assumption is TextInput ref is input_2
                                    }}
                                    secureTextEntry
                                />
                            </View>

                            <View style={styles.paswordTextInput}>
                                <Text style={styles.paswordText}>7</Text>
                                <TextInput
                                    //  onChangeText={(password7) => this.setState({ password7 })}
                                    style={styles.TextInputstyles}
                                    maxLength={1}
                                    ref="input_3"
                                    selectionColor={colors.primaryColor}
                                    onChangeText={password7 => {
                                        this.setState({ password7 })
                                        if (password7) this.refs.input_4.focus(); //assumption is TextInput ref is input_2
                                    }}
                                    secureTextEntry
                                />
                            </View>

                        </View>


                        <View style={styles.mainView}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword', { heading: ' Forgot Password' })}>
                                <Text style={{ color: colors.primaryColor, alignSelf: 'flex-end', fontWeight: 'bold' }}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainView}>
                        <View style={[{flexDirection: 'row', }]}>
                            <Text style={{ color: colors.contentColor, fontSize: 18 }}>Memorable Word </Text>
                            <Text style={{ color: colors.contentColor, fontSize: 18, fontWeight: 'bold', }}>(This is case sensitive)</Text>
                            </View>
                        </View>

                        <View style={styles.SectionStyle}>
                            {/* <MemorableHintModal ref={instance => { this.child = instance; }} ></MemorableHintModal> */}
                            {/* <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'flex-end', }} onPress={() => { this.child.toggleModal(); }} >

                                <Icon name='question-circle' size={26} style={styles.ImageStyle} />
                            </TouchableOpacity> */}
                            <TextInput
                                placeholder=' Enter Memorable Word'
                                style={styles.loginTxtInput}
                                ref="input_4"
                                selectionColor={colors.primaryColor}
                                onChangeText={(memorable) => this.setState({ memorable })}

                            />
                        </View>
                        {/* <View style={styles.SectionStyle}>
                        <Icon name=' question-circle' size={20} style={styles.ImageStyle} />
                        <TextInput allowFontScaling={false} require
                            placeholder=' Enter Memorable Word'
                            // style={styles.textInputStyles}
                            style={styles.loginTxtInput}

                        />
                    </View> */}
                        <View style={[styles.mainView, { marginBottom: '5%' }]}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword', { heading: ' Forgot Memorable Word' })}>
                                <Text style={{ color: colors.primaryColor, alignSelf: 'flex-end', fontWeight: 'bold' }}>Forgot Memorable Word?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: colors.buttonColor,
                            width: '60%',
                            borderRadius: 8,
                            minHeight: 50,
                            marginTop: '10%',

                        }}
                            // onPress={() => this.props.navigation.navigate('tab1')
                            onPress={() => this.login()
                            }
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Container>
        );
    }
}
