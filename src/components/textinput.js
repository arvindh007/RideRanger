import {Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Textinputcomponents = ({
  placeholder,
  onchangetext,
  keyboardType,
  value,
  onKeyPress,
  errors,
  label,
  onchange,
  onFocus,
  onBlur,
  maxLength,
  iconname,
  secureTextEntry,
  errorlabel,
  icononpress
}) => {
  return (
    <View style={{gap: 4}}>
      {label ? (
        <View>
          <Text style={styles.labletext}>{label}</Text>
        </View>
      ) : null}

      {placeholder ? (
        <View>
          <View style={{borderColor: !errors ? "#000" : "red",borderWidth:1,borderRadius:10,flexDirection:'row',alignItems:'center'}}>
            <View style={{marginLeft:"2%"}}> 
            <Pressable onPress={icononpress}>

            <MaterialCommunityIcons
                          name={iconname}
                          size={25}
                         color={errors ?"red":"#000"}
                         
                        />
            </Pressable>
                        </View>
            <TextInput
            onKeyPress={onKeyPress}
              placeholder={placeholder}
              style={styles.textinput}
              onChangeText={onchangetext}
              keyboardType={keyboardType}
              value={value}  
              onChange={onchange}
              onFocus={onFocus}
              onBlur={onBlur}
              maxLength={maxLength}
              secureTextEntry={secureTextEntry}
              

              
            />
          </View>
          {/* {errors && <Text style={styles.Errortext}>{errors}</Text>} */}
          {errors ? <Text style={styles.Errortext}>{errorlabel}</Text>: <Text style={styles.Errortext}>   </Text> }
        </View>
      ) : null}
    </View>
  );
};

export default Textinputcomponents;

const styles = StyleSheet.create({
  labletext: {
    fontSize: 20,
    color: "#000"
  },
  textinput: {
    borderRadius: 20,
    padding: 10,
  },
  Errortext: {
    marginTop: 7,
    marginLeft: 5,
    color: 'red',
    fontSize: 15,
    marginBottom:5,
    textTransform:'capitalize'
  },
});