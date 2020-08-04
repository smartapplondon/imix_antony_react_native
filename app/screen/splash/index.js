import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, ProgressBarAndroid, AsyncStorage } from 'react-native';
import styles from './style';
import * as colors from '../../constants/colors'

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    const clientData = await AsyncStorage.getItem('clientData');
    console.log('clientData....', clientData);
    this.timeoutHandle = setTimeout(() => {
      this.retrieveData(clientData);
    }, 3000);
  }

  retrieveData(clientData) {
    this.setState({
      isLoading: false
    })

    if (clientData) {
      global.clientData = JSON.parse(clientData);
      this.props.navigation.navigate('tab1');
    } else {
      this.props.navigation.navigate('SignIn');
    }

  }


  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }



  render() {
    return (
      <View>
        <View style={styles.container}>
          <Image source={require('../../components/assets/logo.png')} style={styles.logo} />


          <View style={{ width: '100%', marginTop: '140%' }}>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              color="#907451"
              progress={1}
              style={{ width: "80%", alignSelf: 'center' }}
            />
          </View>
        </View>
      </View>
    );
  }
}
