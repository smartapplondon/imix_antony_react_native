import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ImageBackground
} from "react-native";
import {
    Container,
} from 'native-base';
import styles from "./style";
import * as colors from '../../constants/colors';
import { NavigationActions, StackActions } from 'react-navigation';
import HeaderComponent from '../../components/header/index';
import { ScrollView } from "react-native-gesture-handler";
import * as api from "../../constants/urls";
import * as Service from '../../api/services';
import ImagePicker from 'react-native-image-picker';
export default class UpdateDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            addressList: [],
            pic: '',
        }
    }
    AddAddressNavigation = () => {
        this.props.navigation.navigate('AddAddress', { addressData: null });
    }
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getAddressList();
        });
        console.log('User Data :: ', global.clientData);
        this.setState({
            pic: global.clientData.image
        });

    }

    getAddressList = async () => {
        console.log('Address List called');
        let clientId = global.clientData.id;
        console.log('Url ::', `${api.ADDRESSLIST_URL}${clientId}`);
        let response = await Service.get(`${api.ADDRESSLIST_URL}${clientId}`)
        console.log('Address List response', response);
        if (response.isSuccess) {

            this.setState({
                addressList: response.data
            });
        }
    }





    edit(item) {
        console.log('Address item :: ', item);
        this.props.navigation.navigate('AddAddress', { addressData: item })
    }
    async delete(item) {
        console.log('deleting ::', item);
        let body = {
            deleted_at: new Date()
        };
        let response = await Service.put(`${api.DELETE_ADDRESS_URL}${item.id}`, '', body);
        if (response.isSuccess) {
            this.getAddressList();
        }
    }



    uploadPic = () => {
        ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 200, maxHeight: 200, noData: true }, res => {
            console.log('Response = ', res);
            if (res.didCancel) {
                console.log("User cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                console.log('Image Response ::', res);
                // this.setState({
                //     // profilePic: res,
                //     pic: res.uri
                // });
                this.updateProfilePic(res)
            }
        });
    };

    updateProfilePic = async (file) => {
        console.log('file data :: ', file);
        var formdata = new FormData();
        formdata.append('image', {
            uri: file.uri,
            name: file.fileName,
            type: 'image/jpg'
        });
        let clientId = global.clientData.id;
        let response = await Service.upLoad(`${api.UPLOADIMAGE_URL}${clientId}`, null, formdata);
        console.log('UPLOAD IMAGE response', response);
        if (response.isSuccess) {

            this.setState({
                pic: response.data.image
            });
            global.clientData.image = response.data.image;
        }

    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <HeaderComponent
                        navigation={this.props.navigation}
                        titleText={'Update Details'}>
                    </HeaderComponent>
                    <View style={{ margin: "5%" }}>
                        <TouchableOpacity onPress={this.uploadPic}>
                            <ImageBackground source={require('../../components/assets/uploadimage.png')} style={{ height: 100, width: 100, alignSelf: 'center' }}>
                                <Image
                                    //source={require('../../components/assets/add_pic.png')}
                                    source={{ uri: this.state.pic }}
                                    resizeMode='cover'
                                    style={{ height: 100, width: 100, borderRadius: 75 }} />
                            </ImageBackground>
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Address
                            </Text>
                        </View>

                        {this.state.addressList.map((item, index) =>
                            <View>
                                <View style={{
                                    backgroundColor: "#ececec", width: '100%', borderRadius: 8, marginBottom: '3%', paddingTop: '3%'
                                }}>

                                    <View style={{ flexDirection: 'row', justifyContent: "space-between", }}>
                                        <Text style={{ color: colors.primaryColor, padding: '2%', fontWeight: 'bold', justifyContent: 'flex-start', }}>{item.address_type}</Text>
                                        <View style={{ justifyContent: "space-between", flexDirection: 'row', marginRight: '3%' }}>
                                            <TouchableOpacity onPress={() => this.edit(item)}>
                                                <Image source={require('../../components/assets/edit.png')} style={{ width: 20, height: 20, alignSelf: "center", marginRight: '3%', marginTop: '25%', }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.delete(item)}>
                                                <Image source={require('../../components/assets/delete.png')} style={{ width: 20, height: 20, alignSelf: "center", marginRight: '3%', marginTop: '25%' }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ width: '50%', marginBottom: '3%', padding: '3%', minHeight: 70 }}>
                                        <Text> {item.address1 ? item.address1 : '--'}</Text>
                                        <Text> {item.address2 ? item.address2 : '--'}</Text>
                                        <Text> {item.country ? item.country : '--'}</Text>
                                        <Text> {item.city ? item.city : '--'}</Text>
                                        <Text> {item.post_code ? item.post_code : '--'}</Text>

                                        {/* {item.address2 ? <Text>{item.address2}</Text> : null}
                                        {item.country ? <Text>{item.country}</Text> : null}
                                        {item.city ? <Text>{item.city}</Text> : null}
                                        {item.post_code ? <Text>{item.post_code}</Text> : null} */}

                                    </View>


                                </View>
                            </View>
                        )}
                        {/* <View>

                        </View> */}

                        <View style={styles.SectionStyle}>
                            <TouchableOpacity onPress={() => this.AddAddressNavigation()} >
                                <Image source={require('../../components/assets/forward.png')} style={styles.ImageStyle} />

                            </TouchableOpacity>
                            <TextInput
                                placeholder='Add Address'
                                style={styles.loginTxtInput}
                                selectionColor={colors.primaryColor}
                                placeholderTextColor={colors.primaryColor}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}