import { Platform, Alert } from "react-native";
import { Dimensions } from "react-native";
import * as titles from "../constants/title";

export var deviceHeight = Dimensions.get('window').height;
export var deviceWidth = Dimensions.get('window').width;

export const getPageLimit = () => {
  return 10;
};

export let isFieldEmpty = text => {

  if (text == "") {
    return true;
  }
  return false;
};
export let passwordPattern = password => {
  const reg = /.*[0-9]+.*/i
  if (!reg.test(password) && password !== undefined && password !== null && password !== '') {
    return true;
  }
  return false;
};

export let isValidEmail = email => {

  var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  console.log("isgmail", reg.test(email))
  if (!reg.test(email)) {
    return true;
  }
  return false;
};

export let isValidPhoneNumber = phoneNo => {
  if (phoneNo.length < 8) {
    return false;
  }
  return true;
};

export let isValidOtp = otp => {
  if (otp.length < 4) {
    return false;
  }
  return true;
};

export let isValidComparedPassword = (password, confirmPassword) => {
  if (password != confirmPassword) {
    return true;
  }
  return false;
};
export let getOS = () => {
  if (Platform.OS === "ios") {
    return "ios";
  }
  return "android";
};

export let showAlert = message => {
  Alert.alert(
    titles.APP_NAME,
    message,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
};

export const formatCurrency = (amount) => {
  return amount;
};
export const showAlertWithCallBack = (msg, onOkClick) => {
  Alert.alert(
    "",
    msg,
    [
      {
        text: "OK",
        onPress: () => {
          console.log(" CLICK CALLED ");
          onOkClick();
        }
      }
    ],
    {
      cancelable: false
    }
  );
};
