import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors'
export default styles = StyleSheet.create({
    mainView: {
        marginTop: '2%',

    },
    TextInputField: {
        // marginBottom: '3%',
        justifyContent: "center",
        alignSelf: 'flex-start',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        borderRadius: 5,
    },
    SectionStyle: {
        marginTop: '2%',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        borderRadius: 5,
    },
    ImageStyle: {
        padding: 10,
        color: colors.primaryColor,
        justifyContent: 'center',
        // alignSelf: 'flex-end',
        // backgroundColor: 'red'
    },
    loginTxtInput: {
        backgroundColor: 'transparent',
        color: '#000',
        flex: 1,

    },
    text: {
        color: colors.contentColor,
        fontSize: 16,
        marginLeft: '3%'
    },
    loginText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
    modalInnerView: {
        backgroundColor: '#fff',
        height: 250,
        width: 250,
        alignSelf: 'center',
        borderRadius: 10,
        padding: '5%'
    }

})