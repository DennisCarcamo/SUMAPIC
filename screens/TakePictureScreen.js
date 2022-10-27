import { View, Text, StyleSheet } from "react-native";
import BatteryAndInternetStatusComponent from "../components/BatteryAndInternetStatus";

function TakePictureScreen() {
    return (
        <View>
            <BatteryAndInternetStatusComponent></BatteryAndInternetStatusComponent>
            <Text>This is the TakePicture Screen</Text>
        </View>
    );
}

export default TakePictureScreen;

const styles = StyleSheet.create({});