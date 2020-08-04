import React, { Component } from "react";
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    AsyncStorage
} from "react-native";
import styles from "./style";
import * as colors from '../../constants/colors';
import Button from '../../components/buttons/buttons';
import { Colors } from "react-native/Libraries/NewAppScreen";

export default class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userImage: global.clientData.image
        }
    }

    componentDidMount() {
        console.log('Client data :: ', global.clientData);
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            console.log('User Image', global.clientData.image);
            this.setState({
                userImage: global.clientData.image
            });
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    logout = async () => {
        console.log('inside logout')
        await AsyncStorage.removeItem('clientData');
        this.props.navigation.navigate('SignIn');

    }

    render() {
        return (
            <View >
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: '3%' }}>
                            <Image source={require('../../components/assets/logo.png')} style={styles.logo} />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('tab1')}>
                                <Image source={require('../../components/assets/close.png')} style={{ width: 20, height: 20, marginTop: '3%' }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>
                                My Profile
                        </Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignSelf: 'center', paddingTop: '7%', paddingBottom: '7%' }}>
                            <ImageBackground source={require('../../components/assets/user.png')}
                                style={{ height: 100, width: 100, alignSelf: 'center' }}>
                                {/* <Image source={require('../../components/assets/user.png')} style={{ width: 100, height: 100, justifyContent: 'center' }} /> */}
                                <Image source={{ uri: this.state.userImage }}
                                    style={{ width: 100, height: 100, justifyContent: 'center', borderRadius: 75 }} />
                            </ImageBackground>
                        </View>
                    </View>

                    <View style={{ margin: "3%", }}>
                        <View style={{ width: '100%', }}>
                            <View>
                                <Text style={{ fontWeight: '700', fontSize: 16, paddingLeft: '5%', paddingTop: '5%', marginBottom: '2%' }}>
                                    Name
                                </Text>
                                <TextInput
                                    selectionColor={colors.primaryColor}
                                    style={{ justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
                                    editable={false}
                                    value={global.clientData.name}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontWeight: '700', fontSize: 16, paddingLeft: '5%', paddingTop: '5%', marginBottom: '2%' }}>
                                Client ID
                                </Text>
                            <TextInput
                                selectionColor={colors.primaryColor}
                                style={{ justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
                                editable={false}
                                value={JSON.stringify(global.clientData.id)}
                            />

                            <View style={{ marginTop: '5%' }} >
                                <TouchableOpacity style={{
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    backgroundColor: colors.themeColor,
                                    width: '60%',
                                    borderRadius: 8,
                                    minHeight: 50,
                                }}
                                    onPress={() => this.props.navigation.navigate('ChangePassword')}
                                >
                                    <Text style={styles.loginText}>Change Password</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: '5%' }} >
                                <TouchableOpacity style={{
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    backgroundColor: colors.themeColor,
                                    width: '60%',
                                    borderRadius: 8,
                                    minHeight: 50,
                                }}
                                    onPress={() => this.props.navigation.navigate('UpdateDetails')}
                                >
                                    <Text style={styles.loginText}>Update Details</Text>
                                </TouchableOpacity>
                            </View>

                            {/* <View style={{ marginTop: '5%', backgroundColor: 'yellow' }}> */}
                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignSelf: 'center',
                                // backgroundColor: colors.themeColor,
                                width: '60%',
                                borderRadius: 8,
                                minHeight: 50,
                                borderColor: colors.primaryColor,
                                borderWidth: 1,
                                marginTop: '5%',
                            }}
                                onPress={this.logout}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                    <View >
                                        <Image source={require('../../components/assets/logout.png')} style={{ width: 22, height: 22, marginRight: "3%" }} />
                                    </View>
                                    <View >
                                        <Text style={{ textAlign: 'center', color: colors.primaryColor, fontSize: 16, }}>Logout</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {/* </View> */}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}