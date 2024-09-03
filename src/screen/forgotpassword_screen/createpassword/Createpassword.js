import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Textinputcomponents from '../../../components/textinput';
import Secondarybuttom from '../../../components/button';

const Create_password = ({navigation,route}) => {
    const phone = route.params.phonenumber;
    const [Passwordicon, setpasswordicon] = useState(false);
    const [Passwordicon1, setpasswordicon1] = useState(false);
    const [Password,setpassword]=useState('');
  const [confirmpassword,setconfirmpassword]=useState('');
  const [error4, setError4] = useState(false);
  const [errorcode4, setErrorcode4] = useState("");
  const [error5, setError5] = useState(false);
  const [errorcode5, setErrorcode5] = useState("");
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
       const checkpassword = (val4,val5) => {
        const errors = {};
        if (!val4) {
          setError4(true);
          setErrorcode4("Password is required");
          errors.value4 = true;
        } 
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/
        .test(val4))
        {
          setError4(true);
          setErrorcode4("Invalid Password");
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

        const uploaddata = async (phone1,password1) => {
          const querySnapshot = await firestore()
            .collection('userdata')
            .where('phonenumber', '==', phone1)
            .get();
          if (!querySnapshot.empty) {
            const user = querySnapshot.docs[0].data();
            firestore().collection("userdata").doc(user?.userid).update({
                Password:password1
            }).then(() => {
                console.log("data uploaded")
                navigation.navigate("loginpage")
              })
          }
        };
       const handleSubmit =()=>{
        const errors = checkpassword(Password,confirmpassword);
        // Check if there are no errors
        if (Object.keys(errors).length === 0) {
          uploaddata(phone,Password);
          console.log("No errors, navigating to the next page...");
        } else {
          // Handle errors here if needed
          console.log("Errors found, cannot navigate yet.");
        }
      };
       
  return (
    <SafeAreaView style={{flex: 1,padding:10}}>
        <View style={{flex:1,gap:10,marginTop:hp("2%")}}>

    <View  style={{alignItems:'center'}}>
      <Text style={{fontSize: 30, color: '#000', fontWeight: '700',textTransform:'capitalize'}}>reset your password</Text>
      </View>
      
    <View style={{gap:10}}>

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
          </View>
          </View>
         <Secondarybuttom
          buttonlabel="Save password"
          // onpress1={() => navigation.navigate('homepage')}
          onpress1={() =>handleSubmit()}
        />
   </SafeAreaView>
  )
}

export default Create_password

const styles = StyleSheet.create({})