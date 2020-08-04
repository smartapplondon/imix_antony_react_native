import { Dimensions, StyleSheet, Platform } from 'react-native';
import * as colors from '../../constants/colors'
const window = Dimensions.get('window');
const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.primaryColor,
        // height: '70%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '19',
        paddingTop: '60%',
        paddingBottom: '60%'
        // padding: '5%',
        // marginBottom: '10%'
    },
    logo: {
        width: 246,
        height: 44,
    },
    loginContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: colors.buttonColor,
        width: '60%',
        borderRadius: 8,
        minHeight: 50,

    },
    loginText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    }
})
export default styles