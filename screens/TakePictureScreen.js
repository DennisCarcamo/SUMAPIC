import { useEffect, useState, useRef } from "react";
import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import BatteryAndInternetStatusComponent from "../components/BatteryAndInternetStatus";

function TakePictureScreen({ navigation }) {

  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, setcameraPermission] = useState(false);
  const [capturedPicture, setCapturedPicture] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraIsInPreview, setCameraIsInPreview] = useState(false);

  const isFocused = useIsFocused();
  const cameraRef = useRef();

  useFocusEffect(
    React.useCallback(() => {
      setCapturedPicture(null);
    }, [])
  );

  useEffect(() => {
    async function getCammeraPermission() {
      const permission = await Camera.requestCameraPermissionsAsync();
      setcameraPermission(permission);
    }
    getCammeraPermission();
  }, []);

  function toggleCameraType() {
    if (cameraIsInPreview) return;
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function onCameraReady() {
    setIsCameraReady(true);
  };

  function goToDisplayPicture() {
    setCameraIsInPreview(false);
    navigation.navigate('Display', { capturedPicture, description: 'Taken From Camera', hideSave: false });
  }

  async function takePicture() {
    if (cameraRef.current && !cameraIsInPreview) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data
      if (source) {
        setCapturedPicture(source);
        await cameraRef.current.pausePreview();
        setCameraIsInPreview(true);
      }
    }
  }

  async function clearPicture() {
    setCapturedPicture(null);
    await cameraRef.current.resumePreview();
    setCameraIsInPreview(false);
  }

  return (
    <>
      {
        isFocused && <View className={"container p-8 flex flex-1 flex-col justify-center bg-tertiary"}>
          <View className={"container flex flex-col justify-center grow"}>
            <BatteryAndInternetStatusComponent></BatteryAndInternetStatusComponent>
            <View className={"container"}>
              {
                capturedPicture != null
                  ? <Pressable className={"bg-secondary flex flex-col justify-center items-center mt-3 h-10 rounded-lg"} onPress={clearPicture} >
                    <Text className={"text-onprimary text-base break-words font-medium"}>Clear</Text>
                  </Pressable>
                  : null

              }
            </View>
          </View>
          <Camera type={type} style={styles.pictureFrameContainer} ref={cameraRef} onCameraReady={onCameraReady} >

          </Camera>
          <View className={"container flex-1 flex-row justify-between items-center"}>
            <Pressable className={"bg-secondary flex-1 flex-col justify-center items-center mr-2 h-10 rounded-lg"} onPress={takePicture}>
              <Text className={"text-onprimary text-base break-words font-medium"}>Take Picture</Text>
            </Pressable>
            <Pressable className="bg-secondary flex-1 flex-col justify-center items-center  h-10 rounded-lg" onPress={toggleCameraType}>
              <Text className={"text-onprimary text-base break-words font-medium"}>Flip</Text>
            </Pressable>
            {
              capturedPicture != null
                ? <Pressable className={"bg-primary flex-1 flex-col justify-center items-center ml-2 h-10 rounded-lg"} disabled={capturedPicture == null} onPress={goToDisplayPicture}>
                  <Text className={"text-onprimary text-base break-words font-medium"}>Next</Text>
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
  pictureFrameContainer: {
    flex: 5,
    marginVertical: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    backgroundColor: '#8e24aa',
    borderColor: '#5e35b1',
  }
});