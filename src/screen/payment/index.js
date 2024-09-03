import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react'
import color from '../../constant/color/color';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import uuid from 'react-native-uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Textinputcomponents from '../../components/textinput';
import RazorpayCheckout from "react-native-razorpay";

const Payments_screen = ({navigation, route}) => {
  let BIKEDATA = route.params.bikedata;
  const [error1, setError1] = useState(false);
  const [errorcode1, setErrorcode1] = useState("");
  const [error2, setError2] = useState(false);
  const [errorcode2, setErrorcode2] = useState("");
  const [Name,setname]=useState('');
  const [Address,setaddress]= useState("");
  const [userdata,setuserdata]=useState({});
    const GETUSERDATA = async () => {
      const USER_ID = await AsyncStorage.getItem('USER_ID');
      const USERID = JSON.parse(USER_ID);
      firestore()
        .collection('userdata')
        .doc(USERID)
        .get()
        .then(querySnapshot => {
          const parsedvalue = querySnapshot.data();
          console.log(parsedvalue,'000');
          setuserdata(parsedvalue,'999999')
           
        });
    }
    useEffect(() => {
      GETUSERDATA();
    },[]);
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
  const Addressfun = (name) => {
    setaddress(name);
    if (!name) {
      setError2(true);
      setErrorcode2("Address is required");
    }else if (name.startsWith(' ')){
      setError2(true);
      setErrorcode2("First letter cannot be a space");
    }
    else {
      setError2(false);
      setErrorcode2("");
    }
}
const ckeckvalidate =(val1,val2)=>{
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
    if (!val2) {
      setError2(true);
      setErrorcode2("Address is required");
      errors.value2 = true;
    }else if (val1.startsWith(' ')){
      setError2(true);
      setErrorcode2("First letter cannot be a space");
      errors.value2 = true;
    }
    else {
      setError2(false);
      setErrorcode2("");
    }
    return errors;
}
const Bookingbike =async(val)=>{
  const USER_ID = await AsyncStorage.getItem('USER_ID');
  const USERID = JSON.parse(USER_ID);
  const collectionid = uuid.v4()
  const bikecollection = {
    bikename:val?.bikename,
    price:val?.price,
    Brand: val?.Brand,
    id:collectionid,
    image:val?.image,
    description:val?.description
  }
  firestore()
    .collection('userdata')
    .doc(USERID)
    .collection("collections")
    .doc(collectionid)
    .set({bikecollection

    }).then(()=>{
      console.log("Booked");
      console.log('====================================');
      console.log("eeeeeeeeeeeeeee",BIKEDATA?.price);
      console.log("eeeeeeeeeeeeeee",userdata);
      console.log('====================================');
      var options = {
        description: 'this is test payment integration',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: 'rzp_test_0Soma3GGNGgA8f',
        amount: `${999*100}`,
        name: 'RideRanger',
        // order_id: 'order_9A33XWu',//Replace this with an order_id created using Orders API.
        prefill: {
          email: `anbuvel2407@gmail.com`,
          contact: `9677395645`,
          name: `Anbuvel`
        },
        theme: {color: '#FDA403'}
      }
      RazorpayCheckout.open(options).then((data) => {
        // handle success
        navigation.navigate("thankyou",{bikedata:BIKEDATA,name:Name,Address:Address,USERDATA:userdata})
      }).catch((error) => {
        // handle failure
        console.log('====================================');
        console.log(error,'999');
        console.log('====================================');
        alert(`Error: ${error.code} | ${error.description}`);
      });
      
      // navigation.navigate("qrcodeScreen",{bikedata:BIKEDATA,name:Name,Address:Address,USERDATA:userdata})
    })
}
 const Checkvalidationfun =()=>{
  const errors = ckeckvalidate(Name,Address)
  if (Object.keys(errors).length === 0) {
    Bookingbike(BIKEDATA)
    
    console.log("No errors, navigating to the next page...");
  } else {
    // Handle errors here if needed
    console.log("Errors found, cannot navigate yet.");
  }
 }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color?.WHITE}}>
      <ScrollView style={{flex:1}}>
        <View>
          <View style={{padding: 10, gap: 5 }}>
            <View style={{flexDirection:'row',alignItems:"center",gap:5}}>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name={'arrow-left'}
              size={35}
              color="#000"
            />
          </TouchableOpacity>
            <Text
              style={{
                color: '#000',
                fontSize: 24,
                fontWeight: '500',
                textTransform: 'capitalize',
                paddingBottom:5
              }}>
             Enter Personal info :
            </Text>
            </View>
            <View style={{paddingLeft: 10}}>
              <Textinputcomponents
                label="Bike owner"
                placeholder="Enter your Name"
                iconname="account-circle-outline" 
                onchangetext={text =>namefun(text)}
          value={Name}
          errors={error1}
          errorlabel={errorcode1}

              />
              <Textinputcomponents
                label="Address"
                placeholder="Enter your Address"
                iconname="account-circle-outline"
                onchangetext={text =>Addressfun(text)}
          value={Address}
          errors={error2}
          errorlabel={errorcode2}
              />
              
              <View style={{gap:5}}>
                <Text style={{color:"#000",fontSize:18,fontWeight:'600',textTransform:'capitalize'}}>your mobile number :</Text>
                <Text style={{color:"#FDA403",fontSize:18,fontWeight:'600',textTransform:'capitalize',paddingLeft:10}}>{userdata?.Phonenumber}</Text>
              </View>
              <View style={{gap:5}}>
                <Text style={{color:"#000",fontSize:18,fontWeight:'600',textTransform:'capitalize'}}>your Email-id :</Text>
                <Text style={{color:"#FDA403",fontSize:18,fontWeight:'600',textTransform:'capitalize',paddingLeft:10}}>{userdata?.Email}</Text>
              </View>
             <View style={{paddingTop:10,paddingBottom:5}}>
              <Text style={{fontSize:24,color:"#000",fontWeight:'500'}}>Bike info :</Text>
             </View>
             <View style={{gap:5}}>
              <Text style={{color:'#000',fontSize:18,textTransform:'capitalize',fontWeight:'500'}}>Bike Name : </Text>
             <Text
                style={{
                  color: '#FDA403',
                  fontSize: 18,
                  textTransform: 'capitalize',
                  fontWeight: '500',
                }}>
                {BIKEDATA?.bikename}
              </Text>
              <Text style={{color:'#000',fontSize:18,textTransform:'capitalize',fontWeight:'500'}}>Bike description :</Text>
              <Text
                style={{
                  color: '#FDA403',
                  fontSize: 15,
                  textTransform: 'capitalize',
                  fontWeight: '500',
                  letterSpacing: 1.5,
                }}>
                {BIKEDATA?.description}
              </Text>
             </View>
             <View style={{marginBottom:200,marginTop:5,gap:5}}>
              <Text style={{color:"#000",fontSize:18,fontWeight:'600',textTransform:'capitalize'}}>BIKE Image :</Text>
              <Image source={{uri:BIKEDATA?.image}} style={{width:'95%',height:'40%',borderRadius:30}}/>
             </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopWidth: 1,
          borderColor: color?.DIVIDER_COLOR,
        }}>
        <View style={{paddingLeft: 20, gap: 3}}>
          <Text
            style={{
              color: '#000',
              fontWeight: '800',
              fontSize: 18,
              textTransform: 'capitalize',
            }}>
            price :
          </Text>
          <Text
            style={{
              color: '#FDA403',
              fontWeight: '800',
              fontSize: 18,
              textTransform: 'capitalize',
            }}>
            {BIKEDATA?.price}
          </Text>
        </View>
        <View
          style={{
            width: wp('50%'),
            paddingRight: 20,
            borderWidth: 1,
            borderColor: '#FDA403',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <TouchableOpacity style={{padding: 4}}
          onPress={()=>Checkvalidationfun()}
          >
            <Text
              style={{
                color: '#FDA403',
                fontWeight: '800',
                fontSize: 18,
                textTransform: 'capitalize',
              }}>
              Book your bike
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payments_screen;

const styles = StyleSheet.create({});
