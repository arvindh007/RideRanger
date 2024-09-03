import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import Secondarybuttom from '../../components/button';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Productpage = ({navigation}) => {
  const [userdata, setuserdata] = useState([]);
  const GETUSERDATA = async () => {
    try {
      const USER_ID = await AsyncStorage.getItem('USER_ID');
      const USERID = JSON.parse(USER_ID);

      const unsubscribe = firestore()
        .collection('userdata')
        .doc(USERID)
        .collection('collections')
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(), // Assuming each document contains data fields
          }));
          setuserdata(data);
          console.log('data', data);
        });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    GETUSERDATA();
  }, []);
  const cancelorder =async(item)=>{
    const USER_ID = await AsyncStorage.getItem('USER_ID');
    const USERID = JSON.parse(USER_ID);
    firestore()
    .collection("userdata")
    .doc(USERID)
    .collection("collections")
    .doc(item?.id)
    .delete()
    .then(()=>{
      console.log("delete");
    })
  }
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{gap: 10, alignItems: 'center', marginTop: hp('3%')}}>
        <Text
          style={{
            fontSize: 35,
            color: '#000',
            fontWeight: '700',
            textTransform: 'capitalize',
          }}>
          booked bikes
        </Text>
        <ScrollView>
          {userdata.map(item => (
            <View
              key={item.id}
              style={{
                borderWidth: 1,
                borderColor: '#FDA403',
                borderRadius: 10,
                padding: 5,
                marginBottom: 10,
              }}>
              <View style={{flexDirection: 'row', width: wp('93%')}}>
                <View style={{width: wp('27%'), height: hp('17%')}}>
                  <Image
                    source={{uri: item?.bikecollection?.image}}
                    style={{width: '100%', height: '100%', borderRadius: 10}}
                    resizeMode="stretch"
                  />
                </View>
                <View style={{marginLeft: 10, marginTop: 5}}>
                  <Text
                    style={{
                      color: '#000',
                      textTransform: 'capitalize',
                      fontSize: 17,
                      fontWeight: '500',
                    }}>
                    brand :{' '}
                    <Text style={{color: '#FDA403'}}>
                      {item?.bikecollection?.Brand}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      textTransform: 'capitalize',
                      fontSize: 17,
                      fontWeight: '500',
                    }}>
                    bikename :{' '}
                    <Text style={{color: '#FDA403'}}>
                      {item?.bikecollection?.bikename}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      textTransform: 'capitalize',
                      fontSize: 17,
                      fontWeight: '500',
                    }}>
                    price :{' '}
                    <Text style={{color: '#FDA403'}}>
                      {item?.bikecollection?.price}
                    </Text>
                  </Text>
                  <TouchableOpacity style={{flexDirection:'row',marginTop:10,marginBottom:5,alignItems:'center'
                  ,width:wp("60%"),height:hp("6%"),justifyContent:'center',borderWidth:1,borderRadius:10,borderColor:'red'}}
                   onPress={()=>cancelorder(item)}
                  >
                  <MaterialCommunityIcons
                    name={'delete'}
                    color="red"
                    size={30}
                  />
                  <Text style={{color:"red",fontSize:17,textTransform:'capitalize'}}>order cancel</Text>

                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Productpage;

const styles = StyleSheet.create({});
