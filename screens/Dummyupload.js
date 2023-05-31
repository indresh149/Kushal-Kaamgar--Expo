import React from 'react';
import { Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const uploadImages = async () => {
    const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdGVyQGdtYWlsLmNvbSIsImp0aSI6IjFjNDM1NDk4LWVmYjUtNDhmMi1iMzg4LTg1OTMzMDhjZGU3OCIsImV4cCI6MTY4NDk1MzMwMCwiaXNzIjoiaHR0cDovL3d3dy5rdXNoYWxrYWFtZ2FyLmNvbS9hcGkiLCJhdWQiOiJVc2VyIn0.2u20_suP5tn2ReOnlKci2elWpsj0MPQn6OQTzYkDSS8";
    const workforceId = "ea3be847-c237-4191-aebc-9490d0f78fab";
    const fileType = 1;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
    };

    const options = {
        title: 'Select Image',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    try {
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const formData = new FormData();
                formData.append('WorkforceId', workforceId);
                formData.append('file', {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName || 'image.jpg'
                });
                formData.append('fileType', fileType);

                const response = await axios.post('https:/26d5-160-202-36-62.ngrok-free.app/workforce/fileupload', formData, {
                    headers: headers
                });

                console.log(response.data); // true or false
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const Dummyupload = () => {
    return (
        <Button title="Upload Image" onPress={uploadImages} />
    );
};

export default Dummyupload;
