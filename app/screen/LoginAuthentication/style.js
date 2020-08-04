import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors'
export default styles = StyleSheet.create({
    mainView: {
        marginTop: '5%',
        // backgroundColor: 'pink'
    },
    headerStyle: {
        backgroundColor: colors.primaryColor,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingTop: '10%',
        paddingBottom: '30%'
    },
    SectionStyle: {
        marginTop: '5%',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        width: '90%',
        borderRadius: 5,
    },

    loginTxtInput: {
        backgroundColor: 'transparent',
        color: '#000',
        flex: 1,

    },

    paswordTextInputView: {
        marginTop: '5%',
        flexDirection: 'row',
        width: '70%',
        alignSelf: 'center',

    },
    paswordTextInput: {
        width: '20%',
        marginLeft: '10%'
    },
    TextInputstyles: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        borderRadius: 5,
        textAlign: 'center'
    },
    paswordText: {
        justifyContent: 'center',
        textAlign: 'center',
        // backgroundColor: 'pink',
        marginBottom: '25%'
    },
    ImageStyle: {
        padding: 5,
        color: colors.primaryColor,
        justifyContent: 'center',
        // alignSelf: 'flex-end',
        // backgroundColor: 'red'
    },
    loginText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
})