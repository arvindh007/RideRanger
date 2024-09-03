import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Textinputcomponents from '../../components/textinput';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Secondarybuttom from '../../components/button';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation,getData}) => {
  const [password, setpassword] = useState('');
  const [Email, setemail] = useState('');
  const [Passwordicon, setpasswordicon] = useState(false);
  const [error1, setError1] = useState(false);
  const [errorcode1, setErrorcode1] = useState('');
  const [error2, setError2] = useState(false);
  const [errorcode2, setErrorcode2] = useState('');
  const [toast, SetToast] = useState(false);
  const [loader,setloader]=useState(false);

  const emailfun = email => {
    SetToast(false);
    setemail(email);
    if (!email) {
      setError1(true);
      setErrorcode1('Email is required');
    } else if (email.startsWith(' ')) {
      setError1(true);
      setErrorcode1('First letter cannot be a space');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError1(true);
      setErrorcode1('invalid email');
    } else {
      setError1(false);
      setErrorcode1('');
    }
  };
  const passwordfun = password => {
    SetToast(false);
    setpassword(password);
    if (!password) {
      setError2(true);
      setErrorcode2('Password is required');
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(password)) {
      setError2(true);
      setErrorcode2('Invalid Password');
    } else {
      setError2(false);
      setErrorcode2('');
    }
  };
  const Loginfun = (val3, val4) => {
    const errors = {};
    if (!val3) {
      setError1(true);
      setErrorcode1('Email is required');
      errors.value3 = true;
    } else if (val3.startsWith(' ')) {
      setError1(true);
      setErrorcode1('First letter cannot be a space');
      errors.value3 = true;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val3)) {
      setError1(true);
      setErrorcode1('invalid email');
      errors.value3 = true;
    } else {
      setError1(false);
      setErrorcode1('');
    }
    if (!val4) {
      setError2(true);
      setErrorcode2('Password is required');
      errors.value4 = true;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(val4)) {
      setError2(true);
      setErrorcode2('Invalid Password');
      errors.value4 = true;
    } else {
      setError2(false);
      setErrorcode2('');
    }
    return errors;
  };
  const checkEmailexist = async (val1, val2) => {
    try {
      const lowercaseEmail = val1.toLowerCase();
      const querySnapshot = await firestore()
        .collection('userdata')
        .where('Email', '==', lowercaseEmail)
        .get();
      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        if (user?.Password === val2) {
          await AsyncStorage.setItem('USER_DATA', JSON.stringify(user));
          await AsyncStorage.setItem('USER_ID', JSON.stringify(user.userid));
          await AsyncStorage.setItem(
            'USER_PHONENUMBER',
            JSON.stringify(user.Phonenumber),
          );

          getData();
          setloader(false)
        } else {
          setloader(false)
          setError2(true);
          setErrorcode2('incorrect Password');
        }
      } else {
        SetToast(true);
        console.log('====================================');
        console.log('fail');
        setloader(false)
        console.log('====================================');
      }
    } catch (error) {
      // setInitializing(false);
      console.error('Error checking phone number in Firestore', error);
    }
  };

  const handleSubmit = () => {
    // setloader(true)
    const errors = Loginfun(Email, password);
    if (Object.keys(errors).length === 0) {
      setloader(true)
      checkEmailexist(Email, password);
      console.log('No errors, navigating to the next page');
    } else {
      console.log('Errors found, cannot navigate yet');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
      <View style={{gap: 10, alignItems: 'center', marginTop: hp('7%')}}>
        <Text style={{fontSize: 35, color: '#000', fontWeight: '700'}}>
          Welcome Back
        </Text>
        <Text style={{fontSize: 15, color: '#FDAF7B', fontWeight: '400'}}>
          sign in with your email and password
        </Text>
      </View>
      <ScrollView style={{marginTop: hp('5%')}}>
        <Textinputcomponents
          label="Email"
          placeholder="Enter your email"
          iconname="email"
          onchangetext={text => emailfun(text)}
          value={Email}
          errors={error1}
          errorlabel={errorcode1}
        />
        {/* lock-open-variant */}
        <Textinputcomponents
          label="password"
          placeholder="Enter your password"
          iconname={Passwordicon ? 'lock-open-variant' : 'lock'}
          onchangetext={text => passwordfun(text)}
          value={password}
          errors={error2}
          errorlabel={errorcode2}
          icononpress={() => setpasswordicon(!Passwordicon)}
          secureTextEntry={!Passwordicon}
        />
        <TouchableOpacity
          style={{alignItems: 'flex-end'}}
          onPress={() => navigation.navigate('forgotpassword')}>
          <Text
            style={{
              textTransform: 'capitalize',
              color: '#000',
              opacity: 0.8,
              textDecorationLine: 'underline',
            }}>
            forget Password
          </Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: hp('2%')}}>
          <Text style={{color: '#000', opacity: 0.8, fontSize: 20}}>
            Don't have an account ?{' '}
            <Text
              style={{
                color: '#FDA403',
                opacity: 0.8,
                textDecorationLine: 'underline',
              }}
              onPress={() => navigation.navigate('registerpage')}>
              Sign Up
            </Text>
          </Text>
        </View>
        {toast ? (
          <TouchableOpacity
            style={{alignItems: 'center', marginTop: hp('2%')}}
            onPress={() => navigation.navigate('registerpage')}>
            <Text
              style={{
                color: 'red',
                fontSize: 16,
                textDecorationLine: 'underline',
              }}>
              Email ID Doesn't exist
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
      <View>
        <Secondarybuttom
          buttonlabel="sign in"
          onpress1={() => handleSubmit()}
          loader={loader?true:false}
          // onpress1={() => Loginfun(Email, password)}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
