
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
    Container,
} from 'native-base';
import styles from "./style";
import * as colors from '../../constants/colors';
import HeaderComponent from '../../components/header/index';
import { ScrollView } from "react-native-gesture-handler";
import * as utility from "../../utility/index";
import * as api from "../../constants/urls";
import * as Service from '../../api/services'
export default class ChangeMemorableWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            oldMemorable: "",
            newMemorable: "",
            confirmMemorable: ""
        }
    }

    changePassword = async () => {
        const clientId = await AsyncStorage.getItem('clientId')
        console.log('clientId in change paswrd', clientId)
        let passwordData = this.props.navigation.state.params.passwordData;

        if (utility.isFieldEmpty(this.state.oldMemorable && this.state.newMemorable && this.state.confirmMemorable)) {
            this.setState({
                isLoading: false
            })
            Alert.alert("All Fields are mandatory");
            return
        }

        if (utility.isValidComparedPassword(this.state.newMemorable, this.state.confirmMemorable)) {
            Alert.alert("Memorable and confirm memorable  doesnot match!!")
            return
        }
        let body = {
            // email: this.state.email,
            clientId: clientId,
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
            confirmPassword: passwordData.confirmPassword,
            oldMemorable: this.state.oldMemorable,
            newMemorable: this.state.newMemorable,
            confirmMemorable: this.state.confirmMemorable
        }
        console.log('changePassword::body', body)
        let response = await Service.post(api.CHANGEPASSWORD_URL, '', body)
        // console.log('forgotPassword::response', response)
        this.setState({
            isLoading: false
        })

        if (response.isSuccess === true) {
            Alert.alert('', response.message)
            this.props.navigation.navigate('profile')
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
                        titleText={'Change Memorable Word'}
                    >
                    </HeaderComponent>
                    <View style={{ margin: "3%", }}>
                        <View style={{ width: '100%', }}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '10%', marginBottom: '2%' }}>
                                    Enter Old Memorable Word
                                </Text>
                                <TextInput
                                    selectionColor={colors.primaryColor}
                                    style={{ justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
                                    onChangeText={(oldMemorable) => this.setState({ oldMemorable })}

                                />
                            </View>

                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '5%', marginBottom: '2%' }}>
                                    Enter New Memorable Word
                                </Text>
                                <TextInput
                                    selectionColor={colors.primaryColor}
                                    style={{ justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
                                    onChangeText={(newMemorable) => this.setState({ newMemorable })}
                                />
                            </View>

                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '5%', }}>
                                    Confirm New Memorable Word
                                </Text>
                                <TextInput
                                    selectionColor={colors.primaryColor}
                                    style={{ marginBottom: '4%', justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
                                    onChangeText={(confirmMemorable) => this.setState({ confirmMemorable })}

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
                                }} onPress={() => this.changePassword()}>


                                    <Text style={styles.loginText}>Save</Text>

                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
