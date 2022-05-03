// import DocumentPicker from "react-native-document-picker";
import ImagePicker from 'react-native-image-crop-picker';
import { ActionSheet } from './ActionSheet';
import { checkCamera, checkGallery } from "./PermissionsHandler";
import React from 'react';

export function openImagePicker(callback, width, height) {
    // Open Image Library:
    checkGallery(isGranted => {
        if (isGranted) {
            setTimeout(() => {
                ImagePicker.openPicker({
                    width: width,
                    height: height,
                    mediaType: 'photo',
                    cropping: true,
                }).then((response) => {
                    let arr = response.path.split('/')
                    console.log(response.mime)
                    let fileName = arr[arr.length - 1]
                    let source = { uri: response.path, type: response.mime, name: fileName };
                    callback(source, fileName)
                }).catch(err => console.log(err));
            }, 500);
        }
    })
}

export function PickerSheet(showPicker, closePicker, callback, widht = 500, height = 500) {
    return <ActionSheet
        isVisible={showPicker}
        options={[
            { title: "Take Photo" },
            { title: "Choose From Gallery" },
        ]}
        onClose={closePicker}
        title={'Send file from'}
        onSelected={(index) => {
            if (index == 0) {
                openCamera((source, fileName) => {
                    callback(source, fileName, 'image')
                })
            } else if (index == 1) {
                openImagePicker((source, fileName) => {
                    callback(source, fileName, 'image')
                }, widht, height)
            }
        }}
    />

}

export function openCamera(callback) {
    // Launch Camera:
    checkCamera(isGranted => {
        if (isGranted) {
            setTimeout(() => {
                ImagePicker.openCamera({
                    width: 300,
                    height: 300,
                    mediaType: 'photo',
                    cropping: true,
                }).then((response) => {
                    let arr = response.path.split('/')
                    let fileName = arr[arr.length - 1]
                    let source = { uri: response.path, type: 'image/*', name: fileName };
                    callback(source, fileName)
                }).catch(err => console.log(err));
            }, 500);
        }
    })
}
