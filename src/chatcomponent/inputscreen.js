import React, { useState } from 'react';
import { View, ScrollView, TextInput, StyleSheet } from 'react-native';

const ScrollableTextInput = ({ placeholder,value,onChangeText }) => {
  const [textSize, setTextSize] = useState(0);

  const handleContentSizeChange = (event) => {
    const { contentSize } = event.nativeEvent;
    setTextSize(contentSize.height);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { height: Math.max(2, textSize) }]}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
        >
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            multiline={true}
            value={value}
            onChangeText={onChangeText}
            onContentSizeChange={handleContentSizeChange}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius:10,
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

export default ScrollableTextInput;