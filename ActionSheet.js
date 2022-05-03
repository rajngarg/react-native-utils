import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from 'react-native-modal';

export function ActionSheet({ isVisible, onClose, title, options, onSelected }) {

    return (
        <ReactNativeModal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            backdropOpacity={0.8}
            style={styles.modalBox}
            useNativeDriver={true}>

            <View style={styles.optionsBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                {options.map((item, index) => <TouchableOpacity key={index} style={styles.buttonBox} onPress={() => { onClose(), onSelected(index) }}>
                    <Text style={[styles.itemTitleText, { color: item.color ? item.color : "black" }]}>{item.title}</Text>
                </TouchableOpacity>)}
            </View>

            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                style={styles.cancelBox}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

        </ReactNativeModal>
    )
}

const styles = StyleSheet.create({
    titleBox: {
        height: 40,
        alignItems: 'center',
        borderRadius: 8,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    optionsBox: { backgroundColor: 'white', borderRadius: 8 },
    modalBox: { margin: 10, justifyContent: 'flex-end' },
    titleText: {
        color: '#757575',
        fontSize: 12,
    },
    itemTitleText: { padding: 15, fontSize: 16, alignSelf: 'center' },
    cancelText: { padding: 15, fontSize: 16 },
    cancelBox: { backgroundColor: 'white', marginTop: 10, borderRadius: 8, alignItems: 'center' },
    buttonBox: {
        height: 50,
        marginTop: 1,
        alignItems: 'center',
        borderRadius: 8,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
})