/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { ReactPropTypes, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Picker } from '@react-native-picker/picker';
import Swiper from 'react-native-swiper'
import Geolocation from '@react-native-community/geolocation';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import type { TodoItemType } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from './utils/storage';
import { getCity, getWeather } from './api';

const Tab = createBottomTabNavigator();

function HomeScreen(prop: any): JSX.Element {
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

  const [longText, setLongText] = useState('');

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

  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"]
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"]
    }
  ];
  const lists = [
    {
      id: '1',
      title: "Flat1",
    },
    {
      id: '2',
      title: "Flat2",
    },
    {
      id: '3',
      title: 'Flat3'
    },
    {
      id: '4',
      title: 'Flat4'
    },
    {
      id: '5',
      title: 'Flat5'
    }
  ];
  const [selectedId, setSelectedId] = useState('')

  const Item = ({ title }: any) => (
    <View style={styles.SectionListItem}>
      <Text style={styles.SectionListTitle}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }: any) => {
    const backgroundColor = item.id === selectedId ? '#dfb' : '#f9c2ff'
    return (
      <TouchableOpacity style={[styles.SectionListItem, { backgroundColor }]} onPress={() => {
        setSelectedId(item.id)
      }}>
        <Text style={styles.SectionListTitle}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,  // native animate enginee
    }).start(() => {
      // animate callback function
      console.log('finish animate fadeIn')
    });
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,  // native animate enginee
    }).start();
  };

  const [selectedLanguage, setSelectedLanguage] = useState('js');

  const storeData = (value: string) => {
    AsyncStorage.setItem('test', value)
  }

  const getData = async (name: string) => {
    try {
      const value = await AsyncStorage.getItem(name)
      if(value !== null){
        Alert.alert('Success!', value)
      }else{
        Alert.alert('Wrong!', "You don't set this data!")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const addData = (value: string) => {
    Storage.set('test2', value)
  }

  // useEffect(() => ..., []) like lifecycle componentDidMount
  // useEffect must not return anything besides a function, which is used for clean-up.
  // Don't use useEffect(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately
  useEffect(() => {
    const checkLocation = async () => {
      const location = await Storage.get('coords')
      console.log(location);
      if(!location){
        console.log('start getCurrentPosition...');
        
        Geolocation.getCurrentPosition(info => {
          console.log(info)
          Alert.alert('Success!', 'You get the Geolocation')
          Storage.set('coords', JSON.stringify(info.coords))
        },
        // error => Alert.alert('Error!', JSON.stringify(error)),
        error => {
          console.log('Geolocation', error);
        },
        {
          timeout: 30000
        }
        );
      }
    }
    checkLocation();
  }, [])

  const [avatar, setAvatar] = useState('https://avatars.githubusercontent.com/u/23090676?v=4')
  const changeImage = async () => {
    // launchCamera(options?) launchImageLibrary(options?)
    const result = await launchImageLibrary({
      // many options you can see in https://github.com/react-native-image-picker/react-native-image-picker#options
      mediaType: 'mixed'
    });
    console.log(result);
    if(result.assets){
      setAvatar(result.assets[0].uri!)
    }
  }

  
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState('')
  const getCityAndWeather = async () => {
    const location = await getCity();
    console.log('Success!', location);
    setCity(location[0].name)

    const weather = await getWeather();
    console.log('Success!', weather);
    const { text, windDir, temp } = weather.now;
    setWeather(`${text} 风力：${windDir} 温度：${temp}`)
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        hidden={hideStatusBar}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={{backgroundColor: '#dfb'}} horizontal={true}>
        <Text style={{margin: 10, height: 30, width: 50}}>Tab1</Text>
        <Text style={{margin: 10, height: 30, width: 50}}>Tab2</Text>
        <Text style={{margin: 10, height: 30, width: 50}}>Tab3</Text>
        <Text style={{margin: 10, height: 30, width: 50}}>Tab4</Text>
        <Text style={{margin: 10, height: 30, width: 50}}>Tab5</Text>
        <Text style={{margin: 10, height: 30, width: 50}}>Tab6</Text>
        <Text style={{margin: 10, height: 30, width: 50}}>Tab7</Text>
      </ScrollView>
      <ScrollView style={backgroundStyle} contentContainerStyle={{margin: 10}} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.commonTitleText}>Fetch Data</Text>
        <Button title="Fetch City And Weather Data" onPress={getCityAndWeather} />
        <Text style={{fontSize: 22, marginVertical: 10}}>{city} {weather}</Text>

        {/* when using TabNavigator, you may not use prop.navigation.navigate function */}
        {/* <Button title={'Jump to Home Screen'} onPress={() => prop.navigation.navigate('News')} /> */}


        <Text style={styles.commonTitleText}>Button</Text>
        {/* Can not use style property in Button */}
        <Button title="Two Func Button" onPress={createTwoButtonAlert} color="green"></Button>
        <Button title="Three Func Button" onPress={createThreeButtonAlert} color="tomato"></Button>

        <Text style={styles.commonTitleText}>Switch</Text>
        <Switch 
          trackColor={{ false:'red', true: 'green' }} 
          thumbColor={!hideStatusBar?'grey':'blue'} 
          value={hideStatusBar}
          onValueChange={() => setStatusBar(!hideStatusBar)}
        ></Switch>

        <Text style={styles.commonTitleText}>ActivityIndicator(Loading)</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {/* large/small size can be effective in Android and iOS */}
          <ActivityIndicator color="#00d00f" size={'large'}/>
          <ActivityIndicator color="#00d00f" size={'small'}/>
          {/* number size only be effective in Android */}
          <ActivityIndicator color="#00d00f" size={20}/>
          <ActivityIndicator color="#00d0ff" size={50}/>
        </View>
        
        <Text style={styles.commonTitleText}>Image</Text>
        <Image source={require('./assets/a.png')} style={styles.itemImage}/>

        <Text style={styles.commonTitleText}>TextInput - TextArea</Text>
        <TextInput
          style={styles.itemTextarea}
          value={longText}
          placeholder="请输入内容"
          onChangeText={text => setLongText(text)}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
        />

        <Text style={styles.commonTitleText}>Touchable</Text>
        <TouchableHighlight
          underlayColor="#DDDDDD"
          onPress={() => Alert.alert('Pressed!')}>
          <View style={styles.itemTouchable}>
            <Text>Button TouchableHighlight</Text>
          </View>
        </TouchableHighlight>

        <TouchableOpacity
          onPress={() => Alert.alert('Opacity!')}>
          <View style={styles.itemTouchable}>
            <Text>Button TouchableOpacity</Text>
          </View>
        </TouchableOpacity>

        <TouchableWithoutFeedback
          onPress={() => Alert.alert('WiTouchableWithoutFeedback!')}>
          <View style={styles.itemTouchable}>
            <Text>Button TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>

        <Text style={styles.commonTitleText}>SectionList</Text>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.SectionListHeader}>{title}</Text>
          )}
          ItemSeparatorComponent={() => (
            <View style={{borderBottomWidth:1,borderBottomColor:'red'}}></View>
          )}
          ListEmptyComponent={() => (<Text>No datas</Text>)}
          ListHeaderComponent={() => (<Text style={{fontSize:40}}>SectionList Title</Text>)}
          ListFooterComponent={() => (<Text style={{fontSize:25}}>SectionList Footer</Text>)}
          // can't be used in <ScrollView>
          // refreshing={false}
          // onRefresh={() => Alert.alert('dropdown refresh')}
          // onEndReachedThreshold={0.1}
          // onEndReached={() => Alert.alert('Tips', 'End.')}
        />

        <Text style={styles.commonTitleText}>FlatList</Text>
        <FlatList
          data={lists}
          keyExtractor={item => item.id+item.title}
          renderItem={renderItem}
          horizontal={false}  // horizontal layout
          initialScrollIndex={1}  // make any item in top 
          initialNumToRender={3}  // render first four items and then render others
          numColumns={2}  // assign columns, the same height, not waterfall
          inverted={true} // list reverse include ListHeader and ListFooter
          extraData={selectedId}  // 

          ItemSeparatorComponent={() => (
            <View style={{borderBottomWidth:1,borderBottomColor:'red'}}></View>
          )}
          ListEmptyComponent={() => (<Text>No datas!!</Text>)}
          ListHeaderComponent={() => (<Text style={{fontSize:40}}>FlatList Title</Text>)}
          ListFooterComponent={() => (<Text style={{fontSize:25}}>FlatList Footer</Text>)}
          // can't be used in <ScrollView>
          // refreshing={false}
          // onRefresh={() => Alert.alert('dropdown refresh')}
          // onEndReachedThreshold={0.1}
          // onEndReached={() => Alert.alert('Tips', 'End.')}
        ></FlatList>

        <Text style={styles.commonTitleText}>Animated</Text>
        <View style={[styles.animated]}>
          <Animated.View
            style={[
              styles.fadingContainer,
              {
                opacity: fadeAnim // Bind opacity to animated value
              }
            ]}
          >
            <Text style={styles.fadingText}>Fading View!</Text>
          </Animated.View>
          <View style={styles.buttonRow}>
            <Button title="Fade In" onPress={fadeIn} />
            <Button title="Fade Out" onPress={fadeOut} />
          </View>
        </View>

        <Text style={styles.commonTitleText}>WebView</Text>
        <Text>...</Text>
        {/* <View style={{flex: 1, flexDirection: 'row'}}>
          <WebView style={{flex: 1}} source={{ uri: 'https://www.baidu.com/' }} />
        </View> */}

        <Text style={styles.commonTitleText}>Picker</Text>
        <Picker
          selectedValue={selectedLanguage}
          style={styles.picker}
          mode={'dropdown'}  // only Android
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <View>
          <Text>{selectedLanguage}</Text>
        </View>

        <Text style={styles.commonTitleText}>Swiper</Text>
        <Swiper style={styles.swiper} showsButtons={true} autoplay={true}>
          <Image source={require('./assets/a.png')} style={styles.itemImage}></Image>
          <Image source={require('./assets/b.png')} style={styles.itemImage}></Image>
        </Swiper>

        <Text style={styles.commonTitleText}>AsyncStorage</Text>
        <View style={styles.storage}>
          <Button title="setItems" onPress={() => storeData('hello RN')}></Button>
          <Button title="getItems" onPress={() => getData('test')}></Button>
          <Button title="setItemsByMyStorage" onPress={() => addData('hello! RN!')}></Button>
          <Button title="getItemsByMyStorage" onPress={() => getData('test2')}></Button>
          <Button title="clearAll" onPress={Storage.clear}></Button>
        </View>

        <Text style={styles.commonTitleText}>image-picker...launchCamera or launchImageLibrary</Text>
        <View style={styles.avatar}>
          <TouchableOpacity onPress={changeImage}>
            <View style={styles.avatar}>
              <Image style={styles.avatar} source={{ uri: avatar }}></Image>
            </View>
          </TouchableOpacity>
        </View>

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
        {/* To fix the bug that ScrollView in Android can't show content in bottom */}
        <View style={{height: Platform.OS === 'ios' ? 0 : 100}}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  commonTitleText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'orange',
  },
  avatar: {
    width: 100,
    height: 100
  },
  storage: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    columnGap: 10,
    rowGap: 10
  },
  swiper: {
    height: 200
  },
  picker: {
    height:50, 
    width: Dimensions.get('window').width, 
    backgroundColor: '#ccc'
  },
  animated: {
    borderWidth: 2,
    borderColor: 'skyblue',
    marginVertical: 10,
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16,
    columnGap: 10,
  },
  SectionListItem: {
    backgroundColor: "#f9c2ff",
    padding: 10,
    marginVertical: 8
  },
  SectionListHeader: {
    fontSize: 24,
    backgroundColor: "#fff"
  },
  SectionListTitle: {
    fontSize: 16
  },
  itemTouchable: {
    borderWidth: 1,
    borderRadius: 6,
    margin: 10,
    padding: 10
  },
  itemTextarea: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    margin: 10
  },
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

function NewsScreen(prop: any){
  return (
    <View>
      <Text>News Screen</Text>
      {/* when using TabNavigator, you may not use prop.navigation.navigate function */}
      {/* <Button title={'Jump to Home Screen'} onPress={() => prop.navigation.navigate('Home')} /> */}
    </View>
  )
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = ''
            if(route.name === 'Home'){
              iconName = focused ? 'home' : 'home-outline'
            }else if(route.name === 'News'){
              iconName = focused ? 'newspaper' : 'newspaper-outline'
            }
            return <Icon name={iconName} size={20} color={color} />
          },
          tabBarActiveTintColor: '#5B8FF9',
          tabBarInActiveTintColor: '#ccc',
        })}
        // The tabBarOptions prop is removed in favor of more flexible options for bottom tabs
        // tabBarOptions={{
        //   activeTintColor: 'tomato'
        // }}
        // The list of the options have new name, like activeTintColor -> tabBarActiveTintColor, 
        // and move all of these to screenOptions
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="News" component={NewsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;
