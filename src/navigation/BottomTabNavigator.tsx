import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Audio, Main, Video} from '../views';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{tabBarIcon: () => null}}>
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Audio" component={Audio} />
      <Tab.Screen name="Video" component={Video} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
