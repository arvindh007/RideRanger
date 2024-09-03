import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Searchbarcomponents from '../../../components/search';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import color from '../../../constant/color/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

const Homefrontpage = ({navigation}) => {
  const [userinput, setUserinput] = useState('');
  const Itemdata = [
    {
      icon: 'tshirt-crew',
      name: 'YAMAHA',
      id: 6,
    },
    {
      icon: 'tshirt-crew',
      name: '    KTm    ',
      id: 7,
    },
    {
      icon: 'tshirt-crew',
      name: '     TVS     ',
      id: 8,
    },
    {
      icon: 'tshirt-crew',
      name: '  HOnda  ',
      id: 9,
    },
    {
      icon: 'tshirt-crew',
      name: '  hero   ',
      id: 10,
    },
  ];
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FDA403',
        marginLeft: 10,
      }} onPress={()=>{
        navigation.navigate("categries")
      }}>
      <MaterialCommunityIcons name={'bike'} color={'#FDA403'} size={26} />
      <Text
        style={{
          color: '#000',
          textTransform: 'uppercase',
          fontWeight: '800',
          fontSize: 13,
        }}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
  const upcoming = ({item}) => (
    <TouchableOpacity
      style={{
       
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        padding:2,
        
        borderColor: '#FDA403',
        marginLeft: 10,
        marginBottom:10,
        width:wp("45%"),
        height:hp("20%")
      }} onPress={()=>{ navigation.navigate("categries")}}>
       <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="stretch"
            />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          gap: 5,
        }}>
        <Searchbarcomponents
          placeholder="Search Product"
          onchange={text => {
            setUserinput(text),
              // Handlesearch(text);
              console.log(text, 'oo');
          }}
          value={userinput}
        />
        <TouchableOpacity
          style={{
            marginLeft: '0%',
            borderRadius: 30,
            backgroundColor: color?.SEARCH_BACKGROUND,
            padding: 10,
          }} 
          onPress={()=>navigation.navigate("Modals")}
           >
          <AntDesign
            name="shoppingcart"
            size={25}
            color={color?.DATETEXT_COLOR}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{gap: 10}}>
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          activeDotColor="#FDA403"
          loop={true}
          autoplay={true}>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </Swiper>

        <View
          style={{
            marginTop: hp('2%'),
            marginBottom: hp('2%'),
            paddingLeft: 10,
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: '800',
              textTransform: 'uppercase',
            }}>
            {' '}
            various Brand
          </Text>
        </View>
        <FlatList
          data={Itemdata}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={1}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View
          style={{
            marginTop: hp('3%'),
            marginBottom: hp('1%'),
            paddingLeft: 10,
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: '800',
              textTransform: 'uppercase',
            }}>
            {' '}
            UPcoming Bikes
          </Text>
        </View>
        <FlatList
          data={Itemdata}
          renderItem={upcoming}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

export default Homefrontpage;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius:10
  },
  wrapper: {
    height: hp('35%'),
  },
  slide1: {
    height: hp('35%'),
    justifyContent: 'center',
    alignItems: 'center',
    //   backgroundColor: '#9DD6EB'
  },
});
