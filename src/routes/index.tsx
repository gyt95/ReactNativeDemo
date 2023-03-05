import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import NewsScreen from '../screens/News';
import HomeScreen from '../screens/Home';

const Tab = createBottomTabNavigator();
export default function MainRouter() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = ''
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'News') {
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