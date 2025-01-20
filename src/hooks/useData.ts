import { PermissionsAndroid, Alert } from 'react-native'
import React from 'react'
import RNFS from 'react-native-fs';

const useData = () => {
    const FILE_NAME = "bfnScannerEntries.json"

    const saveDataToFile = (data: any) => {
        const path = `${RNFS.DocumentDirectoryPath}/${FILE_NAME}`;
        return new Promise((resolve, reject) => {
            RNFS.writeFile(path, JSON.stringify(data), 'utf8')
                .then(() => {
                    console.log('File written successfully to:', path);
                    resolve(path); // Resolve with the file path
                })
                .catch((error) => {
                    console.error('Error saving file:', error);
                    resolve(false); // Reject with the error
                });
        });
    };

    const readDataFromFile = () => {
        const path = `${RNFS.DocumentDirectoryPath}/${FILE_NAME}`;
        return new Promise((resolve, reject) => {
            RNFS.readFile(path, 'utf8')
                .then((fileContent) => {
                    resolve(JSON.parse(fileContent)); // Resolve with parsed content
                })
                .catch((error) => {
                    console.error('Error reading file:', error);
                    resolve(false); // Reject with the error
                });
        });
    };


    return {
        saveDataToFile,
        readDataFromFile
    }
}

export default useData
