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
    performanceSummaryView: {
        borderLeftWidth: 4,
        borderLeftColor: colors.primaryColor,
        padding: '2%'
    },
    mainHeading: {
        padding: "2%",
        backgroundColor: colors.themeColor,
        width: '100%',
        marginTop: '3%',
        borderRadius: 5,
        justifyContent: 'center',
        alignContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    },
    pickerView: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: '54%',
        borderBottomWidth: 1,
        borderColor: '#ececec'
    },
    pickerView: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: '54%',
        borderBottomWidth: 1,
        borderColor: '#ececec'
    },
    mainHeading: {
        padding: "4%",
        backgroundColor: colors.themeColor,
        width: '100%',
        marginTop: '3%',
        borderRadius: 5,
        justifyContent: 'flex-start'

    },
    changePeriodTxt: {
        fontSize: 17,
        color: '#fff',
        textAlign: 'left'
    },
})