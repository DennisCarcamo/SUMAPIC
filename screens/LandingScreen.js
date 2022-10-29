import { View, StyleSheet, Text, Pressable } from 'react-native';
import BatteryAndInternetStatusComponent from '../components/BatteryAndInternetStatus';
import * as ImagePicker from 'expo-image-picker';

function LandingScreen({ navigation }) {

  function goToTakePicture() {
    navigation.navigate('Take');
  }

  async function loadPictureFromGalery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true
    });
    if (!result.cancelled) {
      navigation.navigate('Display', { capturedPicture: result, description: 'Loaded from Galery', hideSave: true });
    }
  }

  return (
    <>
      <View style={styles.ScreenContainer}>
        <BatteryAndInternetStatusComponent></BatteryAndInternetStatusComponent>
        <Pressable style={styles.button} onPress={goToTakePicture}>
          <Text style={styles.buttonText}>Take New Picture</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={loadPictureFromGalery}>
          <Text style={styles.buttonText} >Load Picture From Galery</Text>
        </Pressable>
      </View>
    </>
  );
}

export default LandingScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    padding: 32,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3e5f5',
  },
  button: {
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80%',
    minHeight: '10%',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#8e24aa',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700'
  }
});