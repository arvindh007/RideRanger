import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Textinputcomponents from '../../components/textinput';
import Secondarybuttom from '../../components/button';
import auth from '@react-native-firebase/auth';

const ForgotScreen = ({navigation}) => {
  const [Phonenumber, setphonenumber] = useState('');
  const [error2, setError2] = useState(false);
  const [errorcode2, setErrorcode2] = useState('');
  // const [colorvis, setColorvis] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const phonefun = phonenumber => {
    setphonenumber(phonenumber);
    if (!phonenumber) {
      setError2(true);
      setErrorcode2('Phone number is required');
    } else if (!/^\d{10}$/i.test(phonenumber)) {
      setError2(true);
      setErrorcode2('invalid phone number');
    } else {
      setError2(false);
      setErrorcode2('');
    }
  };
  const forgot = val2 => {
    let errors = {};
    if (!val2) {
      setError2(true);
      setErrorcode2('Phone number is required');
      errors.value2 = true;
    } else if (!/^\d{10}$/i.test(val2)) {
      setError2(true);
      setErrorcode2('invalid phone number');
      errors.value2 = true;
    } else {
      // setColorvis(false);
      setError2(false);
      setErrorcode2('');
    }
    return errors;
  };
  const handleSubmit = () => {
    const errors = forgot(Phonenumber);
    if (Object.keys(errors).length === 0) {
      sendOTP(Phonenumber);
      console.log('No errors, navigating to the next page...');
    } else {
      console.log('Errors found, cannot navigate yet.');
    }
  };
  const sendOTP = async val1 => {
    try {
      setInitializing(false);

      const confirmation = await auth().signInWithPhoneNumber('+91' + val1);
      console.log('OTP sent successfully,', confirmation);

      // setColorvis(true);
      navigation.navigate('otpscreen', {phone: val1, otp: confirmation});
      setInitializing(true);
    } catch (error) {
      // setInitializing(false);
      console.error('Error sending OTP', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View style={{gap: 10, flex: 1}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name={'arrow-left'} size={35} color="#000" />
        </TouchableOpacity>
        <Text style={{fontSize: 35, color: '#000', fontWeight: '700'}}>
          Enter Your Register MObile Number
        </Text>
        <Textinputcomponents
          label="Mobile Number"
          placeholder="Enter your Mobile number"
          iconname="phone"
          onchangetext={text => phonefun(text)}
          value={Phonenumber}
          errors={error2}
          maxLength={10}
          keyboardType={'numeric'}
          errorlabel={errorcode2}
        />
      </View>
      <Secondarybuttom
        buttonlabel="continue"
        onpress1={() => handleSubmit()}
        // disabled={colorvis ? false : true}
        loader={initializing ? false : true}
      />
    </SafeAreaView>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({});
