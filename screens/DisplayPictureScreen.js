import { View, Text, StyleSheet, Pressable, Image, ScrollView, SafeAreaView, StatusBar, TouchableWithoutFeedback } from "react-native";
import BatteryAndInternetStatusComponent from "../components/BatteryAndInternetStatus";
import * as MediaLibrary from 'expo-media-library';


import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { useState, useEffect } from "react";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles: s, constants: c } = bootstrapStyleSheet;


function DisplayPictureScreen({ navigation, route }) {

    const [mediaLibraryPermission, setMediaLibraryPermission] = useState(false);
    const [requestResponse, setRequestResponse] = useState('HOLA');

    const { capturedPicture, description, hideSave } = route.params;


    async function getMediaLibraryPermission() {
        const permission = await MediaLibrary.requestPermissionsAsync();
        setMediaLibraryPermission(permission);
    }

    useEffect(() => {
        makeRequest();
    }, [route]);

    useEffect(() => {
        getMediaLibraryPermission();
    }, []);

    async function savePicture() {
        // if (mediaLibraryPermission) {
        //     getMediaLibraryPermission();
        //     return;
        // }
        const asset = await MediaLibrary.createAssetAsync(capturedPicture);
        if (asset) {
            const album = await MediaLibrary.createAlbumAsync('Sumapic Pictures', asset);
        }
    }

    async function makeRequest() {
        setRequestResponse('Sending...');

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWNjX2YwNzM5NzBhZmQyM2UzYjpjMWUyNTE4Zjc2ZjVjZjRmYjUyMzVmYzY5YzA2Y2E1Ng==");

        var formdata = new FormData();
        formdata.append("image", capturedPicture);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://api.imagga.com/v2/tags", requestOptions)
            .then(response => response.json())
            .then(result => setRequestResponse(JSON.stringify(result)))
            .catch(error => setRequestResponse(error));

    }

    return (
        <View style={styles.screenContainer}>
            <View style={styles.headingContainer}>
                <BatteryAndInternetStatusComponent></BatteryAndInternetStatusComponent>
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{description}</Text>
            </View>

            <Image style={styles.pictureFrameContainer} source={{ uri: capturedPicture }}>
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
    },
    headingContainer: {
        flex: 2,
        marginHorizontal: 32,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    titleContainer: {
        marginVertical: 12,
        marginHorizontal: 32,
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
        marginHorizontal: 32,
        padding: 4,
    },
    pictureFrameContainer: {
        flex: 4,
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
        marginVertical: 32,
        marginHorizontal: 32,
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