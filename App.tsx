import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Toast from 'react-native-toast-message';
import {Details} from './src/views';
import {BottomTabNavigator} from './src/navigation';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomTabNavigator">
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
