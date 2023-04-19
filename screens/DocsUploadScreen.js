import { View, Text, ScrollView, StyleSheet, Alert, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import axios from 'axios';
import ImagePicker from '../components/ui/ImagePicker'
import { AuthContext } from '../store/auth-context'
import { string } from 'yup';
import * as FileSystem from 'expo-file-system';

const DocsUploadScreen = () => {

    const [selectedImage, setSelectedImage] = useState({});
    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
        console.log(imageUri)
    }

    const [AdhaarPicFront, setAdhaarPicFront] = useState();

    function takeImageHandlerAdhaarPicFront(imageUri) {
        setAdhaarPicFront(imageUri);
    }
    const [AdhaarPicBack, setAdhaarPicBack] = useState();

    function takeImageHandlerAdhaarPicBack(imageUri) {
        setAdhaarPicBack(imageUri);
    }

    const [OtherIDPicFront, setOtherIDPicFront] = useState();

    function takeImageHandlerOtherIDPicFront(imageUri) {
        setOtherIDPicFront(imageUri);
    }

    const [OtherIDPicBack, setOtherIDPicBack] = useState();

    function takeImageHandlerOtherIDPicBack(imageUri) {
        setOtherIDPicBack(imageUri);
    }

    const authCtx = useContext(AuthContext);
   // const token = authCtx.token;
    //const wid = authCtx.wid;

    

       
   // const token = authCtx.token;
    
    
    const FormData = require('form-data');
    
    
    const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicGl5dXNoLm1hbmlAa3VzaGFsa2FhbWdhci5jb20iLCJqdGkiOiIyYmVkNDhhYi03ZDQ5LTQxYmEtYjk5Yy0wMjNlZWUyYTc3ZGMiLCJleHAiOjE2ODE1NzIyMjksImlzcyI6Imh0dHA6Ly93d3cua3VzaGFsa2FhbWdhci5jb20vYXBpIiwiYXVkIjoiVXNlciJ9.tr7kUIcoR8VSDG5Z0tW6Q9nBu0pFvRvU7K2bnAoxv3U"

    
    const workforceId = "8be78039-9b68-4b5a-aa03-92ebb441cc6f";

   
    const fileType = "1";

    
    const selectedImagedata = selectedImage;

    // const filePath = FileSystem.documentDirectory + selectedImagedata;
    // console.log(filePath)

   // const fs = require('fs');

    async function uploadImages() {
        const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicGl5dXNoLm1hbmlAa3VzaGFsa2FhbWdhci5jb20iLCJqdGkiOiIyYmVkNDhhYi03ZDQ5LTQxYmEtYjk5Yy0wMjNlZWUyYTc3ZGMiLCJleHAiOjE2ODE1NzIyMjksImlzcyI6Imh0dHA6Ly93d3cua3VzaGFsa2FhbWdhci5jb20vYXBpIiwiYXVkIjoiVXNlciJ9.tr7kUIcoR8VSDG5Z0tW6Q9nBu0pFvRvU7K2bnAoxv3U"

        const workforceId = "8be78039-9b68-4b5a-aa03-92ebb441cc6f";
        const selectedImage = selectedImagedata
        const fileType = '1';

        const headers = {
            'Authorization': `Bearer ${token}`,
            accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }

        try {
            const formData = new FormData();
            formData.append('WorkforceId', workforceId);
            formData.append('file', selectedImage);
            formData.append('fileType', fileType);

            const response = await axios.post('http://www.kushalkaamgar.com/kk.api/workforce/fileupload', formData, {
                headers: headers
            });

            console.log(response.data); // true or false
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    

    {
        /*

       
    const headers = {
        Authorization: "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicGl5dXNoLm1hbmlAa3VzaGFsa2FhbWdhci5jb20iLCJqdGkiOiI0NDlhYTIwNi01ODViLTQ5MjMtODlhNy0yODViMmY3YmRlNjUiLCJleHAiOjE2ODAyNzc3MjMsImlzcyI6Imh0dHA6Ly93d3cua3VzaGFsa2FhbWdhci5jb20vYXBpIiwiYXVkIjoiVXNlciJ9.TJGtNhqUwrwdtqH_kRYidEh6K9oHPkmI9j8-WsoG8o0",
        'Content-Type': 'multipart/form-data',
    };

    const imageData = {
        WorkforceId: "0dbb07cd-30f0-4dec-ac9d-82a805be6771",
        file: selectedImage,
        fileType: 1
    };

    async function uploadImages() {
        try {
            const formData = new FormData();
            formData.append("WorkforceId", "0dbb07cd-30f0-4dec-ac9d-82a805be6771");
            formData.append("file", selectedImage);
            formData.append("fileType", 1);
            // console.log(formData)

            // const response = await fetch('http://www.kushalkaamgar.com/kk.api/workforce/fileupload', {
            //     method: 'POST',
            //     headers: headers,
            //     body: formData,
            // });
            await fetch('http://www.kushalkaamgar.com/kk.api/workforce/fileupload', {
                method: 'POST',
                headers: headers,
                body: formData,
            }).then((res) => console.log("Sucess",res)).catch(error => console.log("Error: ", error))
            // console.log(response)
            //const resData = await response;
            //console.log(resData);
            // if (!response.ok) {
            //     throw new Error(resData.message);
            // }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

     */
    }





    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.container}>

                <View style={styles.wrapper}>

                    <Text style={styles.textshown}>Upload Photo</Text>
                    <ImagePicker onTakeImage={takeImageHandler} />

                    <Text style={styles.textshown}>Upload Adhaar Photo</Text>

                    <Text style={styles.textshown}>1. Front Image</Text>
                    <ImagePicker onTakeImage={takeImageHandlerAdhaarPicFront} />

                    <Text style={styles.textshown}>2. Back Image</Text>
                    <ImagePicker onTakeImage={takeImageHandlerAdhaarPicBack} />

                    <Text style={styles.textshown}>Upload OtherID Photo</Text>

                    <Text style={styles.textshown}>Front Image</Text>
                    <ImagePicker onTakeImage={takeImageHandlerOtherIDPicFront} />

                    <Text style={styles.textshown}>Back Image</Text>
                    <ImagePicker onTakeImage={takeImageHandlerOtherIDPicBack} />

                    <View>
                        <TouchableOpacity
                            style={styles.AddExperienceButton}
                            onPress={uploadImages}>
                            <Text style={{ color: '#fff', paddingBottom: 10 }}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

export default DocsUploadScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '90%',
    },
    textshown: {
        fontSize: 12,
        fontFamily: 'zwodrei',
        marginTop: 10,
        marginLeft: 10,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    imageavatar: {
        backgroundColor: '#53C1BA',
        borderColor: '#53C1BA',
        borderWidth: 5,
        borderRadius: 100,
    },
    cardstyle: {
        borderColor: '#53C1BA',
        width: 155,
        height: 165,
        borderWidth: 5,
        borderRadius: 20,
        marginHorizontal: 10,
        marginLeft: 10,
    },
    centerContentAdhaar: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 10,
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#1B75BB',
        color: 'white',
        fontFamily: 'zwodrei',
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttontext: {
        color: 'white',
        fontFamily: 'zwodrei',
        fontSize: 14,
        alignContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,

    },
    AddExperienceButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#1B75BB',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        bottom: 10,
        borderRadius: 8,
        marginTop: 17,

    },
    textshown: {
        fontSize: 14,
        fontFamily: 'zwodrei',
        marginTop: 10,
        marginLeft: 10,
        alignContent: 'center',
        alignItems: 'center',
    },

});
