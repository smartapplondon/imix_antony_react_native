
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
    Picker
} from 'native-base';
// import styles from "./style";
import styles from './style'
import * as colors from '../../constants/colors';
import { ScrollView } from "react-native-gesture-handler";
import * as utility from "../../utility/index";
import * as api from "../../constants/urls";
import * as Service from '../../api/services'
export default class AddAddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            PickerAddressVal: '',
            // PickerCountryVal: '',
            address_id: '',
            addressPicker: '',
            address_type: '',
            address1: '',
            address2: '',
            country: '',
            city: '',
            post_code: '',

        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            let addressData = this.props.navigation.state.params.addressData;
            if (addressData != null) {
                this.setState({
                    address_id: addressData.id,
                    addressPicker: addressData.address_type,
                    address1: addressData.address1,
                    address2: addressData.address2,
                    country: addressData.country,
                    city: addressData.city,
                    post_code: addressData.post_code
                });
            } else {
                this.resetState();
            }

        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }
    resetState() {
        this.setState({
            address_id: '',
            addressPicker: '',
            address1: '',
            address2: '',
            country: '',
            city: '',
            post_code: ''
        });
    }
    save = async () => {
        const clientId = await AsyncStorage.getItem('clientId')
        console.log('clientId in ADRRESS SCREENNNN', clientId)

        if (utility.isFieldEmpty(this.state.post_code && this.state.country)) {
            this.setState({
                isLoading: false
            })
            Alert.alert("Please fill the mandatory Fields  ");
            return
        }

        let body = {
            // email: this.state.email,
            client_id: clientId,
            address_type: this.state.addressPicker,
            address1: this.state.address1,
            address2: this.state.address2,
            country: this.state.country,
            city: this.state.city,
            post_code: this.state.post_code
        }
        console.log('addAddress::body............', body)
        let response = null;
        console.log('address id :: ', this.state.address_id);
        if (this.state.address_id) {
            console.log('updating address');
            response = await this.updateAddress(body);
            console.log('update response :: ', response);
        } else {
            console.log('creating address');
            response = await this.createAddress(body);
            console.log('create response :: ', response);
        }
        if (response.isSuccess) {
            this.setState({
                isLoading: false
            })
            // Alert.alert('Success')
            console.log('updated successfully....navigating to updateDetails');
            this.props.navigation.navigate('UpdateDetails')
        }
        else {
            Alert.alert('', response.error)
        }
    }

    async createAddress(body) {
        let response = await Service.post(api.ADDADDRESS_URL, '', body);
        return response;
    }

    async updateAddress(body) {
        let response = await Service.put(`${api.UPDATEADDRESS_URL}${this.state.address_id}`, '', body);
        return response;
    }
    render() {
        return (
            <ScrollView>
                <View style={{ width: '100%', backgroundColor: colors.primaryColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: '10%', paddingTop: '6%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'space-between', marginTop: '2%', width: '60%', marginLeft: '7%' }}>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 20, }}>
                                Add / Update Address
                            </Text>
                        </View>

                        <View style={{ alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '2%', width: '30%' }}>

                            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateDetails')}> */}
                            {/* <Image source={require('../../components/assets/closeBtn.png')} style={{ width: 20, height: 20 }} /> */}
                            {/* </TouchableOpacity> */}
                            <TouchableOpacity style={{ width: 30, height: 30, }} onPress={() => this.props.navigation.navigate('UpdateDetails')}>
                                <Image source={require('../../components/assets/closeBtn.png')} style={{ width: 20, height: 20, }} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <View style={{ margin: "3%", }}>
                    <View style={{ width: '100%', }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '5%', marginBottom: '2%' }}>
                                Address type:
                                </Text>
                            <View style={styles.pickerView}>
                                <Picker mode={'dropdown'}

                                    selectedValue={this.state.addressPicker}
                                    onValueChange={(value) => this.setState({ addressPicker: value })} >
                                    <Picker.Item label="Primary Residental Address" value="Primary Residental Address" />
                                    <Picker.Item label="Home" value="Home" />
                                    <Picker.Item label="Office" value="Office" />
                                </Picker>
                            </View>
                        </View>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '5%', marginBottom: '2%' }}>
                                Address 1:
                                </Text>
                            <TextInput
                                placeholder=' Appartment/Flat No.'
                                selectionColor={colors.primaryColor}
                                style={{ justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
                                onChangeText={(address1) => this.setState({ address1 })}
                                value={this.state.address1}
                            />
                        </View>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '5%', marginBottom: '2%' }}>
                                Address 2:
                                </Text>
                            <TextInput
                                placeholder=' Street Address '
                                selectionColor={colors.primaryColor}
                                style={{ justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
                                onChangeText={(address2) => this.setState({ address2 })}
                                value={this.state.address2}

                            />
                        </View>

                        {/* <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '5%', marginBottom: '2%' }}>
                                Country*
                                </Text>
                            <View style={styles.pickerView}>
                                <Picker mode={'dropdown'}

                                    selectedValue={this.state.PickerCountryVal}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ PickerCountryVal: itemValue })} >
                                    <Picker.Item label="Select Country" value="Select Country" />
                                    <Picker.Item label="3 years" value="3 years" />
                                    <Picker.Item label="Since Inception" value="Since Inception" />
                                </Picker>
                            </View>
                        </View> */}

                        {/* <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '5%', marginBottom: '2%' }}>
                                City*
                                </Text>
                            <View style={styles.pickerView}>
                                <Picker mode={'dropdown'}
                                    selectedValue={this.state.PickerCityVal}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ PickerCityVal: itemValue })} >
                                    <Picker.Item label="Select City" value="Select City" />
                                    <Picker.Item label="3 years" value="3 years" />
                                    <Picker.Item label="Since Inception" value="Since Inception" />
                                </Picker>
                            </View>
                        </View> */}
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '3%', marginBottom: '2%' }}>
                                City:
                                </Text>
                            <TextInput
                                placeholder=' Enter City '
                                selectionColor={colors.primaryColor}
                                style={{ justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
                                onChangeText={(city) => this.setState({ city })}
                                value={this.state.city}

                            />
                        </View>


                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '5%', marginBottom: '2%' }}>
                                Country*:
                                </Text>
                            <TextInput
                                placeholder=' Enter Country '
                                selectionColor={colors.primaryColor}
                                style={{ justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
                                onChangeText={(country) => this.setState({ country })}
                                value={this.state.country}

                            />
                        </View>


                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: '5%', paddingTop: '3%', marginBottom: '2%' }}>
                                Post Code*:
                                </Text>
                            <TextInput
                                placeholder=' Enter Post Code '
                                selectionColor={colors.primaryColor}
                                // keyboardType='numeric'
                                style={{ justifyContent: "center", alignSelf: 'center', height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 8, }}
                                onChangeText={(post_code) => this.setState({ post_code })}
                                value={this.state.post_code}

                            />
                        </View>


                        <View style={{ width: '100%', marginTop: '5%', padding: '2%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'space-between', marginTop: '2%', width: '50%' }}>
                                    <TouchableOpacity style={{
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        backgroundColor: colors.themeColor,
                                        width: '90%',
                                        borderRadius: 8,
                                        minHeight: 50,
                                    }}
                                        onPress={() => this.save()}
                                    >
                                        <Text style={styles.saveText}>Save</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '2%', width: '50%' }}>
                                    <TouchableOpacity style={{
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        backgroundColor: '#ffffff',
                                        width: '90%',
                                        borderRadius: 8,
                                        borderColor: '#9f8b73',
                                        borderWidth: 1.5,
                                        minHeight: 50,
                                    }}
                                        onPress={() => this.props.navigation.navigate('UpdateDetails')}
                                    >
                                        <Text style={styles.cancleText}>Cancel</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
