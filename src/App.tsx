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
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import type { TodoItemType } from './types';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [id, setId] = useState(1);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [text, setText] = useState('');

  const [list, setList] = useState<TodoItemType[]>([]);

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

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={backgroundStyle}>
        <Header />

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
