import ForgotScreen from '../screen/forgotpassword_screen';
import Create_password from '../screen/forgotpassword_screen/createpassword/Createpassword';
import OtpScreen from '../screen/forgotpassword_screen/otpscreen';
import HomeScreen from '../screen/home_screen';
import LoginScreen from '../screen/login_screen';
import Profilescreen from '../screen/profile_screen';
import Registerscreen from '../screen/register_screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import color from '../constant/color/color';
import Bookingpage from '../screen/profile_screen';
import Brandinfoscreen from '../screen/brandscreen';
import Chatscreen from '../screen/chatscreenUI/Chatscreen';
import Payments_screen from '../screen/payment';
import Qrcode_Screen from '../screen/payment/Qrcode';
import Thankyou_Screen from '../screen/payment/Thankyou';

const Stack_navigation = () => {
  const [user_id, setUser_id] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    getuserdata();
  }, []);
  const getuserdata = async () => {
    const USER_ID = await AsyncStorage.getItem('USER_ID');
    const USERID = JSON.parse(USER_ID);
    if (USERID != null) {
      const querySnapshot = await firestore()
        .collection('userdata')
        .doc(USERID)
        .get();
      if (!querySnapshot.empty) {
        const user = querySnapshot.data();
        setUser_id(user);
        if (initializing) {
          setInitializing(false);
        }
      }
      else{
        setUser_id(null);
        if (initializing) {
          setInitializing(false);
        }
      }
    }else{
       setUser_id(null)
      if (initializing) {
        setInitializing(false);
      }
    }
  };
  const Authscreen = () => {
    return (
      <>
        <Stack.Screen name="loginpage" options={{headerShown: false}}>
          {props => <LoginScreen {...props} getData={getuserdata} />}
        </Stack.Screen>
        <Stack.Screen name="registerpage" options={{headerShown: false}}>
          {props => <Registerscreen {...props} getData={getuserdata} />}
        </Stack.Screen>

        <Stack.Screen
          name="profilepage"
          component={Profilescreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="forgotpassword"
          component={ForgotScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="otpscreen"
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="createpassword"
          component={Create_password}
          options={{headerShown: false}}
        />
      </>
    );
  };
  if (initializing) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={color?.ORANGE_COLOR} size={'large'} />
      </SafeAreaView>
    );
  }
  return (
    <Stack.Navigator>
      {user_id !== null ? (
        <>
        <Stack.Screen name="homepage" options={{headerShown: false}}>
          {props => <HomeScreen {...props} getData={getuserdata} />}
        </Stack.Screen>
        <Stack.Screen
          name="bookingpage"
          component={Bookingpage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Brandinfo"
          component={Brandinfoscreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="paymentsscreen"
          component={Payments_screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="qrcodeScreen"
          component={Qrcode_Screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="thankyou"
          component={Thankyou_Screen}
          options={{headerShown: false}}
        />
        </>
      ) : (
        Authscreen()
      )}
    </Stack.Navigator>
  );
};

export default Stack_navigation;
