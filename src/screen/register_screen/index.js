import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Textinputcomponents from '../../components/textinput';
import Secondarybuttom from '../../components/button';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
const Registerscreen = ({navigation,getData}) => {
  const [Passwordicon, setpasswordicon] = useState(false);
  const [Passwordicon1, setpasswordicon1] = useState(false);
  const [Name,setname]=useState('');
  const [Email,setemail]=useState('');
  const [Password,setpassword]=useState('');
  const [confirmpassword,setconfirmpassword]=useState('');
  const [Phonenumber,setphonenumber]=useState('');
  const [error1, setError1] = useState(false);
  const [errorcode1, setErrorcode1] = useState("");
  const [error2, setError2] = useState(false);
  const [errorcode2, setErrorcode2] = useState("");
  const [error3, setError3] = useState(false);
  const [errorcode3, setErrorcode3] = useState("");
  const [error4, setError4] = useState(false);
  const [errorcode4, setErrorcode4] = useState("");
  const [error5, setError5] = useState(false);
  const [errorcode5, setErrorcode5] = useState("");
  const [error6, setError6] = useState(false);
  const [errorcode6, setErrorcode6] = useState("");
  const namefun = (name) => {
      setname(name);
      if (!name) {
        setError1(true);
        setErrorcode1("Name is required");
      }else if (name.startsWith(' ')){
        setError1(true);
        setErrorcode1("First letter cannot be a space");
      }
      else {
        setError1(false);
        setErrorcode1("");
      }
  }
  const emailfun = (email) => {
    setemail(email);
    if (!email) {
      setError3(true);
      setErrorcode3("Email is required");
    } else if (email.startsWith(' ')) {
      setError3(true);
      setErrorcode3("First letter cannot be a space");
    }else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
    {
      setError3(true);
      setErrorcode3("invalid email");
    } else {
      setError3(false);
      setErrorcode3("");
    }
  }
   const phonefun = (phonenumber) => {
    setphonenumber(phonenumber);
    if (!phonenumber) {
      setError2(true);
      setErrorcode2("Phone number is required");
    }else if (!/^\d{10}$/i.test(phonenumber)){
      setError2(true);
      setErrorcode2("invalid phone number");
    }
    else {
      setError2(false);
      setErrorcode2("");
    }
   }
   const passwordfun = (password) => {
    setpassword(password);
    if (!password) {
      setError4(true);
      setErrorcode4("Password is required");
    }
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/
    .test(password))
    {
      setError4(true);
      setErrorcode4("Invalid Password");
    } 
    else {
      setError4(false);
      setErrorcode4("");
    }
   } 
   const confirmfun = (confirmpassword) => {
    setconfirmpassword(confirmpassword);
    if (!confirmpassword) {
      setError5(true);
      setErrorcode5("Confirm password is required");
    } else if (Password !== confirmpassword) {
      setError5(true);
      setErrorcode5("Password doesn't match");
    }
    else {
      setError5(false);
      setErrorcode5("");
    }
   }
   const Register = (val1,val2,val3,val4,val5) => {
    const errors = {};
    if (!val1) {
      setError1(true);
      setErrorcode1("Name is required");
      errors.value1 = true;
    }else if (val1.startsWith(' ')){
      setError1(true);
      setErrorcode1("First letter cannot be a space");
      errors.value1 = true;
    }
    else {
      setError1(false);
      setErrorcode1("");
    }
    if (!val3) {
      setError3(true);
      setErrorcode3("Email is required");
      errors.value3 = true;
    } else if (val3.startsWith(' ')) {
      setError3(true);
      setErrorcode3("First letter cannot be a space");
      errors.value3 = true;
    }else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val3))
    {
      setError3(true);
      setErrorcode3("invalid email");
      errors.value3 = true;
    } else {
      setError3(false);
      setErrorcode3("");
    }
    if (!val2) {
      setError2(true);
      setErrorcode2("Phone number is required");
      errors.value2 = true;
    }else if (!/^\d{10}$/i.test(val2)){
      setError2(true);
      setErrorcode2("invalid phone number");
      errors.value2 = true;
    }
    else {
      setError2(false);
      setErrorcode2("");
    }
    if (!val4) {
      setError4(true);
      setErrorcode4("Password is required");
      errors.value4 = true;
    } 
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/
    .test(val4))
    {
      setError2(true);
      setErrorcode2("Invalid Password");
      errors.value4 = true;
    } 
    else {
      setError4(false);
      setErrorcode4("");
    }
    if (!val5) {
      setError5(true);
      setErrorcode5("Confirm password is required");
      errors.value5 = true;
    } else if (Password !== confirmpassword) {
      setError5(true);
      setErrorcode5("Password doesn't match");
      errors.value5 = true;
    }
    else {
      setError5(false);
      setErrorcode5("");
    }

    return errors;
   }
   const uploaddata = async () => {
    const user_id = uuid.v4()
    const lowercaseEmail = Email.toLowerCase();
    console.log('====================================');
    console.log("99");
    console.log('====================================');
    await firestore().collection("userdata").doc(user_id).set({
       Name:Name,
       Phonenumber:Phonenumber,
       Email:lowercaseEmail,
       Password:Password,
       userid:user_id,
       Profile_pic:"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
     }).then(() => {
        console.log('====================================');
        console.log("user register");
        console.log('====================================');
     })
      await AsyncStorage.setItem('USER_ID', JSON.stringify(user_id));
      getData();
   
   }
   const handleSubmit = () => {
    const errors = Register(Name,Phonenumber,Email,Password,confirmpassword);
  
    // Check if there are no errors
    if (Object.keys(errors).length === 0) {
      uploaddata();
      console.log("No errors, navigating to the next page...");
    } else {
      // Handle errors here if needed
      console.log("Errors found, cannot navigate yet.");
    }
  };
  
  return (
    <SafeAreaView style={{flex: 1,padding:10}}>
      <View  style={{gap: 10, alignItems: 'center'}}>
        <Text style={{fontSize: 35, color: '#000', fontWeight: '700'}}>Register Account </Text>
        <Text  style={{fontSize: 15, color: '#FDAF7B', fontWeight: '400'}}>Enter your details to continue</Text>
      </View>
      <ScrollView style={{marginTop: hp('5%')}}>
      <Textinputcomponents
          label="Name"
          placeholder="Enter your Name"
          iconname="account-circle-outline"
          onchangetext={text =>namefun(text)}
          value={Name}
          errors={error1}
          errorlabel={errorcode1}
        />
      <Textinputcomponents
          label="Mobile Number"
          placeholder="Enter your Mobile number"
          iconname="phone"
          onchangetext={text => phonefun(text)}
          value={Phonenumber}
          errors={error2}
          
          maxLength={10}
          keyboardType={"numeric"}
          errorlabel={errorcode2}
        />
      <Textinputcomponents
          label="Email"
          placeholder="Enter your email"
          iconname="email"
          onchangetext={text => emailfun(text)}
          value={Email}
          errors={error3}
          errorlabel={errorcode3}
        />
      <Textinputcomponents
          label="Password"
          placeholder="Enter your Password"
          onchangetext={text => passwordfun(text)}
          value={Password}
          errors={error4}
          errorlabel={errorcode4}
          iconname={Passwordicon ? "lock-open-variant" : "lock" }
          icononpress={() => setpasswordicon(!Passwordicon)}
          secureTextEntry={!Passwordicon}
        />
      <Textinputcomponents
          label="Confirm Password"
          placeholder="Re-enter your Password"
          iconname={Passwordicon1 ? "lock-open-variant" : "lock" }
          icononpress={() => setpasswordicon1(!Passwordicon1)}
          secureTextEntry={!Passwordicon1}
          onchangetext={text => confirmfun(text)}
          value={confirmpassword}
          errors={error5}
          errorlabel={errorcode5}
        />
      </ScrollView>
         <View style={{alignItems: 'center',padding:5}}>
          <Text style={{color: '#000', opacity: 0.8, fontSize: 20}}>
            Already have an account ?{' '}
            <Text
              style={{
                color: '#FDA403',
                opacity: 0.8,
                textDecorationLine: 'underline',
              }}
              onPress={() => navigation.navigate('loginpage')}>
              Sign In
            </Text>
          </Text>
        </View>
      <Secondarybuttom
          buttonlabel="sign up"
          // onpress1={() => navigation.navigate('homepage')}
          onpress1={() =>handleSubmit()}
        />
    </SafeAreaView>
  )
}

export default Registerscreen

const styles = StyleSheet.create({})