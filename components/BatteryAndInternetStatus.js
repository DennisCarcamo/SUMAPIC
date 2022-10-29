import { View, Text, StyleSheet, } from "react-native";
import { useEffect, useState, useRef } from "react";
import * as React from 'react';
import * as Battery from 'expo-battery';
import NetInfo from '@react-native-community/netinfo';

function BatteryAndInternetStatusComponent() {
    const powerAndConnectionListener = useRef();

    const [batteryLevel, setBatteryLevel] = useState(0.0);
    const [connectionStatus, setConnectionStatus] = useState('');

    useEffect(() => {
        subscribe();
        return () => {
            powerAndConnectionListener.current.valuer = null;
        }
    }, []);

    async function setInitialBatteryLevel() {
        const batteryLevel = await Battery.getBatteryLevelAsync();
        setBatteryLevel(batteryLevel);
    }

    function handleBatteryLevelChange(batteryLevel) {
        setBatteryLevel(batteryLevel);
    };

    function handleConnectivityChange(connectionStatus) {
        if (connectionStatus.isConnected) {
            setConnectionStatus('Online');
        } else {
            setConnectionStatus('Offline');
        }
    };

    function percentage(level = 0) {
        return `${Math.floor(level * 1000) / 10}%`;
    }

    function subscribe() {
        setInitialBatteryLevel();
        powerAndConnectionListener.current = Battery.addBatteryLevelListener(handleBatteryLevelChange);
        powerAndConnectionListener.current = NetInfo.addEventListener(handleConnectivityChange);
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.label}>Current Battery Level: {percentage(batteryLevel)}</Text>
            <Text style={styles.label}>Current Connection Status: {connectionStatus}</Text>
        </View>
    );
}

export default BatteryAndInternetStatusComponent;


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#b39ddb',
        minHeight: '10%',
        minWidth: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        color: 'black',
        fontWeight: '700',
        padding: 18,
    }
});