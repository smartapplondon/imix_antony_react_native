
import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,


} from "react-native";
import {
    Header,
    Left,
    Right,
    Container,
    Picker,

} from 'native-base';
import moment from "moment";
import styles from "./style";
import { BarChart, Grid, LineChart, YAxis, contentInset, XAxis, Path } from 'react-native-svg-charts'
import { NavigationActions, StackActions } from 'react-navigation';
import { ScrollView } from "react-native-gesture-handler";
import HeaderComponent from '../../components/header/index';
import * as api from "../../constants/urls";
import * as Service from '../../api/services';
import CurrencyFormat from 'react-currency-format';
import Loader from '../../components/Loader/index';

export default class AssetAllocationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            accountDetails: {},
            accountAssetData: [],
            xAxisData: [],
            yAxisData: [],
            barData: [],
            holdingTotal: null,
            marketValueTotal: 0,
            userImage: global.clientData.image,
            chartDates: {},
            searchBy: 'YTD',
            inceptionDate: '',
        }
    }

    componentDidMount() {
        this.setState({
            searchBy: 'YTD'
        });
        this.focusListener = this.props.navigation.addListener('didFocus', async () => {
            let accountDetails = global.accountDetail;
            console.log('inside listener :: Performance :: accountDetails : ', accountDetails);
            if (accountDetails) {
                this.setState({
                    accountDetails: accountDetails
                });
                console.log('acount  assets called in lifecycle');
                await this.accountAssets('YTD');
            } else {
                this.setState({
                    accountDetails: null
                });
                console.log('consolidated assets called in lifecycle');
                await this.consolidateAssets('YTD')
            }
            this.setState({
                userImage: global.clientData.image
            });
        });

    }

    async getInceptionDate(data) {
        console.log('Getting inception Date for data :: ', data);
        let investments = [];
        data.map((item, index) => {
            investments = investments.concat(item.investments);
        });
        investments.sort(function (a, b) {
            return new Date(a.investment_date) - new Date(b.investment_date);
        });
        console.log('Sorted investments Data :: ', investments);

        let inceptionDate = this.state.searchBy === '3Years' ? moment().subtract(3,'years') : investments[0].investment_date;
        
        console.log('inception DATE :: ', inceptionDate);
        await this.setState({
            inceptionDate: moment(inceptionDate).startOf('year').format('DD MMM YYYY')
        });
    }

    searchBy = async (searchBy) => {
        console.log('SEARCH BY', searchBy)
        this.setState({
            searchBy: searchBy
        })
        if (this.state.accountDetails) {

            this.accountAssets(searchBy);
        } else {

            this.consolidateAssets(searchBy)
        }
    }

    consolidateAssets = async (searchBy) => {
        console.log('consolidate assets called');
        this.setState({
            isLoading: true
        })
        let clientId = global.clientData.id;
        console.log('Url ::', `${api.CONSOLIDATEASSETS_URL}id=${clientId}&searchBy=${searchBy}`);
        let response = await Service.get(`${api.CONSOLIDATEASSETS_URL}id=${clientId}&searchBy=${searchBy}`)
        console.log('consolidated assets response', response);
        if (response.isSuccess) {
            await this.getInceptionDate(response.data.assets);
            this.getDataForChart(response.data.assets);
            this.setState({
                accountAssetData: response.data.assets,
                holdingTotal: response.data.holdingTotal,
                marketValueTotal: response.data.marketValueTotal,
                isLoading: false
            });
        }
    }

    accountAssets = async (searchBy) => {
        console.log('account Assets called');
        this.setState({
            isLoading: true
        })
        let accountId = global.accountDetail.accountId;
        //console.log('Url ::', `${api.ACCOUNTVALUATION_URL}${clientId}`);
        let response = await Service.get(`${api.ACCOUNTASSETS_URL}id=${accountId}&searchBy=${searchBy}`)
        console.log('account Assets response', response);
        if (response.isSuccess) {
            await this.getInceptionDate(response.data.assets);
            this.getDataForChart(response.data.assets);
            console.log('holdingTotal', response.data.holdingTotal);
            console.log('marketValueTotal', response.data.marketValueTotal);

            this.setState({
                accountAssetData: response.data.assets,
                holdingTotal: (response.data.holdingTotal).toFixed(2),
                marketValueTotal: response.data.marketValueTotal,
                isLoading: false
            });
        }
    }

    async getDataForChart(data) {
        let xAxisData = [];
        let holdingsData = [];
        let holdingsTodayData = [];
        let yAxisData = [0, 5, 10, 15, 20, 25];
        data.forEach(item => {
            xAxisData.push(item.name);
            holdingsData.push(item.holding);
            holdingsTodayData.push(item.holding_today);
        });
        console.log('xAxisData :: ', xAxisData);
        console.log('holdings :: ', holdingsData);
        console.log('holdings_today :: ', holdingsTodayData);
        let barData = [
            {
                data: holdingsData.map((value) => ({ value })),
                svg: {
                    fill: '#195782',
                    x: -2
                    // paddingRight: '10%'

                },
            },
            {
                data: holdingsTodayData.map((value) => ({ value })),
                svg: {
                    fill: '#9f8b73',
                    // paddingRight: 10
                },
            },
        ]
        console.log('Bar Data :: ', barData);
        await this.setState({
            yAxisData: yAxisData,
            barData: barData,
            xAxisData: xAxisData,
            chartDates: await this.getDatesForChart()
        })

        console.log('Chart Dates from state ::: ', this.state.chartDates);
    }

    calculateMarketValue(investments) {
        let total = 0;
        investments.forEach((item, index) => {
            total = total + item.market_value;
        });
        return total;
    }
    calculateHoldingPercent(investments, totalValue) {
        return this.roundOff((this.calculateMarketValue(investments) / totalValue) * 100)
    }
    roundOff(number) {
        // console.log('Number to Round', number);
        let dec = number.toString().split(".");
        // console.log('decimal :: ', dec);
        if (dec.length == 1 || dec.length < 3) {
            // console.log('Number after round off', Number(number).toFixed(2));
            return number = Number(number).toFixed(2);
        }
        // console.log('Number before Round', number);
        //  console.log('Number after round off', Math.round((Number(number) + Number.EPSILON) * 100) / 100);
        return Math.round((Number(number) + Number.EPSILON) * 100) / 100;
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

    profileNavigation = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'profile' })]
            })
        );
        this.props.navigation.navigate('profile');
    }


    getDatesForChart() {
        console.log('getDatesForChart :: beginDate',this.state.inceptionDate)
        let beginDate = this.state.inceptionDate;
        let dates = {
            beginDate: beginDate,
            endDate: moment(new Date()).format('DD MMM YYYY')
        }
       
        return dates;
    }

    render() {

        return (
            <Container>
                <Loader isLoading={this.state.isLoading}></Loader>
                {this.createHeaders()}
                <ScrollView>
                    <View style={{ margin: '5%' }}>
                        <View style={styles.accountSummaryView}>

                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Asset Allocation
                            </Text>
                            {this.createNameHeader()}
                        </View>

                        <View style={styles.pickerView}>
                            <Picker mode={'dropdown'}
                                selectedValue={this.state.searchBy}
                                onValueChange={(itemValue) => this.searchBy(itemValue)} >
                                <Picker.Item label="Year to date" value="YTD" />
                                <Picker.Item label="3 years" value="3Years" />
                                <Picker.Item label="Since Inception" value="SinceInception" />
                            </Picker>
                        </View>

                        <View style={styles.mainHeading}>

                            <Text style={styles.changePeriodTxt}>Change in Period</Text>

                        </View>

                        <View style={styles.mainView}>

                            {/* loop start */}
                            <View style={{ width: '100%', }}>
                                {this.state.accountAssetData.map((item, key) =>
                                    <View style={styles.dataCardView}>

                                        <View style={styles.HeadingView}>
                                            <Text style={styles.investmentTypeTitle}>{item.name.toUpperCase()}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '3%', paddingRight: '3%', paddingTop: '3%' }}>
                                            <View style={{ alignItems: 'flex-end', }}>
                                                <Text style={styles.font1}>Market Value</Text>
                                                <CurrencyFormat
                                                    value={this.calculateMarketValue(item.investments)}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'£'}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}
                                                    renderText={value =>
                                                        <Text style={styles.font2}>
                                                            {value}
                                                        </Text>}
                                                />
                                                {/* <Text style={styles.font2}>{utility.formatCurrency(this.calculateMarketValue(item.investments))}</Text> */}
                                                <Text style={styles.font1}>% Holding</Text>
                                                <Text style={styles.font2}>{item.holding}%</Text>
                                            </View>
                                            <View style={{ alignItems: 'flex-end', }}>
                                                <Text style={styles.font1}>% Holding Today</Text>
                                                <Text style={styles.font2}>{this.calculateHoldingPercent(item.investments, this.state.marketValueTotal)}%</Text>
                                                <Text style={styles.font1}>Change</Text>
                                                <Text style={styles.font2}>{this.roundOff(item.changes)}%</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>

                            <View style={{ paddingLeft: '3%', paddingRight: '3%', borderTopWidth: 1, borderTopColor: '#a79999' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', }}>
                                    <Text style={{ fontSize: 16, }}>Market Value</Text>

                                    {console.log('Markte value at format :: ', this.state.marketValueTotal)}
                                    <CurrencyFormat
                                        value={this.state.marketValueTotal}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'£'}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        renderText={value =>
                                            <Text style={{ fontSize: 16, }}>
                                                {value ? value : '--'}
                                            </Text>}
                                    />
                                    {/* <Text style={{ fontSize: 16, }}>{utility.formatCurrency(this.state.marketValueTotal)}</Text> */}
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', }}>
                                    <Text style={{ fontSize: 16 }}>% Holding</Text>
                                    <Text style={{ fontSize: 16, }}>{this.state.holdingTotal}%</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', marginTop: 20 }}>

                            <View style={{ flex: 1, flexDirection: 'column', marginTop: 20, width: '100%', height: '100%' }}>

                            </View>

                        </View>

                    </View>

                    {/* legends start */}
                    <View style={{ marginBottom: '3%', paddingRight: '5%' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
                            <View style={{ height: 10, width: 30, backgroundColor: '#195782', marginTop: 7, marginRight: '2%', }}></View>
                            <Text style={{ fontSize: 12, marginTop: 3, }}>{" "}{this.state.chartDates.beginDate}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
                            <View style={{ height: 10, width: 30, backgroundColor: '#9f8b73', marginTop: 7, marginRight: '2%', }}></View>
                            <Text style={{ fontSize: 12, marginTop: 3 }}>{" "}{this.state.chartDates.endDate}</Text>
                        </View>
                    </View>

                    {/* legend end */}

                    {/* Bar chart Start */}
                    <View >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                            <View style={{ justifyContent: 'center', marginRight: 10, alignContent: 'center' }}><Text>%</Text></View>

                            <YAxis
                                data={this.state.yAxisData}
                                // style={{ height: 250, backgroundColor: 'red' }}
                                // contentInset={verticalContentInset}
                                svg={{ fill: 'black' }}
                                numberOfTicks={5}
                                formatLabel={value => `${value}`}
                                contentInset={{ top: 10, bottom: 5, }}

                            />
                            <BarChart
                                yAccessor={({ item }) => item.value}

                                style={{ height: 250, width: '80%', }}
                                data={this.state.barData}
                                spacingInner={0.4}
                                // spacingOuter={0.2}
                                spacing={0.2}
                                gridMin={0}
                                // svg={{ fill: 'green' }}
                                contentInset={{ top: 10, bottom: 0, right: 0, left: 0 }}
                            >

                                <Grid />
                            </BarChart>
                        </View>
                        <XAxis
                            style={{ marginTop: '5%' }}
                            data={this.state.xAxisData}
                            formatLabel={index => {
                                return this.state.xAxisData[index]
                            }

                            }
                            contentInset={{ left: 80, right: 40 }}
                            svg={{ fontSize: 9, fill: 'black' }}
                        // contentInset={{ right: 50, left: 50 }}

                        />


                    </View>




                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingLeft: 10, paddingRight: 27 }}>

                        <Text style={{ fontSize: 10 }}>Fixed Interst</Text>
                        <Text style={{ fontSize: 10 }}>Equality</Text>
                        <Text style={{ fontSize: 10 }}>Alternatives</Text>
                        <Text style={{ fontSize: 10 }}>constructor</Text>
                        <Text style={{ fontSize: 10 }}>cash</Text>
                    </View> */}
                </ScrollView>
            </Container >
        )
    }
}