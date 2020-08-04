import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors'
export default styles = StyleSheet.create({
    mainView: {
        marginTop: '5%',

    },
    paswordTextInputView: {
        marginTop: '5%',
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    paswordTextInput: {
        width: '20%',
        marginLeft: '3%'
    },
    TextInputstyles: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        borderRadius: 5,
        textAlign: 'center'
    },
    verificationMeassageView: {
        marginTop: '5%',
        width: '70%',
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
    },
    loginText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    }
})