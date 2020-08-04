import React, { Component } from "react";
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    BackHandler
} from "react-native";
import styles from "./style";
import * as colors from '../../constants/colors';
import * as utility from "../../utility/index";
import HandleBack from '../../components/HandleBack/index';
// import * as commonApi from "../../../store/commonApi"

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
    }

    userNameVerification() {
        if (utility.isFieldEmpty(this.state.username)) {
            this.setState({
                isLoading: false
            })
            Alert.alert("Enter User Name");
            return
        } else {
            this.props.navigation.navigate('LoginAuthentication', { username: this.state.username })
        }
    }


    onBack = () => {
        this.setState({
            isLoading: false
        })
        Alert.alert(
            "",
            "Do you want to exit the app?",
            [
                { text: "No", onPress: () => { }, style: "cancel" },
                { text: "Yes", onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false },
        );
        return true;
    }

    render() {
        return (
            <HandleBack onBack={this.onBack} style={{ flex: 1 }}>
                <View>
                    <ScrollView>
                        <View style={styles.container}>
                            <Image source={require('../../components/assets/logo.png')} style={styles.logo} />
                        </View>

                        <TextInput
                            placeholder='Enter Username'
                            selectionColor={colors.primaryColor}
                            onChangeText={(username) => this.setState({ username })}
                            style={{ paddingLeft: '5%', marginBottom: '10%', justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '90%', borderRadius: 5, marginTop: '10%' }}
                        />

                        <TouchableOpacity style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: colors.buttonColor,
                            width: '60%',
                            borderRadius: 8,
                            height: 50
                        }}
                            // onPress={() => this.props.navigation.navigate('LoginAuthentication', { username: this.state.username })}
                            onPress={() => this.userNameVerification()}
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </HandleBack>
        );
    }
}