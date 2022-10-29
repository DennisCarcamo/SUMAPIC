import { View, Text } from "react-native";
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
        <View className={"flex-none bg-tertiarydark justify-center items-center rounded-sm"}>
            <Text className={"text-ontertiarydark text-base break-words py-4 font-medium"}>Current Battery Level: {percentage(batteryLevel)}</Text>
            <Text className={"text-ontertiarydark text-base break-words pb-4 font-medium"}>Current Connection Status: {connectionStatus}</Text>
        </View>
    );
}

export default BatteryAndInternetStatusComponent;

