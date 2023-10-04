import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const { Login, Home, Signup, Splash_2, ChatBox, Splash, Profile, TempScreen_1, TempScreen_2, TempScreen_3, UserProfile } = require('../Screens');
import NavigationStrings from '../Constant/NavigationStrings';
import Bottom from './Bottom';
export default function MainStack() {
  const Stack = createStackNavigator();
  const option = { headerShown: false, animation: 'slide_from_right' };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationStrings.SPLASH}
        component={Splash}
        options={option}
      />
      <Stack.Screen
        name={NavigationStrings.TempScreen_1}
        component={TempScreen_1}
        options={option}
      />
      <Stack.Screen
        name={NavigationStrings.TempScreen_2}
        component={TempScreen_2}
        options={option}
      />
      <Stack.Screen
        name={NavigationStrings.TempScreen_3}
        component={TempScreen_3}
        options={option}
      />
      <Stack.Screen
        name={NavigationStrings.SPLASH_2}
        component={Splash_2}
        options={option}
      />
      <Stack.Screen
        name={NavigationStrings.SIGNUP}
        component={Signup}
        options={option}
      />
      <Stack.Screen
        name={NavigationStrings.LOGIN}
        component={Login}
        options={option}
      />
      <Stack.Screen
        name={"Home"}
        component={Bottom}
        options={option}
      />
      <Stack.Screen
        name={NavigationStrings.ChatBox}
        component={ChatBox}
        options={option}
      />
      <Stack.Screen
        name={NavigationStrings.PROFILE}
        component={Profile}
        options={option}
      />
      <Stack.Screen
        name={NavigationStrings.USERPROFILE}
        component={UserProfile}
        options={option}
      />
    </Stack.Navigator>
  );
}
