import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import { useColorScheme } from 'react-native';
import { useDispatch } from 'react-redux';
import { setTheme } from '../Redux/Slices/Theme';
export default function Routes() {
  const dispatch = useDispatch();
  const theme = useColorScheme();
  dispatch(setTheme(theme));
  return <NavigationContainer>{MainStack()}</NavigationContainer>;
}
