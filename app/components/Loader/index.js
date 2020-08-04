import React, { Component } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../Loader/style'
import { View, Text } from 'react-native'
class loader extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            // <View><Text></Text></View>
            <Spinner
                visible={this.props.isLoading}
                // textContent={`Loading\nPlease Wait`}
                textStyle={styles.spinnerTextStyle}
                animation="slide"
                color='#175781'
                textStyle={{ color: "white", fontSize: 20 }}
            />
        )
    }

}

export default loader