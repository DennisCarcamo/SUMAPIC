import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import BatteryAndInternetStatusComponent from "../components/BatteryAndInternetStatus";

function TakePictureScreen({ navigation }) {

  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, setcameraPermission] = useState(false);
  const [capturedPicture, setCapturedPicture] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const isFocused = useIsFocused();
  const cameraRef = useRef();

  useEffect(() => {
    async function getCammeraPermission() {
      const permission = await Camera.requestCameraPermissionsAsync();
      setcameraPermission(permission);
    }
    getCammeraPermission();
  }, []);

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function onCameraReady() {
    setIsCameraReady(true);
  };

  function goToDisplayPicture() {
    setCapturedPicture(null);
    navigation.navigate('Display', { capturedPicture, description: 'Taken From Camera', hideSave: false });
  }

  async function takePicture() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data
      if (source) {
        setCapturedPicture(source);
        await cameraRef.current.pausePreview();
      }
    }
  }

  async function clearPicture() {
    setCapturedPicture(null);
    await cameraRef.current.resumePreview();
  }

  return (
    <>
      {
        isFocused && <View style={styles.screenContainer}>
          <View style={styles.headingContainer}>
            <BatteryAndInternetStatusComponent></BatteryAndInternetStatusComponent>
            <View style={styles.headingCameraContainer}>
              {
                capturedPicture != null
                  ? <Pressable style={styles.button} onPress={clearPicture} >
                    <Text style={styles.buttonText}>Clear</Text>
                  </Pressable>
                  : null

              }
            </View>
          </View>
          <Camera type={type} style={styles.pictureFrameContainer} ref={cameraRef} onCameraReady={onCameraReady} >

          </Camera>
          <View style={styles.pictureActionsContainer}>
            <Pressable style={styles.button} onPress={takePicture}>
              <Text style={styles.buttonText}>Take Picture</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.buttonText}>Flip</Text>
            </Pressable>
            {
              capturedPicture != null
                ? <Pressable style={[styles.button, styles.actionButton]} disabled={capturedPicture == null} onPress={goToDisplayPicture}>
                  <Text style={styles.buttonText}>Next</Text>
                </Pressable>
                : null
            }
          </View>
        </View>
      }
    </>
  );
}

export default TakePictureScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f3e5f5',
    padding: 32,
  },
  headingContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: 'space-between'
  },
  headingCameraContainer: {
    flex: 0.80,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  pictureFrameContainer: {
    flex: 5,
    marginVertical: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    backgroundColor: '#8e24aa',
    borderColor: '#5e35b1',
  },
  pictureActionsContainer: {
    flex: 0.5,
    marginTop: 0,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontWeight: '700'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#8e24aa',
  },
  actionButton: {
    marginHorizontal: 4
  }
});