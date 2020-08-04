import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors'
export default styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    width: "100%",
    height: "100%",
    opacity: 100,
  },

  logo: {
    position: 'relative',
    width: 246, height: 44,
    opacity: 1,
    top: "20%",
    alignSelf: 'center',
  }
});
