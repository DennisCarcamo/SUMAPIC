import { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import BatteryAndInternetStatusComponent from "../components/BatteryAndInternetStatus";

import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles: s, constants: c } = bootstrapStyleSheet;

function TakePictureScreen() {

    //   useEffect(() => {
    //     console.log("componentDidMount");
    //   }, []);
    //
    //   useEffect(() => {
    //     console.log("se ejecuta siempre, despues de pintar");
    //   });
    //
    //   useEffect(() => {
    //     console.log("componentDidUpdate - increment, solo se ejecuta si la dependencia cambia");
    //   }, [increment]);
    //
    //   useEffect(() => {
    //     console.log("componentDidUpdate - decrement, solo se ejecuta si la dependencia cambia");
    //   }, [decrement]);
    //
    //  useEffect(() => {
    //   return () => {
    //     console.log("Component unmounted, se retorna una funcion");
    //   };
    //  }, []);

    return (
        <View style={styles.screenContainer}>
            <View style={styles.headingContainer}>
                <BatteryAndInternetStatusComponent></BatteryAndInternetStatusComponent>
                <View style={styles.headingCameraContainer}>
                    <Pressable style={styles.button}>
                        <Text style={[s.text, s.title, styles.buttonText]}>Clear</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.pictureFrameContainer}></View>
            <View style={styles.pictureActionsContainer}>
                <Pressable style={styles.button}>
                    <Text style={[s.text, s.title, styles.buttonText]}>Flip</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={[s.text, s.title, styles.buttonText]}>Take Picture</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.actionButton]}>
                    <Text style={[s.text, s.title, styles.buttonText]}>Next</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default TakePictureScreen;

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
    headingCameraContainer: {
        flex: 0.80,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignContent: 'center',
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
        Width: '20%',
        Height: '20%',
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