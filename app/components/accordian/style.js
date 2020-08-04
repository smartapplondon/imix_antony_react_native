import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors';
export default styles = StyleSheet.create({

    toggleIcon: {
        width: 20,
        height: 20,
    },
    rotateToggleIcon: {
        width: 20,
        height: 20,
        transform: [{ rotate: '180deg' }]
    },
    HeadingView: {
        backgroundColor: colors.themeColor,
        // width: '100%',
        marginTop: '5%',
        borderRadius: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: '3%'
        // paddingBottom: '5%'
        // alignContent: 'center',
        // height: 45,

    },

    dataView:
    {
        width: '100%',
        backgroundColor: "#D3D3D3",
        marginTop: '2%',
        borderRadius: 5,
        padding: '2%'
    }







})
