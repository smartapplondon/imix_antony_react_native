
import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
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
// import styles from "./style";
import styles from './style'
import * as colors from '../../constants/colors';
import Button from '../../components/buttons/buttons'
import { NavigationActions, StackActions } from 'react-navigation';
import HeaderComponent from '../../components/header/index';
import { ScrollView } from "react-native-gesture-handler";
import * as utility from "../../utility/index";
export default class ChangePasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }

    validateFields = async () => {
        console.log('inside validate field change password')
        // const clientId = await AsyncStorage.getItem('clientId')

        // validation part start
        if (utility.isFieldEmpty(this.state.oldPassword && this.state.newPassword && this.state.confirmPassword)) {
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
        var data = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword
        }
        this.props.navigation.navigate('ChangeMemorableWord', { passwordData: data })
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <HeaderComponent
                        navigation={this.props.navigation}
                        titleText={'Change Password'}>
                    </HeaderComponent>
                    <View style={{ margin: "3%", }}>
                        <View style={{ width: '100%', }}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '10%', marginBottom: '2%' }}>
                                    Enter Old Password
                                </Text>
                                <TextInput
                                    selectionColor={colors.primaryColor}
                                    style={{ justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
                                    onChangeText={(oldPassword) => this.setState({ oldPassword })}

                                />
                            </View>

                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '5%', marginBottom: '2%' }}>
                                    Enter New Password
                                </Text>
                                <TextInput
                                    selectionColor={colors.primaryColor}
                                    style={{ justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
                                    onChangeText={(newPassword) => this.setState({ newPassword })}

                                />
                            </View>

                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '5%', marginBottom: '2%' }}>
                                    Confirm New Password
                                </Text>
                                <TextInput
                                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                    selectionColor={colors.primaryColor}
                                    style={{ marginBottom: '4%', justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
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
                                    onPress={() => this.validateFields()}
                                >
                                    <Text style={styles.loginText}>Next</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
