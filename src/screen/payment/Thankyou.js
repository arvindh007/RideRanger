import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from '../../constant/color/color';
import Secondarybuttom from '../../components/button';

const Thankyou_Screen = ({navigation,route}) => {
    let BIKEDATA = route.params.bikedata;
    let NAME = route.params.name;
    let ADDRESS = route.params.Address;
    let userdata = route.params.USERDATA;
  return (
    <SafeAreaView style={{flex:1,backgroundColor:color?.WHITE,padding:10}}>
        <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:10}}>
            <Text style={{color:color?.GREEN,fontSize:30,textTransform:"capitalize",fontWeight:"600"}}>bike Booked 😊</Text>
            <Text style={{color:"#000",fontSize:20,textTransform:"capitalize",fontWeight:'500'}}>your {BIKEDATA?.bikename} is on the way </Text>
        </View>
        <View>
        <Secondarybuttom buttonlabel="view the collection" onpress1={()=>navigation?.navigate("Modals")}/>
        </View>
    </SafeAreaView>
  )
}

export default Thankyou_Screen

const styles = StyleSheet.create({})