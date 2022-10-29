import {
  StyleSheet, AppState,
  View, Text
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './screens/LandingScreen';
import TakePictureScreen from './screens/TakePictureScreen';
import DisplayPictureScreen from './screens/DisplayPictureScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  return (
    <>
      <NavigationContainer styles={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name={appState.current} component={LandingScreen}></Stack.Screen>
          <Stack.Screen name='Take' component={TakePictureScreen}></Stack.Screen>
          <Stack.Screen name='Display' component={DisplayPictureScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'black',
    fontWeight: '700',
    padding: 18,
  }
});
