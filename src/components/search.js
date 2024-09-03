import {Image, StyleSheet, Text, View,TextInput} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import color from '../constant/color/color';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Searchbarcomponents = ({onchange, placeholder,value}) => {
  return (
    <View
      style={{
        backgroundColor: color.SEARCH_BACKGROUND,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius:12
      }}>
      <View style={{width:wp('5.6%'),height:hp('2.4%'),marginLeft:12}}>
        <AntDesign name="search1" size={20} color={color?.DATETEXT_COLOR} />
      </View>
      <TextInput
        placeholder={placeholder}
        onChangeText={onchange}
        value={value}
        style={{marginLeft: 12,width:'75%',height:hp("6.7%"),backgroundColor:color.SEARCH_BACKGROUND}}
      />
    </View>
  );
};

export default Searchbarcomponents;

const styles = StyleSheet.create({});