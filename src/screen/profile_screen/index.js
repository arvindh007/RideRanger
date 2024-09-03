import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import uuid from 'react-native-uuid';

const Bookingpage = ({navigation, route}) => {
  let BIKEDATA = route.params.bikes;
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
        navigation.navigate("Modals")
      })
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
       <View style={{flex:1}}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name={'arrow-left'}
              size={35}
              color="#000"
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: '#000',
              fontWeight: '700',
              textTransform: 'uppercase',
            }}>
            {BIKEDATA?.bikename}
          </Text>
        </View>
      </View>
      <ScrollView>

    
      <View style={{width: wp('95%'), height: hp('35%'), marginTop: 15}}>
        <Image
          source={{uri: BIKEDATA?.image}}
          style={{width: '100%', height: '100%', borderRadius: 10}}
          resizeMode="stretch"
        />
      </View>
      <View style={{gap: 10, marginTop: 20}}>
        <View style={{gap: 5}}>
          <Text
            style={{
              color: '#000',
              textTransform: 'uppercase',
              fontSize: 20,
              opacity: 0.5,
              fontWeight: '700',
            }}>
            BRAND :{'  '}
          </Text>
          <Text
            style={{
              color: '#FDA403',
              textTransform: 'uppercase',
              fontSize: 20,
              fontWeight: '700',
              marginLeft: 60,
            }}>
            {BIKEDATA?.Brand}
          </Text>
        </View>
        <View style={{gap: 5}}>
          <Text
            style={{
              color: '#000',
              textTransform: 'uppercase',
              fontSize: 20,
              opacity: 0.5,
              fontWeight: '700',
            }}>
            price :{'  '}
          </Text>
          <Text
            style={{
              color: '#FDA403',
              textTransform: 'uppercase',
              fontSize: 20,
              fontWeight: '700',
              marginLeft: 60,
            }}>
            {BIKEDATA?.price}
          </Text>
        </View>
        <View style={{gap: 5 ,marginBottom:20}}>
          <Text
            style={{
              color: '#000',
              textTransform: 'uppercase',
              fontSize: 20,
              opacity: 0.5,
              fontWeight: '700',
            }}>
            description :{'  '}
          </Text>
          <Text
            style={{
              color: '#FDA403',
              textTransform: 'capitalize',
              fontSize: 18,
              fontWeight: '700',
              marginLeft: 20,
            }}>
            {BIKEDATA?.description}
          </Text>
        </View>
      </View>
      </ScrollView>
     </View>
      <TouchableOpacity style={{padding:15,alignItems:'center',justifyContent:'center',backgroundColor:"#FDA403",borderRadius:10}}
      //  onPress={()=>Bookingbike(BIKEDATA)}
      onPress={()=>navigation.navigate("paymentsscreen",{bikedata:BIKEDATA})}
      >
        <Text style={{color:'#fff',fontSize:20,fontWeight:'700',textTransform:'capitalize'}}>Book your bike</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Bookingpage;

const styles = StyleSheet.create({});
