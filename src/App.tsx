/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import type { TodoItemType } from './types';

function App(): JSX.Element {
  if(Platform.OS === 'android'){
    console.log('android app')
  }else if(Platform.OS === 'ios'){
    console.log('ios app')
  }

  const isDarkMode = useColorScheme() === 'dark';

  const [id, setId] = useState(1);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [text, setText] = useState('');

  const [list, setList] = useState<TodoItemType[]>([]);

  const [hideStatusBar, setStatusBar] = useState(false)

  const submit = () => {
    setList([
      {
        id: id,
        value: text,
        isDeleted: false,
      },
      ...list,
    ]);
    setText('');
    setId(id + 1);
  };

  const updateItem = (text: string, item: TodoItemType) => {
    setList(
      list.map(v => {
        if (v.id === item.id) {
          item.value = text;
        }
        return v;
      }),
    );
  };

  const removeItem = (item: TodoItemType) => {
    setList(list.filter(v => v.id !== item.id));
  };

  const finishItem = (item: TodoItemType) => {
    setList(
      list.map(v => {
        if (v.id === item.id) {
          item.isDeleted = !item.isDeleted;
        }
        return v;
      }),
    );
  };

  const createTwoButtonAlert = () => {
    Alert.alert(
      "warning title",
      "warning content",
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('You press Cancel');
          },
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => {
            console.log('You press Confirm');
          },
          style: 'default'
        }
      ]
    )
  }

  const createThreeButtonAlert = () => {
    Alert.alert(
      "warning title",
      "warning content",
      [
        {
          text: 'Later',
          onPress: () => {
            console.log('You press Later');
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            console.log('You press Cancel');
          },
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => {
            console.log('You press Confirm');
          },
          style: 'default'
        }
      ]
    )
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        hidden={hideStatusBar}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={backgroundStyle}>
        <Header />

        {/* Can not use style property in Button */}
        <Button title="Two Func Button" onPress={createTwoButtonAlert} color="green"></Button>
        <Button title="Three Func Button" onPress={createThreeButtonAlert} color="tomato"></Button>
        <Switch trackColor={{ false:'red', true: 'green' }} thumbColor={!hideStatusBar?'grey':'blue'} value={hideStatusBar} onValueChange={() => setStatusBar(!hideStatusBar)}></Switch>

        {/* large/small size can be effective in Android and iOS */}
        <ActivityIndicator color="#00d00f" size={'large'}/>
        <ActivityIndicator color="#00d00f" size={'small'}/>
        {/* number size only be effective in Android */}
        <ActivityIndicator color="#00d00f" size={20}/>
        <ActivityIndicator color="#00d0ff" size={50}/>

        <Image source={require('./assets/a.png')} style={styles.itemImage}/>

        <View
          style={[
            styles.container,
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }
          ]}>
          <TextInput
            style={styles.todoItemCreate}
            value={text}
            placeholder="请输入内容"
            onChangeText={text => setText(text)}
            onSubmitEditing={submit}
          />

          {list.length > 0 && (
            <View style={styles.todoList}>
              {list.map(item => (
                <TodoItem
                  key={item.id}
                  data={item}
                  finish={finishItem}
                  update={updateItem}
                  remove={removeItem}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemImage: {
    height: 200,
    width: Dimensions.get('window').width,
    marginVertical: 20
  },
  container: {
    marginHorizontal: 20,
    padding: 10,
  },
  todoItemCreate: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  todoList: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
  },
});

export default App;
