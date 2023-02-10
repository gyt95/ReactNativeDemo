/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [text, setText] = useState('');

  const [list, setList] = useState([])

  const handleSubmit = () => {
    setText('')
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={backgroundStyle}>
        <View>
          <Text style={{
            color: '#0d6efd',
            fontSize: 34,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 40,
          }}>Todo List</Text>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <TextInput
              style={{
                width: '80%',
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              value={text}
              placeholder="请输入内容"
              onChangeText={text=>setText(text)}
              onSubmitEditing={handleSubmit}
            ></TextInput>
            <View>
              {
                list.map(item => (
                  <View>
                    <Text>{item}</Text>
                  </View>
                ))
              }
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
