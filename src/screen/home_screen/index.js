import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Homefrontpage from '../bottontap/homepage';
import ProfilePage from '../bottontap/profile';
// import AddProduct from '../bottontap/addproduct';
import Productpage from '../bottontap/product';
import CategriesPage from '../bottontap/categries';
const HomeScreen = ({getData}) => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FDA403"
      inactiveColor="#000"
      sceneAnimationType="slide-horizontal"
      activeIndicatorStyle={{
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
      }}
      barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="Homefontpage"
        component={Homefrontpage}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          tabBarLabel: 'Home', // Custom tab name
        }}
      />

      <Tab.Screen
        name="categries"
        component={CategriesPage}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="format-list-bulleted-type"
              color={color}
              size={26}
            />
          ),
          tabBarLabel: 'Collections', // Custom tab name
        }}
      />

      <Tab.Screen
        name="Modals"
        component={Productpage}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="cart"
              color={color}
              size={26}
            />
          ),
          tabBarLabel: 'Orders', // Custom tab name
        }}
      />
      {/* <Tab.Screen
        name="addproduct"
        component={AddProduct}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
          tabBarLabel: 'Add new', // Custom tab name
        }}
      /> */}

      <Tab.Screen
        name="profilepage"
        component={ProfilePage}
        initialParams={{ getData }}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
          tabBarLabel: 'Profiles',
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
