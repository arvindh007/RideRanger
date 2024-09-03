import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BlurView} from '@react-native-community/blur';


const CategriesPage = ({navigation}) => {
  const Itemdata = [
    {
      bikename: 'Yamaha MT 15',
      price:"1.73 Lakh",
      Brand: 'YAMAHA',
      id: 1,
      image:"https://bd.gaadicdn.com/processedimages/yamaha/mt-15-2-0/source/mt-15-2-062e4b1e2d187c.jpg",
      description:"Yamaha MT 15 is a motorcycle that comes with a price tag ranging between Rs.1.68 to Rs. 1.73 Lakh.  Yamaha MT 15 is available in 3 variants and 7 colours.MT 15 V2 is powered by a 155 cc bs6-2.0 engine. MT 15 V2 has Disc front brakes and Disc rear brakes.MT 15 V2 weigths 141 kg and has a fuel tank capacity of 10 L."
    },
    
    {
      bikename: 'Pulsar NS200',
      price:"1.57 Lakh",
      Brand: 'Bajaj',
      id: 2,
      image:"https://bd.gaadicdn.com/processedimages/bajaj/bajaj-pulsar-200-ns/source/bajaj-pulsar-200-ns65e02b4377ce9.jpg",
      description:"Bajaj Pulsar NS200 is a motorcycle that comes with a price tag of Rs.1.57 Lakh.  Bajaj Pulsar NS200 is available in 1 variant and 4 colours.Pulsar NS200 is powered by a 199.5 cc bs6-2.0 engine. Pulsar NS200 has Disc front brakes and Disc rear brakes.Pulsar NS200 weigths 158 kg and has a fuel tank capacity of 12 L."
    },
    {
      bikename: 'KTM Duke 200',
      price:"1.97 Lakh",
      Brand: 'KTM',
      id: 3,
      image:"https://bd.gaadicdn.com/processedimages/ktm/ktm-duke/source/ktm-duke64900023cc5e6.jpg",
      description:'KTM Duke 200 is a motorcycle that comes with a price tag of Rs.1.97 Lakh.  KTM Duke 200 is available in 1 variant and 2 colours.Duke 200 is powered by a 200 cc bs6-2.0 engine. Duke 200 has Disc front brakes and Disc rear brakes.Duke 200 weigths 159 kg and has a fuel tank capacity of 13.4 L.'
    },
    {
      bikename: 'Ninja ZX-10R',
      price:"16.63 Lakh",
      Brand: 'Kawasaki',
      id: 4,
      image:"https://bd.gaadicdn.com/processedimages/kawasaki/kawasaki-ninja-zx-10r/source/kawasaki-ninja-zx-10r63198dfedf6bb.jpg",
      description:'Kawasaki Ninja ZX-10R is a motorcycle that comes with a price tag of Rs.16.63 Lakh.  Kawasaki Ninja ZX-10R is available in 1 variant and 2 colours.Ninja ZX-10R is powered by a 998 cc bs6-2.0 engine. Ninja ZX-10R has Double Disc front brakes and Disc rear brakes.Ninja ZX-10R weigths 207 kg and has a fuel tank capacity of 17 L.'
    },
    {
      bikename: 'BMW S 1000 RR',
      price:"20-24 Lakh",
      Brand: 'BMW',
      id: 5,
      image:"https://bd.gaadicdn.com/processedimages/bmw/s1000rr/source/s1000rr639452adaefdb.jpg",
      description:'BMW S 1000 RR is a motorcycle that comes with a price tag ranging between Rs.20.50 to Rs. 24.95 Lakh.  BMW S 1000 RR is available in 3 variants and 3 colours.S 1000 RR is powered by a 999 cc bs6 engine. S 1000 RR has Disc front brakes and Disc rear brakes.S 1000 RR weigths 197 kg and has a fuel tank capacity of 16.5 L.'
    }, 
  ];
  const mileage = [
    {
      bikename:"Splendor" ,
      price:"0.90 lakh",
      Brand: "Hero",
      id:1,
      image:"https://bd.gaadicdn.com/processedimages/hero-motocorp/hero-motocorp-splendor/source/hero-motocorp-splendor6594ef508d3db.jpg",
      description:"Hero Splendor Plus is a motorcycle that comes with a price tag ranging between Rs.75,141 to Rs. 77,986.  Hero Splendor Plus is available in 3 variants and 7 colours.Splendor Plus is powered by a 97.2 cc bs6-2.0 engine. Splendor Plus has Drum front brakes and Drum rear brakes.Splendor Plus weigths 112 kg and has a fuel tank capacity of 9.8 L."
    },
    {
      bikename:"Honda SP 125" ,
      price:"0.80 lakh",
      Brand: "Honda",
      id:2,
      image:"https://bd.gaadicdn.com/processedimages/honda/sp-125/source/sp-125646c75d0667b8.jpg",
      description:"Honda SP 125 is a motorcycle that comes with a price tag ranging between Rs.86,017 to Rs. 90,567.  Honda SP 125 is available in 3 variants and 7 colours.SP 125 is powered by a 123.94 cc bs6-2.0 engine. SP 125 has Disc front brakes and Drum rear brakes.SP 125 weigths 116 kg and has a fuel tank capacity of 11.2 L."
    },
    {
      bikename:"Pulsar 125" ,
      price:"0.8 lakh",
      Brand: "Bajaj",
      id:3,
      image:"https://bd.gaadicdn.com/processedimages/bajaj/pulsar-125/source/pulsar-12564dc528bd012b.jpg",
      description:"Bajaj Pulsar 125 is a motorcycle that comes with a price tag ranging between Rs.80,416 to Rs. 94,138.  Bajaj Pulsar 125 is available in 3 variants and 5 colours.Pulsar 125 is powered by a 124.4 cc bs6-2.0 engine. Pulsar 125 has Drum front brakes and Drum rear brakes.Pulsar 125 weigths 140 kg and has a fuel tank capacity of 11.5 L."
    },
    {
      bikename:"TVS Radeon" ,
      price:"0.8 lakh",
      Brand: "TVS",
      id:4,
      image:"https://bd.gaadicdn.com/processedimages/tvs/radeon/source/radeon62fdf336501e1.jpg",
      description:"TVS Radeon price starts from Rs.62,405 onwards, available in 3 variants and 7 colours. TVS Radeon is powered by a 109.7 cc bs6-2.0 engine & reported 73.68 kmpl mileage. It comes with 116 kg weight and 10 L fuel tank capacity along with Disc front brakes and Drum rear brakes."
    },
  ]
  const offroad = [
    {
      bikename:"Himalayan 450" ,
      price:"2.75-3 lakh",
      Brand: "Royal Enfield",
      id:1,
      image:"https://bd.gaadicdn.com/processedimages/royal-enfield/himalayan-450/source/himalayan-4506565cc8f0ef04.jpg",
      description:"Royal Enfield Himalayan 450 is a motorcycle that comes with a price tag ranging between Rs.2.85 to Rs. 2.98 Lakh.  Royal Enfield Himalayan 450 is available in 4 variants and 5 colours.Himalayan 450 is powered by a 452 cc bs6-2.0 engine. Himalayan 450 has Disc front brakes and Disc rear brakes.Himalayan 450 weigths 196 kg and has a fuel tank capacity of 17 L."
    },
    {
      bikename:"XPulse 200 4V" ,
      price:"1.53 Lakh",
      Brand: "Hero",
      id:2,
      image:"https://bd.gaadicdn.com/processedimages/hero/xpulse-200/source/xpulse-2006464ccccd02ec.jpg",
      description:"Hero XPulse 200 4V is a motorcycle that comes with a price tag ranging between Rs.1.46 to Rs. 1.53 Lakh.  Hero XPulse 200 4V is available in 2 variants and 4 colours.XPulse 200 4 V is powered by a 199.6 cc bs6-2.0 engine. XPulse 200 4 V has Disc front brakes and Disc rear brakes.XPulse 200 4 V weigths 159 kg and has a fuel tank capacity of 13 L."
    },
    {
      bikename:"BMW G 310 GS" ,
      price:"3.30 Lakh",
      Brand: "BMW",
      id:3,
      image:"https://bd.gaadicdn.com/processedimages/bmw/g-310-gs/source/g-310-gs6076cf9be9a19.jpg",
      description:"BMW G 310 GS is a motorcycle that comes with a price tag of Rs.3.30 Lakh.  BMW G 310 GS is available in 1 variant and 3 colours.G 310 GS is powered by a 313 cc bs6-2.0 engine. G 310 GS has Disc front brakes and Disc rear brakes.G 310 GS weigths 169.5 kg and has a fuel tank capacity of 11 L."
    },
    {
      bikename:"Honda CB200X" ,
      price:"1.47 Lakh",
      Brand: "Honda",
      id:3,
      image:"https://bd.gaadicdn.com/processedimages/honda/nx-200/source/nx-2006504136fd707d.jpg",
      description:"Honda CB200X is a motorcycle that comes with a price tag of Rs.1.47 Lakh.  Honda CB200X is available in 1 variant and 4 colours.CB200X is powered by a 184.4 cc bs6-2.0 engine. CB200X has Disc front brakes and Disc rear brakes.CB200X weigths 147 kg and has a fuel tank capacity of 12 L."
    }
  ]
  const renderItem = ({item}) => (
    <View
      style={{
        width:wp("60%"),
        height:hp("40%"),
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FDA403',
        marginLeft: 10,
        gap:15
      }} >
      {/* <MaterialCommunityIcons name={'bike'} color={'#FDA403'} size={26} /> */}
      <Image
              source={{
                uri:item?.image,
              }}
              style={styles.image1}
              resizeMode="stretch"
            />
            <View style={{gap:5,alignContent:'center'}}>

      <Text
        style={{
          color: '#FDA403',
          textTransform: 'uppercase',
          fontWeight: '800',
          fontSize: 20,
        }}>
        {item?.bikename}
      </Text>
      <Text
        style={{
          color: '#FDA403',
          textTransform: 'capitalize',
          fontWeight: '800',
          fontSize: 15,
        }}>
        onroad price :{item?.price}
      </Text>
      
            </View>
            <TouchableOpacity style={{borderColor:'#FDA403',borderWidth:1,borderRadius:10,alignItems:'center',justifyContent:'center',padding:10 }}
           onPress={()=>navigation.navigate("bookingpage",{bikes:item})}>
        <Text style={{color:'#FDA403',fontSize:16}}>Book your Bike</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: 10}}>
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            fontWeight: '600',
            fontStyle: 'italic',
          }}>
          Trending bikes collections...
        </Text>
      </View>
      <ScrollView>
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          activeDotColor="#FDA403"
          loop={true}
          autoplay={true}
        >
         

          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
            {/* <BlurView
              style={styles.absolute222}
              blurType="dark"
              blurAmount={2}
              reducedTransparencyFallbackColor="white">
              <Text
                style={{
                  fontSize: 40,
                  color: '#FDA403',
                  opacity: 0.6,
                  fontWeight: '700',
                  fontStyle: 'italic',
                  position:'absolute',
                  bottom:wp("28%"),left:wp("20%")
                }}>
                Most Popular
              </Text>
              
            </BlurView> */}
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
            {/* <BlurView
              style={styles.absolute222}
              blurType="dark"
              blurAmount={2}
              reducedTransparencyFallbackColor="white">
              <Text
                style={{
                  fontSize: 40,
                  color: '#FDA403',
                  opacity: 0.6,
                  fontWeight: '700',
                  fontStyle: 'italic',
                  position:'absolute',
                  bottom:wp("28%"),left:wp("20%")
                }}>
                Sports Bikes
              </Text>
              
            </BlurView> */}
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
            {/* <BlurView
              style={styles.absolute222}
              blurType="dark"
              blurAmount={2}
              reducedTransparencyFallbackColor="white">
              <Text
                style={{
                  fontSize: 40,
                  color: '#FDA403',
                  opacity: 0.6,
                  fontWeight: '700',
                  fontStyle: 'italic',
                  position:'absolute',
                  bottom:wp("28%"),left:wp("15%")
                }}>
                Off Road Bikes
              </Text>
              
            </BlurView> */}
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
            {/* <BlurView
              style={styles.absolute222}
              blurType="dark"
              blurAmount={2}
              reducedTransparencyFallbackColor="white">
              <Text
                style={{
                  fontSize: 40,
                  color: '#FDA403',
                  opacity: 0.6,
                  fontWeight: '700',
                  fontStyle: 'italic',
                  position:'absolute',
                  bottom:wp("28%"),left:wp("20%")
                }}>
              Best Mileage 
              </Text>
              
            </BlurView> */}
          </View>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/OIP.Oz9bmed2RdbWcu5TIvcDBAHaEo?rs=1&pid=ImgDetMain',
              }}
              style={styles.image}
              resizeMode="contain"
            />
            {/* <BlurView
              style={styles.absolute222}
              blurType="dark"
              blurAmount={2}
              reducedTransparencyFallbackColor="white">
              <Text
                style={{
                  fontSize: 40,
                  color: '#FDA403',
                  opacity: 0.6,
                  fontWeight: '700',
                  fontStyle: 'italic',
                  position:'absolute',
                  bottom:wp("28%"),left:wp("20%")
                }}>
                Cruiser Bikes
              </Text>
              
            </BlurView> */}
          </View>
        </Swiper>

          
          <View style={{padding:10}}>
            <Text
              style={{
                color: '#000',
                fontSize: 25,
                fontWeight: '600',
                fontStyle: 'italic',
                textTransform: 'capitalize',
              }}>
              Sports BIke
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
          <View style={{padding:10}}>
            <Text
              style={{
                color: '#000',
                fontSize: 25,
                fontWeight: '600',
                fontStyle: 'italic',
                textTransform: 'capitalize',
              }}>
             Off Road Bikes
            </Text>
         
          
          
        </View>
        <FlatList
          data={offroad}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={1}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
          <View style={{padding:10}}>
            <Text
              style={{
                color: '#000',
                fontSize: 25,
                fontWeight: '600',
                fontStyle: 'italic',
                textTransform: 'capitalize',
              }}>
              Best Mileage Bikes
            </Text>
         
          
          
        </View>
        <FlatList
          data={mileage}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={1}
          horizontal
          showsHorizontalScrollIndicator={false}
        />      
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategriesPage;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  image1: {
    width: '100%',
    height: '50%',
    borderRadius: 10,
  },
  wrapper: {
    height: hp('35%'),
  },
  slide1: {
    height: hp('35%'),
    justifyContent: 'center',
    alignItems: 'center',
    // position:'relative'
    //   backgroundColor: '#9DD6EB'
  },
  absolute222: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
