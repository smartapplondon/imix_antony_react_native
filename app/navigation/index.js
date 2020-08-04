
import React from 'react';
import { ImageBackground, View, Image } from 'react-native'
// import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, } from 'react-navigation-tabs';
import SplashScreen from '../screen/splash';
import SignInScreen from '../screen/SingIn';
import LoginAuthenticationScreen from '../screen/LoginAuthentication';
import ForgotPasswordScreen from '../screen/ForgotPassword';
import EmailVerificationScreen from '../screen/EmailVerification';
import ResetPasswordScreen from '../screen/ResetPassword';
import ValuationScreen from '../screen/Valuation/index';
import HomeScreen from '../screen/Home'
import AssetAllocationScreen from '../screen/AssetAllocation'
import ChangePasswordScreen from '../screen/ChangePassword';
import ChangeMemorableWordScreen from '../screen/ChangeMemorableWord'
import * as colors from '../constants/colors';
import profileScreen from '../screen/Profile';
import UpdateDetailsScreen from '../screen/UpdateDetails';
import PerformanceScreen from '../screen/Performance';
import AddAddressScreen from '../screen/AddAddress'
const AppStack = createStackNavigator(

  {

    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
      },
    },

    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        header: null,
      },
    },
    LoginAuthentication: {

      screen: LoginAuthenticationScreen,
      navigationOptions: {
        header: null,
      },
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        header: null,
      },
    },
    EmailVerification: {
      screen: EmailVerificationScreen,
      navigationOptions: {
        header: null,
      },
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      navigationOptions: {
        header: null,
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Performance: {
      screen: PerformanceScreen,
      navigationOptions: {
        header: null,
      },
    },
    Valuation: {
      screen: ValuationScreen,
      navigationOptions: {
        header: null,
      },
    },
    AssetAllocation: {
      screen: AssetAllocationScreen,
      navigationOptions: {
        header: null,
      },
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
      navigationOptions: {
        header: null,
      },
    },
    ChangeMemorableWord: {
      screen: ChangeMemorableWordScreen,
      navigationOptions: {
        header: null,
      },
    },
    profile: {
      screen: profileScreen,
      navigationOptions: {
        header: null,
      },
    },
    UpdateDetails: {
      screen: UpdateDetailsScreen,
      navigationOptions: {
        header: null,
      },
    },
    AddAddress: {
      screen: AddAddressScreen,
      navigationOptions: {
        header: null,
      },
    }
  },


  {
    initialRouteName: 'Splash',
  },
);



const TabNavigator = createBottomTabNavigator({

  tab1: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "Home",
      tabBarIcon: ({ focused, tintColor }) => {
        let icon
        if (navigation.state.routeName === "tab1") {
          icon = focused ? require('../components/assets/home_blue.png') : require('../components/assets/home.png')

        }
        return <Image
          source={icon}
          style={{
            width: 30,
            height: 30,
          }}></Image>

      },
      tabBarOnPress: () => {
        console.log('home tab pressed');
        global.accountDetail = null;
        navigation.navigate('tab1');
      }
    })
  },
  tab2: {
    screen: PerformanceScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "Performance",
      tabBarIcon: ({ focused, tintColor }) => {
        let icon
        if (navigation.state.routeName === "tab2") {
          icon = focused ? require('../components/assets/performance_blue.png') : require('../components/assets/performance.png')

        }
        return <Image
          source={icon}
          style={{
            width: 30,
            height: 30,
          }}></Image>

      }
    })
  },

  tab3: {
    screen: ValuationScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "Valuation",
      tabBarIcon: ({ focused, tintColor }) => {
        let icon
        if (navigation.state.routeName === "tab3") {
          icon = focused ? require('../components/assets/valuation_blue.png') : require('../components/assets/valuation.png')

        }
        return <Image
          source={icon}
          style={{
            width: 30,
            height: 30,
          }}></Image>

      }
    })
  },
  tab4: {
    screen: AssetAllocationScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "Asset Allocation",
      tabBarIcon: ({ focused, tintColor }) => {
        let icon
        if (navigation.state.routeName === "tab4") {
          icon = focused ? require('../components/assets/assetallocatoin_blue.png') : require('../components/assets/asset_allocation.png')

        }
        return <Image
          source={icon}
          style={{
            width: 30,
            height: 30,
          }}></Image>

      }
    })
  },

},
  {
    initialRouteName: "tab1",
    tabBarPosition: 'bottom',
    tabBarOptions: {

      activeTintColor: colors.primaryColor,
      activeBackgroundColor: '#FFF',
      inactiveTintColor: '#D3D3D3',

      showIcon: true,
      showLabel: true,
      style: {
        height: 60,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 0,
        borderColor: 'white',
        borderTopColor: 'transparent'

      },
      labelStyle: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 4
      }
    }
  }
);


const Routes = createAppContainer(
  createSwitchNavigator({
    App: AppStack,
    BottomTab: TabNavigator,
  }),
);
export default Routes;
