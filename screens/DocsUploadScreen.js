import { View, Text, ScrollView, StyleSheet, Alert, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import axios from 'axios';
import ImagePicker from '../components/ui/ImagePicker'
import { AuthContext } from '../store/auth-context'
import { string } from 'yup';
import * as FileSystem from 'expo-file-system';
import { Card } from 'react-native-elements';


const DocsUploadScreen = () => {
    const [selectedImage, setSelectedImage] = useState();

    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri.uri);
    }

    const [AdhaarPicFront, setAdhaarPicFront] = useState();

    function takeImageHandlerAdhaarPicFront(imageUri) {
        setAdhaarPicFront(imageUri.uri);
    }
    const [AdhaarPicBack, setAdhaarPicBack] = useState();

    function takeImageHandlerAdhaarPicBack(imageUri) {
        setAdhaarPicBack(imageUri.uri);
    }

    const [OtherIDPicFront, setOtherIDPicFront] = useState();

    function takeImageHandlerOtherIDPicFront(imageUri) {
        setOtherIDPicFront(imageUri.uri);
    }

    const [OtherIDPicBack, setOtherIDPicBack] = useState();

    function takeImageHandlerOtherIDPicBack(imageUri) {
        setOtherIDPicBack(imageUri.uri);
    }

    const authCtx = useContext(AuthContext);

    const jwtToken = authCtx.token;
    const wfid = authCtx.wid;



    async function uploadImagesAdhaarAndOtherID(fileUri, fileType,filename,frontorBack) {
        //let fileUri = AdhaarPicFront;
        let workforceId = wfid;
        //let fileType = 2;

        const token = jwtToken
        console.log(workforceId);
        const url = "http://www.kushalkaamgar.com/kk.api/workforce/fileupload";

        try {
            const formData = new FormData();
            formData.append('WorkforceId', workforceId);
            formData.append('Name', filename)
            formData.append('file', {
                uri: fileUri,
                name: 'image.jpg',
                type: 'image/jpeg',
            });
            formData.append('fileType', fileType);
            formData.append('fileFrontBack', frontorBack);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(response)
                console.log(data)
                if (data === true) {
                    Alert.alert('Success', 'File uploaded successfully.');
                } else {
                    Alert.alert('Error', 'Failed to upload file.');
                }
            } else {
                Alert.alert('Error', 'Failed to upload file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            console.log(error)
            Alert.alert('Error', 'Failed to upload file.');
        }
    }



    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.container}>

                <View style={styles.wrapper}>

                    <Card elevation={7} containerStyle={{ borderRadius: 10, marginBottom: 5 }}>

                        <Text style={styles.textshowncenter}>Upload Photo</Text>
                        <ImagePicker onTakeImage={takeImageHandler} />

                        <View>
                            <TouchableOpacity
                                style={styles.AddExperienceButton}
                                onPress={() => uploadImagesAdhaarAndOtherID(selectedImage, 1, 'photograph.jpg', 1)}>
                                <Text style={{ color: '#fff', paddingBottom: 10 }}>Upload Photograph</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>

                    <Card elevation={7} containerStyle={{ borderRadius: 10, marginBottom: 5 }}>

                        <Text style={styles.textshowncenter}>Upload Adhaar Photo</Text>

                        <Text style={styles.textshown}>1. Front Image</Text>
                        <ImagePicker onTakeImage={takeImageHandlerAdhaarPicFront} />

                        <View>
                            <TouchableOpacity
                                style={styles.AddExperienceButton}
                                onPress={() => uploadImagesAdhaarAndOtherID(AdhaarPicFront,2,'adhaarfront.jpg',1)}>
                                <Text style={{ color: '#fff', paddingBottom: 10 }}>Upload Front Image</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.textshown}>2. Back Image</Text>
                        <ImagePicker onTakeImage={takeImageHandlerAdhaarPicBack} />

                        <View>
                            <TouchableOpacity
                                style={styles.AddExperienceButton}
                                onPress={() => uploadImagesAdhaarAndOtherID(AdhaarPicBack, 2, 'adhaarback.jpg', 2)}>
                                <Text style={{ color: '#fff', paddingBottom: 10 }}>Upload Back Image</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>

                    <Card elevation={7} containerStyle={{ borderRadius: 10, marginBottom: 5 }}>
                        <Text style={styles.textshowncenter}>Upload OtherID Photo</Text>

                        <Text style={styles.textshown}>1. Front Image</Text>
                        <ImagePicker onTakeImage={takeImageHandlerOtherIDPicFront} />

                        <View>
                            <TouchableOpacity
                                style={styles.AddExperienceButton}
                                onPress={() => uploadImagesAdhaarAndOtherID(OtherIDPicFront, 3, 'OtherIDfront.jpg', 1)}>
                                <Text style={{ color: '#fff', paddingBottom: 10 }}>Upload Front Image</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.textshown}>2. Back Image</Text>
                        <ImagePicker onTakeImage={takeImageHandlerOtherIDPicBack} />

                        <View>
                            <TouchableOpacity
                                style={styles.AddExperienceButton}
                                onPress={() => uploadImagesAdhaarAndOtherID(OtherIDPicBack, 3, 'OtherIDback.jpg', 2)}>
                                <Text style={{ color: '#fff', paddingBottom: 10 }}>Upload Back Image</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>

                    <Card elevation={7} containerStyle={{ borderRadius: 10, marginBottom: 5 }}>

                        
                    </Card>

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
        width: '100%',
    },
    textshown: {
        color: '#676A6C',
        fontSize: 15,
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
    textshowncenter: {
        color: '#676A6C',
        fontSize: 18,
        fontFamily: 'zwodrei',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 100
    }


});
