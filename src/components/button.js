import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Secondarybuttom = ({buttonlabel,onpress1,disabled,loader}) => {
    const buttonStyle = disabled == true ? styles.disabledButton : disabled == false ? styles.Primarybuttomcontainer : styles.Primaryrrbuttomcontainer;
  return (
    <View>
        <TouchableOpacity style={buttonStyle} onPress={onpress1} disabled={disabled}>
          {loader?
        <View style={{marginRight:10,alignItems:'center',justifyContent:'center'}}>
              <ActivityIndicator size="small" color="#fff" />
          </View>:null}
            <Text style={styles.Primarybuttomtext}>
            {buttonlabel}
            </Text>
        </TouchableOpacity>
     
    </View>
  )
}

export default Secondarybuttom

const styles = StyleSheet.create({
    Primarybuttomcontainer:{
        borderRadius:41,
        backgroundColor:"blue",
        alignItems:"center",
        justifyContent:'center',
        flexDirection:"row",
        padding: 16
    },
    disabledButton:{
        borderRadius:41,
        backgroundColor:"#FDA403",
        opacity:0.3,
        alignItems:"center",
        justifyContent:'center',
        flexDirection:"row",
        padding: 16

    },
    Primaryrrbuttomcontainer:{
        borderRadius:41,
        backgroundColor:"#FDA403",
        alignItems:"center",
        justifyContent:'center',
        flexDirection:"row",
        padding: 16
    },
    Primarybuttomtext:{
        color:"#fff",
        fontSize:20,
        fontWeight:"700",textTransform:'capitalize'
    }
})