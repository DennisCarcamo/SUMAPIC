import { View, StyleSheet, Text, Pressable } from 'react-native';

import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles: s, constants: c } = bootstrapStyleSheet;

function LandingScreen() {
    return (<View style={styles.ScreenContainer}>
        <Pressable style={styles.button}>
            <Text style={[s.text, s.title, styles.buttonText]}>Take New Picture</Text>
        </Pressable>
        <Pressable style={styles.button}>
            <Text style={[s.text, s.title, styles.buttonText]}>Load Picture From Galery</Text>
        </Pressable>
    </View>);
}

export default LandingScreen;

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3e5f5',
    },
    button: {
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '80%',
        minHeight: '10%',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#8e24aa',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700'
    }
});