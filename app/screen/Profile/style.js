import { Dimensions, StyleSheet, Platform } from 'react-native';
import * as colors from '../../constants/colors'
const window = Dimensions.get('window');
const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.primaryColor,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        // height: '60%'
    },
    logo: {
        width: 180,
        height: 32,
    },
    loginText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
})
export default styles