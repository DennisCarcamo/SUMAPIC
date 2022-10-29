import {
  StyleSheet, AppState,
  View, Text
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './screens/LandingScreen';
import TakePictureScreen from './screens/TakePictureScreen';
import DisplayPictureScreen from './screens/DisplayPictureScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const appState = useRef(AppState.currentState);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      return;
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function triggerNotifications() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Don´t Leave US',
        body: 'Come Back Please :)',
        data: {},
      },
      trigger: { seconds: 10 },
    });
  }

  function _handleAppStateChange(nextAppState) {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      return;
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    triggerNotifications();
  };

  return (
    <>
      <NavigationContainer styles={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={LandingScreen}></Stack.Screen>
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
