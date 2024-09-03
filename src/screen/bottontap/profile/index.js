import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import firestore from '@react-native-firebase/firestore';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import RBSheet from 'react-native-raw-bottom-sheet';

const ProfilePage = ({route}) => {
  const getdata =route.params.getData 


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
    const handleLogout = async () => {
      const keysToRemove = ['USER_PHONENUMBER', 'USER_ID', 'USER_DATA'];
      async function clearMultipleValues(keys) {
        try {
          await Promise.all(keys.map(async (key) => {
            await AsyncStorage.removeItem(key);
          }));
          console.log('All values cleared successfully.');
          getdata()
  
        } catch (error) {
          console.error('Error clearing values:', error);
        }
      }
      try {  
        clearMultipleValues(keysToRemove);
  
  
        console.log('User signed out successfully');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }; 

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff',padding:20}}>
      <View style={{flex:1}}>

        <View style={{marginLeft:wp("24.%"),width:wp("40%"),height:hp("20%")}}>
            <Image source={{uri:userdata?.Profile_pic}} style={{width:"100%",height:'100%',backgroundColor:'gray',borderRadius:80}} resizeMode="stretch" />
        </View>
        <View style={{gap:10,alignItems:'flex-start',marginTop:hp("2%")}}>
          <View style={{gap:5}}>
          <Text style={{fontSize:19,color:'#000',fontWeight:'500',textTransform:'capitalize',fontStyle:'italic',opacity:0.6}}>name :</Text>
          <Text style={{fontSize:19,color:'#FDA403',fontWeight:'500',textTransform:'capitalize',paddingLeft:hp("5%")}}>{userdata?.Name}</Text>
         </View>
          <View style={{gap:5}}>
          <Text style={{fontSize:19,color:'#000',fontWeight:'500',textTransform:'capitalize',fontStyle:'italic',opacity:0.6}}>Phonenumber :</Text>
          <Text style={{fontSize:19,color:'#FDA403',fontWeight:'500',textTransform:'capitalize',paddingLeft:hp("5%")}}>{userdata?.Phonenumber}</Text>
         </View>
          <View style={{gap:5}}>
          <Text style={{fontSize:19,color:'#000',fontWeight:'500',textTransform:'capitalize',fontStyle:'italic',opacity:0.6}}>Email :</Text>
          <Text style={{fontSize:19,color:'#FDA403',fontWeight:'500',textTransform:'capitalize',paddingLeft:hp("5%")}}>{userdata?.Email}</Text>
         </View>
         
        </View>
      </View>

       {/* <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:"#FDA403",borderRadius:10,justifyContent:'center',alignItems:'center',marginBottom:20}}>
        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
        <MaterialCommunityIcons
                          name={"account-edit"}
                          size={25}
                         color={"#FDA403"}
                         
                        />
        <Text style={{color:"#FDA403",fontSize:20,textTransform:'capitalize',fontWeight:'500',fontStyle:'italic'}}>Edit profile</Text>
        </View>
       </TouchableOpacity> */}
       <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:"#FDA403",borderRadius:10,justifyContent:'center',alignItems:'center'}}
       onPress={()=>handleLogout()}
       >
        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
        <MaterialCommunityIcons
                          name={"logout"}
                          size={25}
                         color={"#FDA403"}
                         
                        />
        <Text style={{color:"#FDA403",fontSize:20,textTransform:'capitalize',fontWeight:'500',fontStyle:'italic'}}>LOg out</Text>
        </View>
       </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ProfilePage

const styles = StyleSheet.create({})