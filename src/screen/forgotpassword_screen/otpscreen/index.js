import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
  } from 'react-native';
  import React, {useRef, useState, useEffect} from 'react';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  import auth from '@react-native-firebase/auth';
  import firestore from '@react-native-firebase/firestore';
  import BackgroundTimer from 'react-native-background-timer';
  import AsyncStorage from '@react-native-async-storage/async-storage';
import Secondarybuttom from '../../../components/button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../../constant/color/color';
import fontsize from '../../../constant/fontsize';
const OtpScreen = ({navigation,route}) => {
    const [timer, setTimer] = useState(0); // Initial countdown time in seconds
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [value, setValue] = useState('');
    const [otpval, setOtpval] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    let otp = route.params.otp;
    let phone = route.params.phone;
    console.log(otp, 'otp');
  console.log(phone,'phone');
    const [colorvis, setColorvis] = useState(false);
    const [error, setError] = useState(null);
    // ===============================================Async Storage========================================
    const store = async val => {
      await AsyncStorage.setItem('USER_PHONENUMBER', val);
      console.log('USER_PHONENUMBER updated successfully');
    };
    // ========================================================================
    // const Checkotp = val => {
    //   if (val.length < 6) {
    //     setColorvis(false);
    //     setError('Enter valid OTP');
    //   } else {
    //     if (/^\d{10}$/i.test(val)) {
    //       setColorvis(false);
    //       setError('Enter valid OTP');
    //     } else {
    //       setColorvis(true);
    //       setError(null);
    //       // verifyOTP(val);
    //     }
    //   }
    // };
    const sendOTP = async () => {
      try {
        const confirmation = await auth().signInWithPhoneNumber("+91"+phone);
        console.log('OTP sent successfully,', confirmation);
        setOtpval(confirmation);
      } catch (error) {
        console.error('Error sending OTP' );
      }
    };
  
    const verifyOTP = async val => {
      try {
        setColorvis(true);
        setError(null);
        setInitializing(false);
        await otpval.confirm(val);
        const userCredential = otpval;
        console.log(userCredential);
        console.log('OTP verified successfully.');
        setInitializing(true);
        
        store(phone);
        navigation.navigate("createpassword",{phonenumber:phone});
        // await checkPhoneNumberExists();
       
      } catch (error) {
        setError('Enter a valid OTP');
        setColorvis(false);
        setInitializing(true);
        console.error('Error verifying OTP' );
      }
    };
    // =============================================check phone number in firestore=============================
    // const checkPhoneNumberExists = async () => {
    //   try {
    //     const querySnapshot = await firestore()
    //       .collection('users')
    //       .where('phoneNumber', '==', phone)
    //       .get();
    //     if (!querySnapshot.empty) {
    //       const user = querySnapshot.docs[0].data();
    //       console.log(user, '0000000');
    //       await AsyncStorage.setItem('USER_DATA', JSON.stringify(user));
    //       console.log('userdata updated successfully');
    //       await AsyncStorage.setItem('USER_ID', JSON.stringify(user.user_id));
    //       console.log(
    //         'USER_ID updated successfully',
    //         JSON.stringify(user.user_id),
    //       );
    //       await AsyncStorage.setItem(
    //         'USER_PERMISSION',
    //         JSON.stringify(user.has_permission),
    //       );
    //       console.log('USER_PERMISSION updated successfully');
    //       if (user != null) {
    //         setInitializing(true);
    //         getData();
    //       }
    //     } else {
    //       setInitializing(true);
    //       navigation.navigate('profilescreen', {Phone: phone});
    //     }
    //   } catch (error) {
    //     setInitializing(false);
    //     console.error('Error checking phone number in Firestore', error);
    //   }
    // };
    // -======timer code========
    useEffect(() => {
      setOtpval(otp);
      let interval;
  
      if (timer > 0) {
        interval = BackgroundTimer.setInterval(() => {
          setTimer(prevTimer => prevTimer - 1);
        }, 10000);
      } else {
        setButtonDisabled(false);
        BackgroundTimer.clearInterval(interval);
      }
  
      return () => BackgroundTimer.clearInterval(interval); // Cleanup the interval on component unmount
    }, [timer]);
  
    const handleResendCode = () => {
      sendOTP();
      // Add logic to resend the verification code
      setButtonDisabled(true);
      setTimer(60); // Reset the timer when the button is pressed
    };
  
    useEffect(() => {
      let interval; // Declare interval variable with let
  
      if (timer > 0 && isButtonDisabled) {
        // Start the timer when the button is pressed
        interval = BackgroundTimer.setInterval(() => {
          setTimer(prevTimer => prevTimer - 1);
        }, 1000);
      }
  
      return () => BackgroundTimer.clearInterval(interval); // Cleanup the interval on component unmount
    }, [timer, isButtonDisabled]);
  
  return (
    <SafeAreaView style={styles.mobilecontainer}>

        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={{gap: 16, marginBottom: 12}}>
              <TouchableOpacity
                onPress={() =>  navigation.goBack()}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
              <View style={{width:wp('62.5%')}}>
                <Text style={styles.mobiletitletext}>Enter your OTP</Text>
              </View>
            </View>
            <View>
              <Text style={styles.mobiledesctext}>
                The OTP has been sent to +91-{phone}
              </Text>
            </View>
            <View style={{marginTop: 24}}>
              <Text style={styles.mobilenotext}>Enter OTP</Text>
            </View>

            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={text => {
                setValue(text);

                if (!/^\d{10}$/i.test(text)) {
                  if (
                    text.includes(',') ||
                    text.includes('.') ||
                    text.includes('-') ||
                    text.includes(' ')
                  ) {
                    setError('Enter a valid OTP');
                    setColorvis(false);
                  } else if (text.length == 6) {
                    // setColorvis(true);
                    verifyOTP(text);
                    // setError(null);
                  } else {
                    setError(null);
                  }
                }
              }}
              cellCount={6}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[
                    error ? styles.cellError : styles.cell,
                    isFocused && styles.focusCell,
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            {error !== null ? (
              <Text
                style={{
                  marginLeft: 5,
                  color: 'red',
                  fontSize: 15,
                  fontFamily: 'Manrope-Regular',
                }}>
                {error}
              </Text>
            ) : null}
            <View style={{alignItems: 'center'}}>
              {isButtonDisabled ? (
                <View
                  style={{
                    marginTop: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.mobiledesctext}>Resend OTP in 00:</Text>
                  <Text>{timer.toString().padStart(2, '0')}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={{marginTop: 12}}
                  disabled={isButtonDisabled}
                  onPress={handleResendCode}>
                  <Text style={styles.mobiledesctext}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Secondarybuttom
          buttonlabel="Continue"
          disabled={value.length === 6 && colorvis? false : true}
          onpress1={() =>verifyOTP(value)}
          loader={!initializing}
        />
        </View>
 
  
    </SafeAreaView>
  )
}

export default OtpScreen

const styles = StyleSheet.create({

    getstartcontainer: {
        backgroundColor: color.WHITE,
        flex: 1,
       paddingBottom:5
       
        
      },
      getstratbigcontainer: {
        alignItems: 'center',
        flex:1
      },
      getstartinnercontainer1: {
        // width:wp("23%"),
        zIndex: 1,
        alignItems: 'center',
        position: 'absolute',
      },
      image: {
        height: 408,
        width: "100%",
        resizeMode: 'cover',
      },
      getstartinnercontainer2: {
        marginHorizontal: 16,
        flex:1
      },
      getstarttext: {
        color: color.GETSTART_TEXT_COLOR,
        fontSize: fontsize.SIZE_30,
        fontFamily: 'Manrope-ExtraBold',
      },
      getstratdesctcontainer: {
        marginTop: 5,
        width: wp('75%'),
      },
      getstratdesctext: {
        color: color.DESCRI_TEXT_COLOR,
        fontSize: fontsize.SIZE_14,
        fontFamily: 'Manrope-Medium',
      },
      // mobile screen
      mobilecontainer: {
        backgroundColor: color.WHITE,
        flex: 1,
        padding: 16,
      },
    
      mobileimg: {
        width: wp('6%'),
        height: '2.9',
        padding: (16, 0, 0, 16),
      },
      labletext: {
        fontSize: fontsize.SIZE_14,
        color: color.CHATTEXT_COLOR,
        fontFamily: 'Manrope-Regular',
      },
      mobiletitletext: {
        fontFamily: 'Manrope-Bold',
        fontSize: fontsize.SIZE_30,
        color: color.GETSTART_TEXT_COLOR,
      },
      profilenametext: {
        fontFamily: 'Manrope-Bold',
        fontSize: fontsize.SIZE_16,
        color: color.GETSTART_TEXT_COLOR,
      },
      btnsheettext:{
        fontFamily: 'Manrope-Bold',
        fontSize: fontsize.SIZE_16,
        color: color.GETSTART_TEXT_COLOR,
      },
      mobiledesctext: {
        fontFamily: 'Manrope-Medium',
        fontSize: fontsize.SIZE_14,
        color: color.DESCRI_TEXT_COLOR,
      },
      mobilenotext: {
        fontFamily: 'Manrope-Regular',
        fontSize: fontsize.SIZE_14,
        color: color.DESCRI_TEXT_COLOR,
      },
      mobilecarriertext: {
        fontFamily: 'Manrope-Regular',
        fontSize: fontsize.SIZE_12,
        color: color.DESCRI_TEXT_COLOR,
      },
      // button
      Primarybuttomcontainer: {
        borderRadius: 41,
        backgroundColor: "#F5ACA0",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      },
      Primarybuttomtext: {
        color: color.WHITE,
        fontSize: fontsize.SIZE_16,
        fontFamily: 'Manrope-SemiBold',
      },
      buttonconfirm: {
        borderRadius: 41,
        backgroundColor: color.GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      },
      root: {flex: 1, padding: 20},
      title: {textAlign: 'center', fontSize: 30},
      codeFieldRoot: {marginTop: 4},
      cell: {
        width: wp("12.6%"),
        height: hp('6.5%'),
        lineHeight: 38,
        fontSize: 24,
        backgroundColor:color.SEARCH_BACKGROUND,
        borderColor: '#00000030',
        textAlign: 'center',
        borderRadius:12,
        color:color.GETSTART_TEXT_COLOR
      },
      cellError: {
        width: wp("12.6%"),
        height: hp('6.5%'),
        lineHeight: 38,
        fontSize: 24,
        backgroundColor:color.SEARCH_BACKGROUND,
        borderColor: 'red',
        textAlign: 'center',
        borderWidth:1,
        borderRadius:12,
        color:color.GETSTART_TEXT_COLOR
      },
      focusCell: {
        borderWidth:1,
        borderColor:"#000"
      },
      // profile screen
       proimage:{
        borderRadius:60,
        width:wp("28.4%"),
        height:hp('14%'),
       
      
       },
       profiledataimage:{
        borderRadius:80,
        width:wp("38.4%"),
        height:hp('19%'),
       },
       incomingcallimage:{
        borderRadius:80,
        width:wp("30.4%"),
        height:hp('15%'),
       },
       btmcircle:{
       backgroundColor:color.WHITE,
        width:wp("20%"),
        height:hp('10%'),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        borderWidth:2,
        borderColor:color.SEARCH_BACKGROUND
       },
       profilescreentext: {
        fontSize: fontsize.SIZE_16,
        fontFamily: 'Manrope-SemiBold',
        color: color.DESCRI_TEXT_COLOR,
        textTransform:'capitalize',
        marginLeft:10
      },
})