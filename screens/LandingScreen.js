import { View, Text, Pressable } from 'react-native';
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
      <View className={"container p-8 flex flex-1 flex-col justify-center bg-tertiary"}>
        <BatteryAndInternetStatusComponent></BatteryAndInternetStatusComponent>
        <View>
          <Pressable className={"bg-secondary flex flex-col justify-center items-center mt-12 h-20 rounded-lg"} onPress={goToTakePicture}>
            <Text className={"text-onprimary text-base break-words py-4 font-medium"}>Take New Picture</Text>
          </Pressable>
          <Pressable className={"bg-secondary flex flex-col justify-center items-center mt-12 h-20 rounded-lg"} onPress={loadPictureFromGalery}>
            <Text className={"text-onprimary text-base break-words py-4 font-medium"}>Load Picture From Galery</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

export default LandingScreen;