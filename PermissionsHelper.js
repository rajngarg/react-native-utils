import { Alert } from "react-native";
import { check, PERMISSIONS, RESULTS, openSettings, request } from "react-native-permissions";
import RNSettings from "react-native-settings";

export default function checkContacts(callback) {
    check(Platform.OS == 'android' ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS)
        .then(result => {
            switch (result) {
                case RESULTS.DENIED:
                    request(Platform.OS == 'android' ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS).then(result => {
                        if (result == 'granted') {
                            callback(true)
                        }
                    })
                    break;
                case RESULTS.GRANTED:
                    callback(true)
                    break;
                case RESULTS.BLOCKED:
                    showPermissionsBlocked('contacts')
                    break;
            }
        })
}

export function checkLocation(callBack) {
    check(Platform.OS == 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then(result => {
            switch (result) {
                case RESULTS.DENIED:
                    request(Platform.OS == 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
                        if (result == 'granted') {
                            callBack(true)
                        }
                    })
                    break;
                case RESULTS.GRANTED:
                    callBack(true)
                    break;
                case RESULTS.BLOCKED:
                    showPermissionsBlocked('location')
                    break;
            }
        })
}

export function checkLocationEnabled(callBack) {
    RNSettings.getSetting(RNSettings.LOCATION_SETTING).then(result => {
        if (result == RNSettings.ENABLED) {
            console.log('location is already enabled');
            callBack(true)
        } else {
            console.log('location is disabled');
            Alert.alert(
                'GPS Disabled',
                'Please turn on the GPS',
                [
                    {
                        text: 'Enter Manually', style: 'cancel', onPress: () => { console.log(">>>") }
                    },
                    {
                        text: 'Settings', style: 'default', onPress: () => {
                            if (Platform.OS == 'android') {
                                //Open Location settings
                                RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then(
                                    result => {
                                        if (result === RNSettings.ENABLED) {
                                            console.log('location is enabled');
                                            callBack(true)
                                        } else {
                                            checkLocationEnabled()
                                        }
                                    },
                                );
                            } else {
                                //Open app settings because we cant open location settings in ios
                                // Linking.openURL('app-settings:');
                                openSettings().then((result) => console.log(result))
                            }
                        }
                    },
                ],
                { cancelable: true },
            );

        }
    });
}

export function showPermissionsBlocked(type) {
    Alert.alert(
        'Permission Blocked',
        'Please grant ' + type + ' permission from app settings',
        [
            { text: 'Cancel', onPress: () => console.log('OK Pressed') },
            { text: 'Settings', onPress: () => { openSettings().catch(() => console.warn('cannot open settings')); } },
        ],
        { cancelable: false },
    );
}