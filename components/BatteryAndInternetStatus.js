// import { View, Text, StyleSheet } from "react-native";
// import * as React from 'react';
// import BootstrapStyleSheet from 'react-native-bootstrap-styles';
// import { useBatteryLevel } from '@use-expo/battery';

// const bootstrapStyleSheet = new BootstrapStyleSheet();
// const { styles: s, constants: c } = bootstrapStyleSheet;

// function BatteryAndInternetStatusComponent() {
//     const [level] = useBatteryLevel();

//     function

//     function percentage(level = 0) {
//         return `${Math.floor(level * 1000) / 10}%`;
//     }

//     return (<View style={styles.mainContainer}>
//         <Text style={[s.text, s.title, styles.label]}>Battery is at {percentage(level)}</Text>
//         <Text style={[s.text, s.title, styles.label]}>Internet Conection Status is Offline</Text>
//     </View>)
// }

// export default BatteryAndInternetStatusComponent;

import * as React from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default class BatteryAndInternetStatusComponent extends React.Component {
    state = {
        batteryLevel: null,
        connectionStatus: null,
    };

    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    handleConnectivityChange = (connectionStatus) => {
        if (connectionStatus.isConnected) {
            this.setState({ connectionStatus: 'Online' });
        } else {
            this.setState({ connectionStatus: 'Offline' });
        }
    };

    setInitialBatteryLevel = async () => {
        const batteryLevel = await Battery.getBatteryLevelAsync();
        this.setState({ batteryLevel });
    }

    handleBatteryLevelChange = (batteryLevel) => {
        this.setState({ batteryLevel });
    };

    _percentage(level = 0) {
        return `${Math.floor(level * 1000) / 10}%`;
    }

    _subscribe() {
        this.setInitialBatteryLevel();
        this._subscription = Battery.addBatteryLevelListener(this.handleBatteryLevelChange);
        this._netSubs = NetInfo.addEventListener(this.handleConnectivityChange);
    }

    _unsubscribe() {
        if (this._subscribe.remove) {
            this._subscription && this._subscription.remove();
            this._subscription = null;
        }

        if (this._netSubs.remove) {
            this._netSubs && this._netSubs.remove();
            this._netSubs = null;
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.label}>Current Battery Level: {this._percentage(this.state.batteryLevel)}</Text>
                <Text style={styles.label}>Current Connection Status: {this.state.connectionStatus}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#b39ddb',
        minHeight: '10%',
        minWidth: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    label: {
        color: 'black',
        fontWeight: '700',
        padding: 18,
    }
});