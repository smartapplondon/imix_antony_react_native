import { Dimensions, StyleSheet, Platform } from 'react-native';
import * as colors from '../../constants/colors';
const window = Dimensions.get('window');
export default styles = StyleSheet.create({
    saveText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
    cancleText: {
        textAlign: 'center',
        color: '#9f8b73',
        fontSize: 16
    },
    pickerView: {
        textAlign: 'center',
        fontSize: 12,
        justifyContent: "center", 
        alignSelf: 'center', 
        height: 50, 
        borderColor: 'gray', 
        borderWidth: 1, 
        width: '100%', 
        borderRadius: 8
        
    },
    container: {
        backgroundColor: colors.primaryColor,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        // height: '60%'
    },
    logo: {
        width: 180,
        height: 32,
    }

})