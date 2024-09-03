import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Chatscreen = () => {
  const [textSize, setTextSize] = useState(0);
  const [textchange, setTextchange] = useState('');
  const [audioui, setAudioui] = useState(false);

  const handleContentSizeChange = event => {
    const {contentSize} = event.nativeEvent;
    setTextSize(contentSize.height);
  };
  const messagefunction = text => {
    console.log(text,'888');
    setTextchange(text);
    setAudioui(true);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* header */}
      <View style={{flex: 1}}>
        <Text>aaaaa</Text>
      </View>
      <View style={Chatstyle.chattextinputconatiner}>
        <TouchableOpacity>
          <MaterialIcons name={'add-circle'} color={'#FDA403'} size={35} />
        </TouchableOpacity>
        <View
          style={[Chatstyle.inputContainer, {height: Math.max(2, textSize)}]}>
          <ScrollView
            contentContainerStyle={Chatstyle.scrollViewContent}
            showsVerticalScrollIndicator={true}
            scrollEnabled={true}>
            <TextInput
              style={Chatstyle.input}
              placeholder="messages"
              multiline={true}
              value={textchange}
              onChangeText={text => messagefunction(text)}
              onContentSizeChange={handleContentSizeChange}
            />
          </ScrollView>
        </View>
        {audioui ? (
          <TouchableOpacity>
            <MaterialCommunityIcons
              name={'send-circle'}
              color={'#FDA403'}
              size={35}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Ionicons
              name={'mic-circle'}
              color={'#FDA403'}
              size={35}
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chatscreen;

const Chatstyle = StyleSheet.create({
  chattextinputconatiner: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
    gap: 5,
    // justifyContent:'flex-end'
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 10,
    overflow: 'hidden',
    maxHeight: 100,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  input: {
    flex: 1,
    minHeight: 50,
    maxHeight: 100,
  },
});
