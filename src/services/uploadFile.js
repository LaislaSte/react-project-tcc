import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { storage } from './Banco';

const uploadFile = (file, filePath) => {
    return new Promise(async (resolve, reject) => {
        const storageRef = ref(storage, filePath);

        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            resolve(url);
        } catch (error) {
            reject(error);
        }
    })
}

export default uploadFile