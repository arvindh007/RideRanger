import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import color from '../../constant/color/color'
import Secondarybuttom from '../../components/button'

const Qrcode_Screen = ({navigation,route}) => {

    let BIKEDATA = route.params.bikedata;
    let NAME = route.params.name;
    let ADDRESS = route.params.Address;
    let userdata = route.params.USERDATA;
    useEffect(() => {
      setTimeout(() => {
        navigation.navigate("thankyou",{bikedata:BIKEDATA,name:NAME,Address:ADDRESS,USERDATA:userdata})
      }, 500000);
    },[]);
    const handleSubmit = ()=>{
        navigation.navigate("thankyou",{bikedata:BIKEDATA,name:NAME,Address:ADDRESS,USERDATA:userdata})
    }
    
  return (
   <SafeAreaView style={{flex:1,backgroundColor:color?.WHITE,padding:10}}>
    <View style={{flex:1}}>
    <View style={{alignItems:"center"}}>
        <Text style={{fontSize:24,color:"#000",fontWeight:'500',textTransform:"capitalize"}}>scan to pay </Text>
    </View>
    <View style={{width:"100%",height:"55%",marginTop:40}}>
        <Image source={{uri:"https://th.bing.com/th/id/OIP.GtEo127m_vzHw4SOcz0B6gHaHa?rs=1&pid=ImgDetMain"}} style={{width:"100%",height:"100%",borderRadius:5}}/>
    </View>

    </View>
    <View>
        <Secondarybuttom buttonlabel="continue" onpress1={()=>handleSubmit()}/>
    </View>
   </SafeAreaView>
  )
}

export default Qrcode_Screen

const styles = StyleSheet.create({})