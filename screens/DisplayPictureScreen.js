import { View, Text, StyleSheet, Pressable, Image, ScrollView, SafeAreaView, StatusBar, TouchableWithoutFeedback } from "react-native";
import BatteryAndInternetStatusComponent from "../components/BatteryAndInternetStatus";
import * as MediaLibrary from 'expo-media-library';
import { useState, useEffect } from "react";

function DisplayPictureScreen({ navigation, route }) {

  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(false);
  const [requestResponse, setRequestResponse] = useState('');

  const { capturedPicture, description, hideSave } = route.params;

  useEffect(() => {
    makeRequest();
  }, [route]);

  useEffect(() => {
    getMediaLibraryPermission();
  }, []);

  async function getMediaLibraryPermission() {
    const permission = await MediaLibrary.requestPermissionsAsync();
    setMediaLibraryPermission(permission);
  }

  async function savePicture() {
    const asset = await MediaLibrary.createAssetAsync(capturedPicture.uri);
    if (asset) {
      await MediaLibrary.createAlbumAsync('Sumapic', asset);
    }
  }

  async function makeRequest() {
    setRequestResponse('Sending...');

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer public_W142hWLAiFiKDaAZb9ErjvXvsZpa");
    myHeaders.append("Content-Type", "image/jpg");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: capturedPicture,
      redirect: 'follow'
    };

    fetch("https://api.upload.io/v2/accounts/W142hWL/uploads/binary", requestOptions)
      .then(response => response.json())
      .then(result => setRequestResponse(JSON.stringify(result)))
      .catch(error => setRequestResponse(error));

  }

  function goToTakeScreen() {
    navigation.navigate('Take');
  }

  return (
    <View className={"container flex-1 p-8 bg-tertiary"}>
      <BatteryAndInternetStatusComponent></BatteryAndInternetStatusComponent>
      <View className={'bg-primary flex flex-row justify-center my-4 py-4'}>
        <Text className={"text-onprimary text-xl font-bold break-words"}>{description}</Text>
      </View>

      <Image style={styles.pictureFrameContainer} source={{ uri: capturedPicture.uri }}>
      </Image>


      <SafeAreaView className={"bg-background flex-1 my-4"}>
        <ScrollView>
          <Text className={"text-primary text-xl break-words font-medium p-4"}>
            {requestResponse}
          </Text>
        </ScrollView>
      </SafeAreaView>


      <View className={"container flex-1 flex-row justify-between items-center"}>
        <Pressable className={"bg-secondary flex-1 flex-col justify-center items-center  mr-1 h-10 rounded-lg"} onPress={goToTakeScreen}>
          <Text className={"text-onprimary text-base break-words font-medium"}>Back to camera</Text>
        </Pressable>
        {
          hideSave ?
            null :
            <Pressable className={"bg-primary flex-1 flex-col justify-center items-center ml-1 h-10 rounded-lg"} onPress={savePicture}>
              <Text className={"text-onprimary text-base break-words font-medium"}>Save Picture to Galery</Text>
            </Pressable>
        }
      </View>
    </View>
  );
}

export default DisplayPictureScreen;

const styles = StyleSheet.create({

  pictureFrameContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F2F3',
  },
  pictureActionsContainer: {
    flex: 0.5,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});