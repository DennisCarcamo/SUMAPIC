import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './screens/LandingScreen';
import TakePictureScreen from './screens/TakePictureScreen';
import DisplayPictureScreen from './screens/DisplayPictureScreen';

const Stack = createNativeStackNavigator();

export default function App() {
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
});
