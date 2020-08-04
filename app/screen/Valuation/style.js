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

    mainContentHeading: {
        fontSize: 14,
        color: colors.primaryColor,
        marginTop: '2%',
        fontWeight: 'bold'
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '18%',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: '10%'
    }

})
