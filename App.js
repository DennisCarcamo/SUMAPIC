import { AppState } from 'react-native';
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

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);

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
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#653E42' }, headerTintColor: 'white', headerTitleStyle: { fontWeight: 'bold' } }}>
          <Stack.Screen options={{ title: 'SUMAPIC' }} name='Home' component={LandingScreen}></Stack.Screen>
          <Stack.Screen options={{ title: 'Take a picture' }} name='Take' component={TakePictureScreen}></Stack.Screen>
          <Stack.Screen options={{ title: 'Show picture preview' }} name='Display' component={DisplayPictureScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

