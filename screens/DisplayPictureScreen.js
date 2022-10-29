import { View, Text, StyleSheet, Pressable, Image, ScrollView, SafeAreaView, StatusBar, TouchableWithoutFeedback } from "react-native";
import BatteryAndInternetStatusComponent from "../components/BatteryAndInternetStatus";
import * as MediaLibrary from 'expo-media-library';
import { useState, useEffect } from "react";

function DisplayPictureScreen({ navigation, route }) {

  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(false);
  const [requestResponse, setRequestResponse] = useState('HOLA');

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

  return (
    <View style={styles.screenContainer}>
      <BatteryAndInternetStatusComponent></BatteryAndInternetStatusComponent>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{description}</Text>
      </View>

      <Image style={styles.pictureFrameContainer} source={{ uri: capturedPicture.uri }}>
      </Image>

      <TouchableWithoutFeedback onPress={makeRequest}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.requestText}>
              {requestResponse}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      <View style={styles.pictureActionsContainer}>
        {
          hideSave ?
            null :
            <Pressable style={styles.button} onPress={savePicture}>
              <Text style={styles.buttonText}>Save Picture to Galery</Text>
            </Pressable>
        }
      </View>
    </View>
  );
}

export default DisplayPictureScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFCDB2',
    padding: 32,
  },
  titleContainer: {
    marginVertical: 12,
    backgroundColor: '#B5838D',
    justifyContent: "center",
    alignItems: 'center'
  },
  titleText: {
    fontWeight: '800',
    color: '#EEEEEE',
    fontSize: 24
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  requestText: {
    fontWeight: '700',
    color: '#EEEEEE'
  },
  scrollView: {
    backgroundColor: '#B5838D',
    padding: 4,
  },
  pictureFrameContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    backgroundColor: '#8e24aa',
    borderColor: 'black',
  },
  pictureActionsContainer: {
    flex: 0.5,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#EEEEEE',
    fontWeight: '700'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    Width: '20%',
    Height: '20%',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#6D6875',
  },
});