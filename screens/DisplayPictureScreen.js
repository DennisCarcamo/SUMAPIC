import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import BatteryAndInternetStatusComponent from "../components/BatteryAndInternetStatus";

import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles: s, constants: c } = bootstrapStyleSheet;


function DisplayPictureScreen({ navigation, route }) {

    const { capturedPicture } = route.params;

    return (
        <View style={styles.screenContainer}>
            <View style={styles.headingContainer}>
                <BatteryAndInternetStatusComponent></BatteryAndInternetStatusComponent>
            </View>

            <Image style={styles.pictureFrameContainer} source={{ uri: capturedPicture }}>

            </Image>

            <View style={styles.pictureActionsContainer}>
                <Pressable style={styles.button} >
                    <Text style={[s.text, s.title, styles.buttonText]}>Save Picture to Galery</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default DisplayPictureScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#f3e5f5',
    },
    headingContainer: {
        flex: 2,
        marginHorizontal: 32,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    pictureFrameContainer: {
        flex: 5,
        marginVertical: 32,
        marginHorizontal: 32,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 3,
        backgroundColor: '#8e24aa',
        // borderColor: 'black',
    },
    pictureActionsContainer: {
        flex: 0.5,
        marginTop: 0,
        marginBottom: 32,
        marginHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        color: 'white',
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
        backgroundColor: '#8e24aa',
    },
});