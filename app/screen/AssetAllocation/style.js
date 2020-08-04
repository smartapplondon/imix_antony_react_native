import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors';
export default styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: colors.primaryColor,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: '3%',
        height: 80
    },
    accountSummaryView: {
        borderLeftWidth: 4,
        borderLeftColor: colors.primaryColor,
        padding: '2%'
    },
    mainHeading: {
        // padding: "4%",
        paddingLeft: '4%',
        // backgroundColor: 'pink',
        marginTop: '3%',
        // borderRadius: 5,

    },
    pickerView: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: '54%',
        borderBottomWidth: 1,
        borderColor: '#ececec'
    },
    changePeriodTxt: {
        fontSize: 17,
        fontWeight: 'bold'
        // color: '#fff',
        // textAlign: 'left'
    },
    mainView: {
        backgroundColor: '#ececec',
        width: '100%',
        borderRadius: 5,
        marginTop: '5%',
        padding: '2%'
    },
    dataCardView: {
        // flexDirection: 'row',
        // borderBottomWidth: 1,
        // borderBottomColor: '#a79999',
        marginBottom: '3%'
    },
    HeadingView: {
        backgroundColor: colors.themeColor,
        // width: '100%',
        // marginTop: '5%',
        borderRadius: 5,
        // justifyContent: 'space-between',
        // flexDirection: 'row',
        padding: '3%'
        // paddingBottom: '5%'
        // alignContent: 'center',
        // height: 45,

    },
    subCardViewLoop: {
        flex: 1,
        flexDirection: 'column',
        width: "50%",
        marginLeft: "5%",
        justifyContent: 'flex-start',
        marginBottom: '4%'
    },
    subCardViewLoop2: {
        flex: 1,
        flexDirection: 'column',
        width: "50%",
        marginLeft: "5%",
        justifyContent: 'flex-end',
        marginBottom: '9%',
        alignItems: 'flex-end',
        paddingRight: '5%'
    },


    loopTittle: {
        // margin: 3,
        // marginLeft: -76
    },
    investmentTypeTitle: {
        color: '#FFF',
        fontSize: 18,
        // color: colors.primaryColor,
        // fontWeight: '700',
    },
    font1: { fontSize: 14, marginTop: "2%", marginBottom: '1%', },
    font2: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: '5%',

    },
})