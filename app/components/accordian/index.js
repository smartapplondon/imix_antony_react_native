import React, { Component } from "react";
import * as colors from '../../constants/colors'
import {
    View,
    Text,
    TouchableOpacity,
    Image

} from "react-native";
import styles from "./style";
import * as utility from "../../utility/index";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CurrencyFormat from 'react-currency-format';

export default class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded: false,
        }
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }
    render() {
        const outerTotal = (
            <View style={styles.dataView}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <View style={{ width: '33%', flexDirection: 'row', justifyContent: 'flex-start', }}>
                        <Text>Market Value</Text>
                    </View>
                    <View style={{ width: '33%', justifyContent: 'center', alignContent: 'center', }}>
                        <Text style={{ textAlign: 'center' }}>Book Cost</Text>
                    </View>
                    <View style={{ width: '33%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', }}>
                        <Text style={{ textAlign: 'right' }}>Yield(Projected)</Text>
                    </View>
                </View>

                <View
                    style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 3,
                        marginTop: '3%'
                    }}
                />


                <View style={{ flexDirection: 'row', alignContent: 'center', }}>
                    < View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View style={{ width: '33%', }}>
                            <CurrencyFormat
                                value={this.props.marketTotal}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'£'}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                renderText={value =>
                                    <Text style={{ color: colors.primaryColor, fontWeight: 'bold' }}>
                                        {value ? value : "-"}
                                    </Text>}
                            />
                            {/* <Text >{utility.formatCurrency(this.props.marketTotal ? this.props.marketTotal : '--')}</Text> */}
                        </View>
                        <View style={{ width: '33%', }}>
                            <CurrencyFormat
                                value={this.props.bookTotal}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'£'}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                renderText={value =>
                                    <Text style={{ color: colors.primaryColor, fontWeight: 'bold', textAlign: 'center' }}>
                                        {value ? value : "-"}
                                    </Text>}
                            />
                            {/* <Text >{utility.formatCurrency(this.props.bookTotal ? this.props.bookTotal : '--')}</Text> */}
                        </View>
                        <View style={{ width: '33%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View style={{}}>
                                <Text style={{ color: this.props.yieldTotal < 0 ? 'red' : colors.primaryColor, fontWeight: 'bold' }}>{this.props.yieldTotal ? this.props.yieldTotal : '--'}%</Text>
                            </View>
                            <View style={{}} >
                                <Text style={{ textAlign: 'center', paddingLeft: '1%', }}>Total</Text>
                            </View>
                        </View>
                    </View>


                </View>
            </View>
        )

        return (
            <View>
                <View style={styles.HeadingView}>
                    <View>
                        <Text style={{ color: '#FFF', fontSize: 18, }}>{this.props.title}</Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => this.toggleExpand()}>
                            <Image source={require('../../components/assets/down.png')} style={[this.state.expanded ? styles.rotateToggleIcon : styles.toggleIcon]} />
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    this.state.expanded ?
                        (<View style={styles.dataView}>
                            <View style={{ width: '100%', }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <View style={{ width: '30%', }}>
                                        <Text style={{ textAlign: 'right' }}>Market Value</Text>
                                    </View>
                                    <View style={{ width: '33%', paddingRight: '5%' }}>
                                        <Text style={{ textAlign: 'right', }}>Book Cost</Text>
                                    </View>
                                    <View style={{ width: '33%', }}>
                                        <Text style={{ textAlign: 'right', }}>Yield(Projected)</Text>
                                    </View>
                                    {/* <View style={{ width: '7%' }}>
                                        <Text>{""}</Text>
                                    </View> */}
                                </View>
                                {/* loop2 start */}
                                {console.log('investments in item :: ', this.props.data)}
                                {this.props.data.map((investment, investmentId) =>
                                    <View>

                                        <View>

                                            <Text style={{ fontSize: 14, color: colors.primaryColor, marginTop: '2%', fontWeight: 'bold' }}>
                                                {investment.investment_in}
                                            </Text>


                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", }}>
                                                <View style={{ width: '30%', }}>
                                                    <CurrencyFormat
                                                        value={investment.market_value}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        prefix={'£'}
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                        renderText={value =>
                                                            <Text style={{ textAlign: 'right' }}>
                                                                {value ? value : "-"}
                                                            </Text>}
                                                    />
                                                    {/* <Text >{utility.formatCurrency(investment.market_value ? investment.market_value : "-")}</Text> */}
                                                </View>
                                                <View style={{ width: '30%', }}>
                                                    <CurrencyFormat
                                                        value={investment.book_cost}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        prefix={'£'}
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                        renderText={value =>
                                                            <Text style={{ textAlign: 'right' }}>
                                                                {value ? value : "-"}
                                                            </Text>}
                                                    />
                                                    {/* <Text>{utility.formatCurrency(investment.book_cost ? investment.book_cost : "-")}</Text> */}
                                                </View>
                                                <View style={{ width: '33%', paddingRight: '3%' }}>
                                                    <CurrencyFormat
                                                        value={investment.projected_yield}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        // prefix={'£'}
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                        renderText={value =>
                                                            <Text style={{ textAlign: 'right' }}>
                                                                {value ? value : "-"}%
                                                            </Text>}
                                                    />

                                                    {/* <Text>{investment.projected_yield ? investment.projected_yield : "-"}%</Text> */}
                                                </View>
                                                <View style={{ width: '7%' }}>
                                                    <Text>{""}</Text>
                                                </View>
                                            </View>

                                        </View>
                                        <View
                                            style={{
                                                borderBottomColor: 'gray',
                                                borderBottomWidth: 1,
                                            }}
                                        />
                                    </View>
                                )}
                                {/* loop2 end */}

                                <View
                                    style={{
                                        borderBottomColor: 'gray',
                                        borderBottomWidth: 3,
                                        marginTop: '3%'
                                    }}
                                />

                                {/* <View style={{ flexDirection: 'row', alignContent: 'center', }}> */}
                                < View style={{ flexDirection: 'row', }}>
                                    <View style={{ width: '30%', }}>
                                        <CurrencyFormat
                                            value={this.props.marketTotal}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'£'}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            renderText={value =>
                                                <Text style={{ color: colors.primaryColor, fontWeight: 'bold', textAlign: 'right' }}>
                                                    {value ? value : "-"}
                                                </Text>}
                                        />
                                        {/* <Text >{utility.formatCurrency(this.props.marketTotal ? this.props.marketTotal : '--')}</Text> */}
                                    </View>
                                    <View style={{ width: '30%', }}>
                                        <CurrencyFormat
                                            value={this.props.bookTotal}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'£'}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            renderText={value =>
                                                <Text style={{ color: colors.primaryColor, fontWeight: 'bold', textAlign: 'right' }}>
                                                    {value ? value : "-"}
                                                </Text>}
                                        />
                                        {/* <Text >{utility.formatCurrency(this.props.bookTotal ? this.props.bookTotal : '--')}</Text> */}
                                    </View>
                                    <View style={{ width: '29%', }}>
                                        {/* <View style={{}}> */}
                                        <Text style={{ color: this.props.yieldTotal < 0 ? 'red' : colors.primaryColor, fontWeight: 'bold', textAlign: 'right' }}>{this.props.yieldTotal ? this.props.yieldTotal : '--'}%</Text>
                                        {/* </View> */}
                                        {/* <View style={{ alignContent: 'flex-end', backgroundColor: 'blue' }} > */}

                                        {/* </View> */}
                                    </View>
                                    <View style={{ width: '11%', }}>
                                        <Text style={{}}>Total</Text>
                                    </View>

                                </View>


                                {/* </View> */}
                            </View>

                        </View>) : (
                            <View style={styles.dataView}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <View style={{ width: '33%', flexDirection: 'row', justifyContent: 'flex-start', }}>
                                        <Text>Market Value</Text>
                                    </View>
                                    <View style={{ width: '33%', justifyContent: 'center', alignContent: 'center', }}>
                                        <Text style={{ textAlign: 'center' }}>Book Cost</Text>
                                    </View>
                                    <View style={{ width: '33%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', }}>
                                        <Text style={{ textAlign: 'right' }}>Yield(Projected)</Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        borderBottomColor: 'gray',
                                        borderBottomWidth: 3,
                                        marginTop: '3%'
                                    }}
                                />


                                <View style={{ flexDirection: 'row', alignContent: 'center', }}>
                                    < View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <View style={{ width: '33%', }}>
                                            <CurrencyFormat
                                                value={this.props.marketTotal}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'£'}
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                                renderText={value =>
                                                    <Text style={{ color: colors.primaryColor, fontWeight: 'bold' }}>
                                                        {value ? value : "-"}
                                                    </Text>}
                                            />
                                            {/* <Text >{utility.formatCurrency(this.props.marketTotal ? this.props.marketTotal : '--')}</Text> */}
                                        </View>
                                        <View style={{ width: '33%', }}>
                                            <CurrencyFormat
                                                value={this.props.bookTotal}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'£'}
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                                renderText={value =>
                                                    <Text style={{ color: colors.primaryColor, fontWeight: 'bold', textAlign: 'center' }}>
                                                        {value ? value : "-"}
                                                    </Text>}
                                            />
                                            {/* <Text >{utility.formatCurrency(this.props.bookTotal ? this.props.bookTotal : '--')}</Text> */}
                                        </View>
                                        <View style={{ width: '33%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '5%' }}>
                                            <View style={{}}>
                                                <Text style={{ color: this.props.yieldTotal < 0 ? 'red' : colors.primaryColor, fontWeight: 'bold' }}>{this.props.yieldTotal ? this.props.yieldTotal : '--'}%</Text>
                                            </View>
                                            <View style={{}} >
                                                <Text style={{ textAlign: 'center', paddingLeft: '1%', }}>Total</Text>
                                            </View>
                                        </View>
                                    </View>


                                </View>
                            </View>
                        )
                }
                {/* outerTotal start */}


                {/* outerTotal end */}
            </View>
        )
    }
}

