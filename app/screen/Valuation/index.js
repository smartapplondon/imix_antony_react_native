import React, { Component } from "react";
import {
    View,
    Text,

    Image,
    TouchableOpacity,
    ImageBackground
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
import CurrencyFormat from 'react-currency-format';
import styles from "./style";
import * as colors from '../../constants/colors';
import Button from '../../components/buttons/buttons'
import { NavigationActions, StackActions } from 'react-navigation';
import HeaderComponent from '../../components/header/index';
import { ScrollView } from "react-native-gesture-handler";
import * as api from "../../constants/urls";
import * as Service from '../../api/services';
import * as utility from "../../utility/index";
import Accordion from "../../components/accordian/index";
export default class Valuation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            accountDetails: null,
            accountValuationData: [],
            grandTotal: {},
            userImage: global.clientData.image,
            show: true

        }
    }

    showHideComponent = () => {
        console.log('inside hideshowwwwwwwwww')
        if (this.state.show) {
            this.setState({ show: false });
        } else {
            this.setState({ show: true });
        }
    };



    profileNavigation = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'profile' })]
            })
        );
        this.props.navigation.navigate('profile');
    }


    componentDidMount() {

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            let accountDetails = global.accountDetail;
            console.log('inside listener :: valuation :: accountDetails : ', accountDetails);
            if (accountDetails) {
                this.setState({
                    accountDetails: accountDetails
                });
                this.accountValuation();
            } else {
                this.setState({
                    accountDetails: null
                });
                this.consolidateValuation();
            }
            this.setState({
                userImage: global.clientData.image
            });
        });
        // console.log('caling consolidateValuation ')

    }



    createNameHeader() {
        console.log('createNameHeader');
        if (this.state.accountDetails) {
            return (<Text style={{ fontSize: 18 }}>{this.state.accountDetails.accountId}-{this.state.accountDetails.accountName}</Text>)
        } else {
            return (<Text style={{ fontSize: 18 }}>{global.clientData.name}</Text>)
        }
    }
    createHeaders() {
        console.log('createHeader')
        if (this.state.accountDetails) {
            return (
                <HeaderComponent
                    navigation={this.props.navigation}
                    titleText={'Account Breakdown'}>
                </HeaderComponent>
            )
        } else {
            return (<Header style={styles.headerStyle}>
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
            </Header>)
        }
    }
    componentWillUnmount() {
        console.log('componentWillUnmount called');
        this.focusListener.remove();
    }

    consolidateValuation = async () => {
        console.log('consolidate Valuation called');
        let clientId = global.clientData.id;
        console.log('Url ::', `${api.CONSOLIDATEVALUATION_URL}${clientId}`);
        let response = await Service.get(`${api.CONSOLIDATEVALUATION_URL}${clientId}`)
        console.log('consolidated Valuation response', response);

        if (response.isSuccess) {
            // let data = [];
            // response.data.map((item, index) => {
            //     let investments = item.investments;
            //     if (investments.length != 0) {
            //         data.push(item);
            //     }
            // });
            let grandTotal = response.data.pop();
            console.log('valuationData :: ', grandTotal);
            console.log('Grand total :: ', grandTotal.grandTotal);

            this.setState({
                accountValuationData: response.data,
                grandTotal: grandTotal.grandTotal
            });
        }
    }

    accountValuation = async () => {
        console.log('account Valuation called');
        let accountId = global.accountDetail.accountId;
        //console.log('Url ::', `${api.ACCOUNTVALUATION_URL}${clientId}`);
        let response = await Service.get(`${api.ACCOUNTVALUATION_URL}${accountId}`)
        console.log('account Valuation response', response);
        if (response.isSuccess) {
            // let data = [];
            // response.data.map((item, index) => {
            //     let investments = item.investments;
            //     if (investments.length != 0) {
            //         data.push(item);
            //     }
            // });
            let grandTotal = response.data.pop();
            this.setState({
                accountValuationData: response.data,
                grandTotal: grandTotal.grandTotal
            });
        }
    }


    render() {
        console.log('valuation :: render called');
        return (
            <Container>

                {this.createHeaders()}
                <ScrollView>
                    <View style={{ margin: '5%' }}>
                        <View style={styles.accountSummaryView}>

                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Valuation
                            </Text>
                            {this.createNameHeader()}
                        </View>
                        {console.log('account valuation from state :: ', this.state.accountValuationData)}
                        {this.state.accountValuationData.map((item, index) =>

                            <View>
                                <Accordion
                                    title={item.investment_type.toUpperCase()}
                                    data={item.investments}
                                    marketTotal={item.marketTotal}
                                    bookTotal={item.bookTotal}
                                    yieldTotal={item.yieldTotal}
                                />

                            </View>
                        )}



                        <View style={{ flexDirection: 'row', alignContent: 'center', backgroundColor: colors.buttonColor, padding: 8, borderRadius: 5, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={{ width: '33%', }}>
                                    <CurrencyFormat
                                        value={this.state.grandTotal.marketGrandTotal}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'£'}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        renderText={value =>
                                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                                {value}
                                            </Text>}
                                    />
                                    {/* <Text style={{ color: '#fff', fontWeight: 'bold' }}>{utility.formatCurrency(this.state.grandTotal.marketGrandTotal)}</Text> */}
                                </View>
                                <View style={{ width: '33%', justifyContent: 'center', alignContent: 'center', }}>
                                    <CurrencyFormat
                                        value={this.state.grandTotal.bookGrandTotal}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'£'}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        renderText={value =>
                                            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                                                {value}
                                            </Text>}
                                    />
                                    {/* <Text style={{ color: '#fff', fontWeight: 'bold' }}>{utility.formatCurrency(this.state.grandTotal.bookGrandTotal)}</Text> */}
                                </View>
                                <View style={{ width: '33%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '5%' }}>
                                    <View style={{}} >
                                        <Text style={{ color: '#fff', fontWeight: 'bold', }}>{this.state.grandTotal.yieldGrandTotal}%</Text>
                                    </View>
                                    <View style={{ backgroundColor: "#3b4f63", borderRadius: 3, }}>
                                        <Text style={{ textAlign: 'center', color: '#fff', }}>Total</Text>
                                    </View>
                                </View>
                            </View>

                        </View>

                    </View>

                </ScrollView>
            </Container >
        );
    }
}

