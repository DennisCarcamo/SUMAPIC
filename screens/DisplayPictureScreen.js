import { View, Text, StyleSheet } from "react-native";
import BatteryAndInternetStatusComponent from "../components/BatteryAndInternetStatus";

function DisplayPictureScreen() {
    return (
        <View>
            <BatteryAndInternetStatusComponent></BatteryAndInternetStatusComponent>
            <Text>This is the DisplayPictureScreen Screen</Text>
        </View>
    );
}

export default DisplayPictureScreen;

const styles = StyleSheet.create({});