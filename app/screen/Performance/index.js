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
    Right,
    Container,
   Picker,
} from 'native-base';
import styles from "./style";
import { BarChart, Grid, LineChart, YAxis, contentInset, XAxis, Path } from 'react-native-svg-charts'
import * as colors from '../../constants/colors';
import { NavigationActions, StackActions } from 'react-navigation';
import HeaderComponent from '../../components/header/index';
import { ScrollView } from "react-native-gesture-handler";
import * as api from "../../constants/urls";
import * as Service from '../../api/services'
import moment from "moment";
import { map, groupBy } from 'underscore';
import CurrencyFormat from 'react-currency-format';
import Loader from '../../components/Loader/index';

export default class Performance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            // OpeningValue: "£1,561,548.00",
            // CapitalAdditions: "£0.00",
            // CapitalWithdrawals: "£18,000.00",
            // ClosingValue: "£1,648,077.08",
            // Percentage: "6.72%",
            PickerSelectedVal: '',
            accountDetails: {},
            consolidatedPerformanceDetails: {},
            userImage: global.clientData.image,
            xAxisData: [],
            yAxisData: [],
            barData: [],
            lineXAxisData: [],
            lineYAxisData: [0, 8],
            lineData: [],
            chartDates: {},
            searchBy: 'YTD',
            inceptionDate: '',
            openingValueDate: ''
            //  [Math.random() * 100,
            // Math.random() * 100,
            // Math.random() * 100,
            // Math.random() * 100,
            // Math.random() * 100,
            // Math.random() * 100]
        }
    }

    componentDidMount() {

        this.focusListener = this.props.navigation.addListener('didFocus', async () => {
            let accountDetails = global.accountDetail;
            console.log('inside listener :: Performance :: accountDetails : ', accountDetails);
            if (accountDetails) {
                this.setState({
                    accountDetails: accountDetails
                });
                console.log('performance is called ///////')
                await this.accountPerformance('YTD');
            } else {
                this.setState({
                    accountDetails: null
                });
                console.log('performance is called ....')
                await this.consolidatePerformance('YTD');
            }
            this.setState({
                userImage: global.clientData.image
            });
            console.log('############Focus listener scope ends here');
            console.log('calling consolidated Assets function:::################3');
            this.consolidateAssets('YTD');
        });


    }

    searchBy = async (searchBy) => {
        console.log('SEARCH BY', searchBy)
        this.setState({
            searchBy: searchBy
        })
        if (this.state.accountDetails) {
            await this.accountPerformance(searchBy);
        } else {
            await this.consolidatePerformance(searchBy)
        }
        await this.consolidateAssets(searchBy);
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

    accountPerformance = async (searchBy) => {
        this.setState({
            isLoading: true
        })
        console.log('account performance called');
        let accountId = global.accountDetail.accountId;
        console.log('Url ::', `${api.ACCOUNTVALUATION_URL}id=${accountId}&searchBy=${searchBy}`);
        let response = await Service.get(`${api.ACCOUNTPERFORMANCE_URL}id=${accountId}&searchBy=${searchBy}`)
        console.log('account performance response.....................', response);
        if (response.isSuccess) {
            this.consolidateData(response);
            this.getOpeningDate(response.data);
            this.getDataForLineChart(response.data);
            this.setState({
                openingValueDate: this.getOpeningValue('DD/MM/YY'),
                isLoading: false
            });
        }
    }

    consolidatePerformance = async (searchBy) => {
        console.log('consolidate Performance called');
        this.setState({
            isLoading: true
        })
        let clientId = global.clientData.id;
        console.log('Url ::', `${api.CONSOLIDATEPERFORMANCE_URL}id=${clientId}&searchBy=${searchBy}`);
        let response = await Service.get(`${api.CONSOLIDATEPERFORMANCE_URL}id=${clientId}&searchBy=${searchBy}`)
        console.log('consolidated Performance response', response);
        if (response.isSuccess) {
            this.consolidateData(response);
            await this.getOpeningDate(response.data);
            console.log('Inception Date #### ::', this.state.inceptionDate);
            this.getDataForLineChart(response.data);
            this.setState({
                openingValueDate: this.getOpeningValue('DD/MM/YY'),
                isLoading: false
            });
        }
    }

    roundOff(number) {
        return Math.round((number + Number.EPSILON) * 100) / 100;
    }

    consolidateData(response) {
        if (response.data != null && response.data.length > 0) {
            let consolidatedData = response.data.reduce((a, b) => ({
                capital_addition: this.roundOff(a.capital_addition + b.capital_addition),
                // capital_addition: this.roundOff(8.678567),
                capital_withdraw: this.roundOff(a.capital_withdraw + b.capital_withdraw)
            }
            ));


            consolidatedData.opening_value = response.data[0].opening_value;
            consolidatedData.opening_transaction_date = this.getFormatedDate();
            // consolidatedData.opening_transaction_date = this.getFormatedDate(response.data[0].transaction_date);
            // consolidatedData.closing_value = response.data[response.data.length - 1].opening_value;
            consolidatedData.closing_value = this.getClosingValue(response.data);
            consolidatedData.closing_transaction_date = this.getFormatedDate(response.data[response.data.length - 1].transaction_date);
            consolidatedData.gain_loss = response.data[response.data.length - 1].gain_loss;

            this.setState({
                consolidatedPerformanceDetails: consolidatedData
            });
        }
    }

    getClosingValue(data) {
        let closingValue = 0;
        data.map((item, index) => {
            if (index == 0) {
                closingValue = item.opening_value + item.capital_addition - item.capital_withdraw;
            } else {
                closingValue = closingValue + item.capital_addition - item.capital_withdraw;
            }

        });
        return closingValue;
    }

    async getDatesForChart() {
        let beginDate = await this.getOpeningValue('DD MMM YYYY');
        console.log('Begin Date :::: ', beginDate);
        let dates = {
            beginDate: beginDate,
            endDate: moment(new Date()).format('DD MMM YYYY')
        }
        return dates;
    }

    getOpeningValue(format) {
        return this.state.openingDate.format(format);
    }

    async getOpeningDate(data) {
        data.sort(function (a, b) {
            return new Date(a.transaction_date) - new Date(b.transaction_date);
        });

        console.log('Sorted DATa :: ', data);
        let openingDate = data[0].transaction_date;
        console.log('opening Date :: ', openingDate);
        await this.setState({
            openingDate: moment(openingDate).startOf('year')
        });

        console.log('opening Date from State:: ', this.state.openingDate)
    }
    getCurrentDate() {

        let date = new Date();
        console.log('Current Date..........................................', moment(date).format('DD MMM YYYY'))
        return moment(date).format('DD/MM/YY');

    }

    getFormatedDate(date) {
        console.log('Date before Format :: ', date);
        // var options = { year: '2-digit', month: 'numeric', day: 'numeric' };
        // var formattedDate = new Date(date);
        return moment(date).format('DD/MM/YY');
        // return formattedDate.toLocaleDateString("en-GB", options);
    }

    consolidateAssets = async (searchBy) => {
        console.log('searchBy consolidate assets called ///////////////////////////', searchBy);
        let clientId = global.clientData.id;
        console.log('Url ::', `${api.CONSOLIDATEASSETS_URL}id=${clientId}&searchBy=${searchBy}`);
        let response = await Service.get(`${api.CONSOLIDATEASSETS_URL}id=${clientId}&searchBy=${searchBy}`)
        console.log('consolidated assets response......................................', response);
        if (response.isSuccess) {
            this.getDataForChart(response.data.assets);
        }
    }



    getDataForLineChart(responseData) {
        let lineXAxisData = [];
        let lineData = [];
        let data = this.processDataForCharts(responseData);
        console.log('Processed Data :: ', data);
        data.forEach(item => {
            lineXAxisData.push(item.month);
            lineData.push(this.getNetGainLoss(item.data));
        });

        console.log('Line chart X Axis Data :: ', lineXAxisData);
        console.log('Line Data :: ', lineData);
        this.setState({
            lineXAxisData: lineXAxisData,
            lineData: lineData
        });

    }

    getNetGainLoss(data) {
        console.log('calculating net Gain loss on data:: ', data);
        let netGainLoss = 0;
        if (data.length > 1) {
            netGainLoss = data[data.length - 1].gain_loss - data[0].gain_loss;
        } else {
            netGainLoss = data[0].gain_loss
        }
        console.log('Net Gain/ Loss :: ', netGainLoss);
        return netGainLoss;
    }

    processDataForCharts(data) {
        data.sort(this.sortByDate);
        console.log('Sorted Data :: ', data);
        let groupsByMonth = groupBy(data, function (item) {
            return moment(item.transaction_date).startOf('month').format('MMM');
        });
        console.log('groups by month :: ', groupsByMonth);

        let result = map(groupsByMonth, function (group, month) {
            return {
                month: month,
                data: group
            }
        });
        console.log('mapped result :: ', result);
        return result;
    }

    sortByDate(a, b) {
        var dateA = new Date(a.transaction_date).getTime();
        var dateB = new Date(b.transaction_date).getTime();
        return dateA > dateB ? 1 : -1;
    }

    async getDataForChart(data) {
        let xAxisData = [];
        let holdingsData = [];
        let holdingsTodayData = [];
        let yAxisData = [0, 5, 10, 15, 20, 25];
        console.log('Data for performance :::: ', data);

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
        console.log('Data after setting in state ##############');
        console.log('Yaxis :: ', this.state.yAxisData);
        console.log('Xaxis :: ', this.state.xAxisData);
        console.log('Bar :: ', this.state.barData);
        console.log('chart Dates :: ', this.state.chartDates);
    }

    render() {
        return (
            <Container>
                <Loader isLoading={this.state.isLoading}></Loader>
                {this.createHeaders()}
                <ScrollView>
                    <View style={{ margin: '5%' }}>
                        <View style={styles.performanceSummaryView}>

                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Performance
                            </Text>
                            {this.createNameHeader()}
                        </View>

                        <View style={styles.pickerView}>
                            <Picker mode={'dropdown'}

                                selectedValue={this.state.searchBy}
                                onValueChange={(itemValue) => this.searchBy(itemValue)}
                            >
                                <Picker.Item label="Year to date" value="YTD" />
                                <Picker.Item label="3 years" value="3Years" />
                                <Picker.Item label="Since Inception" value="SinceInception" />
                            </Picker>
                        </View>

                        <View style={styles.mainHeading}>

                            <Text style={styles.changePeriodTxt}>Performance Summary</Text>

                        </View>

                        <View style={{ width: '100%', backgroundColor: '#ececec', borderRadius: 10, marginTop: '5%', padding: '2%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'space-between', marginTop: '2%', width: '70%' }}>

                                    {/* <Text style={{ fontSize: 14 }}>Opening value at {this.state.consolidatedPerformanceDetails.opening_transaction_date}:</Text> */}
                                    <Text style={{ fontSize: 14 }}>Opening value at {this.state.openingValueDate}:</Text>

                                    <Text style={{ fontSize: 14 }}>Capital Additions:</Text>
                                    <Text style={{ fontSize: 14 }}>Capital Withdrawals:</Text>
                                    {/* <Text style={{ fontSize: 14 }}>Closing Value as at {this.state.consolidatedPerformanceDetails.closing_transaction_date}:</Text> */}
                                    <Text style={{ fontSize: 14 }}>Closing Value as at {this.getCurrentDate()}:</Text>

                                    <Text style={{ fontSize: 14, fontWeight: 'bold', borderTopWidth: 1, marginTop: '5%', width: '145%', borderColor: '#cac6c6', color: colors.primaryColor }}>Percentage Gain/(Loss) in period:</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '2%', width: '30%' }}>
                                    <CurrencyFormat
                                        value={this.state.consolidatedPerformanceDetails.opening_value}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'£'}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        renderText={value =>
                                            <Text style={{ fontSize: 14 }}>
                                                {value}
                                            </Text>}
                                    />

                                    <CurrencyFormat
                                        value={this.state.consolidatedPerformanceDetails.capital_addition}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'£'}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        renderText={value =>
                                            <Text style={{ fontSize: 14 }}>
                                                {value}
                                            </Text>}
                                    />

                                    <CurrencyFormat
                                        value={this.state.consolidatedPerformanceDetails.capital_withdraw}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'£'}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        renderText={value =>
                                            <Text style={{ fontSize: 14 }}>
                                                {value}
                                            </Text>}
                                    />
                                    <CurrencyFormat
                                        value={this.state.consolidatedPerformanceDetails.closing_value}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'£'}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        renderText={value =>
                                            <Text style={{ fontSize: 14 }}>
                                                {value}
                                            </Text>}
                                    />
                                    <CurrencyFormat
                                        value={this.state.consolidatedPerformanceDetails.gain_loss}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        // prefix={'£'}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        renderText={value =>
                                            <Text style={{ fontSize: 14 }}>
                                                {value}%
                                            </Text>}
                                    />
                                    {/* <Text style={{ fontSize: 14 }}>{utility.formatCurrency(this.state.consolidatedPerformanceDetails.opening_value)}</Text> */}
                                    {/* <Text style={{ fontSize: 14 }}>{utility.formatCurrency(this.state.consolidatedPerformanceDetails.capital_addition)}</Text> */}
                                    {/* <Text style={{ fontSize: 14 }}>{utility.formatCurrency(this.state.consolidatedPerformanceDetails.capital_withdraw)}</Text> */}
                                    {/* <Text style={{ fontSize: 14 }}>{utility.formatCurrency(this.state.consolidatedPerformanceDetails.closing_value)}</Text> */}
                                    {/* <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: '5%', color: colors.primaryColor }}>{this.state.consolidatedPerformanceDetails.gain_loss}%</Text> */}
                                </View>


                            </View>
                        </View>

                        {/* LineChart */}
                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                <View style={{ justifyContent: 'center', marginRight: 10, alignContent: 'center' }}><Text>%</Text></View>
                                <YAxis
                                    data={this.state.lineYAxisData}
                                    svg={{
                                        fill: 'black',
                                    }}
                                    numberOfTicks={4}
                                    formatLabel={value => `${value}`}
                                    contentInset={{ top: 10, bottom: 5, }}
                                />
                                <LineChart
                                    style={{ height: 200, width: '90%', alignSelf: 'center' }}
                                    data={this.state.lineData}
                                    svg={{ stroke: '#9f8b73' }}
                                    contentInset={{ top: 10, bottom: 0, right: 0, left: 0 }}
                                    showGrid={true}
                                    numberOfTicks={4}
                                >
                                    <Grid />
                                </LineChart>

                            </View>
                            <XAxis
                                style={{ marginTop: '5%' }}
                                data={this.state.lineXAxisData}
                                formatLabel={index => {
                                    return this.state.lineXAxisData[index]
                                }

                                }
                                contentInset={{ left: 60, right: 40 }}
                                svg={{ fontSize: 9, fill: 'black' }}
                                gridMin={0}
                            // contentInset={{ right: 50, left: 50 }}

                            />
                        </View>
                        {/* Linechart End  */}
                        <View style={{ flexDirection: 'row', marginTop: '5%', marginBottom: '3%' }}>
                            <View style={{ justifyContent: 'space-between', marginTop: '5%', width: '60%', }}>
                                <Text style={{ fontSize: 14, color: colors.primaryColor }}>Assets Class Performance</Text>
                            </View>
                            <View style={{ flexDirection: 'column', marginTop: '2%', width: '40%', marginLeft: '5%' }}>
                                <View style={{ flex: 1, flexDirection: 'row', paddingTop: '5%' }}>
                                    <View style={{ height: 10, width: 30, backgroundColor: '#195782' }}></View>
                                    <Text style={{ fontSize: 10, marginLeft: '10%' }}>{this.state.chartDates.beginDate}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingTop: '5%' }}>
                                    <View style={{ height: 10, width: 30, backgroundColor: '#9f8b73' }}></View>
                                    <Text style={{ fontSize: 10, marginLeft: '10%' }}>{this.state.chartDates.endDate}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Bar Chart */}

                        <View >
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
                                    // spacingOuter={0.5}
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
                                contentInset={{ left: 70, right: 30 }}
                                svg={{ fontSize: 9, fill: 'black' }}
                            // contentInset={{ right: 50, left: 50 }}

                            />
                        </View>


                    </View>
                </ScrollView>
            </Container >
        )
    }
}
