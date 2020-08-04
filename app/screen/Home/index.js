import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity,

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
import { NavigationActions, StackActions } from 'react-navigation';
import * as api from "../../constants/urls";
import * as Service from '../../api/services'
import * as utility from "../../utility/index";
import CurrencyFormat from 'react-currency-format';

export default class Home extends Component {
    constructor(props) {
        super(props);
        console.log('global client data', global.clientData);

        this.state = {
            isModalVisible: false,
            accountData: [],
            consolidatedAmount: '',
            // userImage: global.clientData.image
        }
    }

    profileNavigation = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'profile' })]
            })
        );
        this.props.navigation.navigate('profile');
    }

    initialBottomNavigation = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'BottomTab' })]
            })
        );
        this.props.navigation.navigate('tab1');
    }

    accountNavigation = (item) => {
        // this.props.navigation.dispatch(
        //     StackActions.reset({
        //         index: 0,
        //         actions: [NavigationActions.navigate({ routeName: 'Performance' })]
        //     })
        // );'
        console.log('item ', item.account_id);
        var data = {
            accountId: item.account_id,
            accountName: item.account_name
        }
        global.accountDetail = data;
        // this.props.navigation.navigate('Performance', { accountDetails: data })
        this.props.navigation.navigate('tab2');
    }



    componentDidMount = async () => {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            global.accountDetail = null;
            this.setState({
                userImage: global.clientData.image
            });
        });
        this.consolidateAccount();
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    consolidateAccount = async () => {
        console.log('consolidate Account called');
        let clientId = global.clientData.id;
        console.log('Url ::', `${api.CONSOLIDATEACCOUNT_URL}${clientId}`);
        let response = await Service.get(`${api.CONSOLIDATEACCOUNT_URL}${clientId}`)
        console.log('consolidated account response', response);
        if (response.isSuccess) {

            let consolidatedAmount = response.data.reduce(function (total, currentValue) {
                return total + currentValue.total_amount;
            }, 0);

            console.log('Consolidated Amount', consolidatedAmount);
            this.setState({
                accountData: response.data,
                consolidatedAmount: consolidatedAmount
            });
        }

    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <Header style={styles.headerStyle}>
                        <Left>
                            <Image source={require('../../components/assets/logo.png')} style={{ width: 180, height: 32 }} />
                        </Left>
                        <Right>
                            <TouchableOpacity onPress={() => this.profileNavigation()}>
                                <ImageBackground source={require('../../components/assets/user.png')} style={{ width: 50, height: 50 }} >
                                    <Image
                                        source={{ uri: this.state.userImage }}
                                        style={{ width: 50, height: 50, borderRadius: 75 }}></Image>
                                </ImageBackground>
                            </TouchableOpacity>
                        </Right>
                    </Header>


                    <View style={{ margin: '5%', }}>
                        <View style={styles.accountSummaryView}>

                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Account Summary
                            </Text>
                            <Text style={{ fontSize: 18 }}>{global.clientData.name}</Text>
                        </View>
                        {this.state.accountData.map((item, index) =>
                            <View style={{
                                marginTop: '5%', backgroundColor: colors.themeColor, borderRadius: 8, paddingLeft: '2%', paddingBottom: '2%', paddingTop: '2%',
                            }}>
                                <View style={{ width: '100%', height: 100, flexDirection: 'row' }}>
                                    <View style={{ width: '80%', }}>
                                        <Text style={{ color: '#fff', fontSize: 18, }}>
                                            {item.account_id}
                                        </Text>
                                        <Text style={{ color: '#fff', marginTop: '2%', fontSize: 18, }}>
                                            {item.account_name}
                                        </Text>
                                        <CurrencyFormat
                                            value={item.total_amount}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'£'}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            renderText={value =>
                                                <Text style={{ textAlign: 'center', marginTop: '5%', color: '#fff', fontWeight: 'bold', fontSize: 22, marginLeft: '20%' }}>
                                                    {value}
                                                </Text>}
                                        />
                                        {/* <Text style={{ textAlign: 'center', marginTop: '5%', color: '#fff', fontWeight: 'bold', fontSize: 22, marginLeft: '30%' }}> */}

                                        {/* {item.total_amount} */}
                                        {/* </Text> */}
                                    </View>
                                    <TouchableOpacity style={{ width: '20%', justifyContent: 'center', }}
                                        onPress={() => this.accountNavigation(item)}
                                    >
                                        <Image source={require('../../components/assets/forwardButton.png')} style={{ height: 83, width: 47, alignSelf: 'flex-end' }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                        }


                        <View style={{ marginTop: '5%' }} >
                            <Text style={{ textAlign: 'center', color: colors.primaryColor, fontSize: 20, fontWeight: 'bold' }}>Consolidated</Text>
                            <CurrencyFormat
                                value={this.state.consolidatedAmount}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'£'}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                renderText={value =>
                                    <Text style={{ textAlign: 'center', color: colors.primaryColor, fontSize: 22, fontWeight: 'bold' }}>
                                        {value}
                                    </Text>}
                            />
                        </View>

                    </View>

                </ScrollView>
            </Container>
        );
    }
}
