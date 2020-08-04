import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors'
export default styles = StyleSheet.create({
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