
import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors'
export default styles = StyleSheet.create({
    SectionStyle: {
        marginTop: '5%',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        height: 70,
        borderRadius: 5,
    },
    ImageStyle: {
        width: 40,
        height: 40,
        marginRight: 5,
        // padding: 5,
        color: colors.primaryColor,
        justifyContent: 'center',
        // alignSelf: 'flex-end',
        // backgroundColor: 'red'
    },
    loginTxtInput: {
        backgroundColor: 'transparent',
        color: '#000',
        flex: 1,
        paddingLeft: '3%',

    },
})