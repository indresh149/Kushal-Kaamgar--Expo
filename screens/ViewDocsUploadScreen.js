import { View, Text, ScrollView, StyleSheet, Alert, TouchableHighlight, Image, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import ImagePicker from '../components/ui/ImagePicker'
import { AuthContext } from '../store/auth-context'
import { string } from 'yup';
import * as FileSystem from 'expo-file-system';
import { Card } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import LoadingOverlay from '../components/ui/LoadingOverlay';

const ViewDocsUploadScreen = () => {

    const [changeImage, setChangeImage] = useState(false);
    const [changeAdhaarFrontImage, setChangeAdhaarFrontImage] = useState(false);
    const [changeAdhaarBackImage, setChangeAdhaarBackImage] = useState(false);
    const [changeOtherIDFrontImage, setChangeOtherIDFrontImage] = useState(false);
    const [changeOtherIDBackImage, setChangeOtherIDBackImage] = useState(false);

    const route = useRoute();

    const { param1 } = route.params;

    const authCtx = useContext(AuthContext);

    const jwtToken = authCtx.token;
    const wfid = authCtx.wid;

    const [userImagedata, setUserImageData] = useState(null);

    useEffect(() => {
        const fetchImageData = async () => {

            try {


                const response = await axios.get(`http://www.kushalkaamgar.com/kk.api/workforce/getPhotograph/${param1}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                var dd = JSON.parse(JSON.stringify(response.data))
                console.log(dd.frontFileData)
                setUserImageData(dd.frontFileData);
            }
            catch (error) {
                console.log(error)
            }

        };

        fetchImageData();
    }, []);

    const [userAdhaarFrontImagedata, setUserAdhaarFrontImageData] = useState(null);
    const [userAdhaarBackImagedata, setUserAdhaarBackImageData] = useState(null);


    useEffect(() => {

        const fetchAdhaarImageData = async () => {
            try {
                const response = await axios.get(`http://www.kushalkaamgar.com/kk.api/workforce/getAadharCard/${param1}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                var dd = JSON.parse(JSON.stringify(response.data))
                console.log(dd.frontFileData)
                setUserAdhaarFrontImageData(dd.frontFileData);
                setUserAdhaarBackImageData(dd.backFileData);

            } catch (error) {
                console.log(error)
            }
        };



        fetchAdhaarImageData();
    }, []);

    const [userOtherIDFrontImagedata, setUserOtherIDFrontImageData] = useState(null);
    const [userOtherIDBackImagedata, setUserOtherIDBackImageData] = useState(null);


    useEffect(() => {
        const fetchOtherIDImageData = async () => {
            try {
                const response = await axios.get(`http://www.kushalkaamgar.com/kk.api/workforce/getOtherIdCard/${param1}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                var dd = JSON.parse(JSON.stringify(response.data))
                console.log(dd.frontFileData)
                setUserOtherIDFrontImageData(dd.frontFileData);
                setUserOtherIDBackImageData(dd.backFileData);

            }
            catch (error) {
                console.log(error)
            }
        };



        fetchOtherIDImageData();
    }, []);



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

   



    async function uploadImagesAdhaarAndOtherID(fileUri, fileType, filename, frontorBack) {
        //let fileUri = AdhaarPicFront;
        let workforceId = param1;
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

                        <Text style={styles.textshowncenter}>Photograph</Text>

                        {userImagedata != null ? 
                            <Image
                                style={{
                                    width: 270,
                                    height: 200,
                                    resizeMode: 'contain',
                                }}
                                source={{
                                    uri:
                                        `data:image/png;base64,${userImagedata}`,
                                }}


                            />
                            :
                            null
                        }
                        <TouchableOpacity
                            style={styles.AddExperienceButton}
                            onPress={() => setChangeImage(true)}>
                            <Text style={{ color: '#fff', paddingBottom: 10 }}>Update Photograph</Text>
                        </TouchableOpacity>
                        
                        
                        {changeImage ? 
                            <>
                            <ImagePicker onTakeImage={takeImageHandler} />
                            <View>
                            <TouchableOpacity
                                style={styles.AddExperienceButton}
                                onPress={() => uploadImagesAdhaarAndOtherID(selectedImage, 1, 'photograph.jpg', 1)}>
                                <Text style={{ color: '#fff', paddingBottom: 10 }}>Upload New Photograph</Text>
                            </TouchableOpacity>
                        </View>
                            </>
                            : null}
                        

                        
                    </Card>

                    <Card elevation={7} containerStyle={{ borderRadius: 10, marginBottom: 5 }}>

                        <Text style={styles.textshowncenter}>Adhaar Photo</Text>
                        <Text style={styles.textshown}>1. Front Image</Text>

                        {userAdhaarFrontImagedata != null ?
                            <Image
                                style={{
                                    width: 270,
                                    height: 200,
                                    resizeMode: 'contain',
                                }}
                                source={{
                                    uri:
                                        `data:image/png;base64,${userAdhaarFrontImagedata}`,
                                }}


                            />
                            :
                            null
                        }
                        <TouchableOpacity
                            style={styles.AddExperienceButton}
                            onPress={() => setChangeAdhaarFrontImage(true)}>
                            <Text style={{ color: '#fff', paddingBottom: 10 }}>Update Adhaar Front Image</Text>
                        </TouchableOpacity>

                        {changeAdhaarFrontImage ?
                            <>
                                <ImagePicker onTakeImage={takeImageHandlerAdhaarPicFront} />
                                <View>
                                    <TouchableOpacity
                                        style={styles.AddExperienceButton}
                                        onPress={() => uploadImagesAdhaarAndOtherID(AdhaarPicFront, 2, 'adhaarfront.jpg', 1)}>
                                        <Text style={{ color: '#fff', paddingBottom: 10 }}>Upload New Adhaar Front Image</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            : null}

                        <Text style={styles.textshown}>2. Back Image</Text>

                        {userAdhaarFrontImagedata != null ?
                            <Image
                                style={{
                                    width: 270,
                                    height: 200,
                                    resizeMode: 'contain',
                                }}
                                source={{
                                    uri:
                                        `data:image/png;base64,${userAdhaarBackImagedata}`,
                                }}


                            />
                            :
                            null
                        }
                        <TouchableOpacity
                            style={styles.AddExperienceButton}
                            onPress={() => setChangeAdhaarBackImage(true)}>
                            <Text style={{ color: '#fff', paddingBottom: 10 }}>Update Adhaar Back Image</Text>
                        </TouchableOpacity>

                        {changeAdhaarBackImage ?
                            <>
                                <ImagePicker onTakeImage={takeImageHandlerAdhaarPicBack} /> 
                                <View>
                                    <TouchableOpacity
                                        style={styles.AddExperienceButton}
                                        onPress={() => uploadImagesAdhaarAndOtherID(AdhaarPicBack, 2, 'adhaarback.jpg', 2)}>
                                        <Text style={{ color: '#fff', paddingBottom: 10 }}>Upload New Adhaar Back Image</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            : null}
                                   
                    </Card>

                    <Card elevation={7} containerStyle={{ borderRadius: 10, marginBottom: 5 }}>
                        <Text style={styles.textshowncenter}>Upload OtherID Photo</Text>

                        <Text style={styles.textshown}>1. Front Image</Text>

                        {userAdhaarFrontImagedata != null ?
                            <Image
                                style={{
                                    width: 270,
                                    height: 200,
                                    resizeMode: 'contain',
                                }}
                                source={{
                                    uri:
                                        `data:image/png;base64,${userOtherIDFrontImagedata}`,
                                }}


                            />
                            :
                            null
                        }
                        <TouchableOpacity
                            style={styles.AddExperienceButton}
                            onPress={() => setChangeOtherIDFrontImage(true)}>
                            <Text style={{ color: '#fff', paddingBottom: 10 }}>Update OtherID Front Image</Text>
                        </TouchableOpacity>

                        {changeOtherIDFrontImage ?
                            <>
                                <ImagePicker onTakeImage={takeImageHandlerOtherIDPicFront} />
                                <View>
                                    <TouchableOpacity
                                        style={styles.AddExperienceButton}
                                        onPress={() => uploadImagesAdhaarAndOtherID(OtherIDPicFront, 3, 'OtherIDfront.jpg', 1)}>
                                        <Text style={{ color: '#fff', paddingBottom: 10 }}>Upload New OtherID Front Image</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            : null}
                        
                        
                        <Text style={styles.textshown}>2. Back Image</Text>

                        {userAdhaarFrontImagedata != null ?
                            <Image
                                style={{
                                    width: 270,
                                    height: 200,
                                    resizeMode: 'contain',
                                }}
                                source={{
                                    uri:
                                        `data:image/png;base64,${userOtherIDBackImagedata}`,
                                }}


                            />
                            :
                            null
                        }
                        <TouchableOpacity
                            style={styles.AddExperienceButton}
                            onPress={() => setChangeOtherIDBackImage(true)}>
                            <Text style={{ color: '#fff', paddingBottom: 10 }}>Update OtherID Back Image</Text>
                        </TouchableOpacity>

                        {changeOtherIDBackImage ?
                            <>
                                <ImagePicker onTakeImage={takeImageHandlerOtherIDPicBack} />
                                <View>
                                    <TouchableOpacity
                                        style={styles.AddExperienceButton}
                                        onPress={() => uploadImagesAdhaarAndOtherID(OtherIDPicBack, 3, 'OtherIDback.jpg', 2)}>
                                        <Text style={{ color: '#fff', paddingBottom: 10 }}>Upload New OtherID Back Image</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            : null}
                      

                        
                    </Card>

                    <Card elevation={7} containerStyle={{ borderRadius: 10, marginBottom: 5 }}>


                    </Card>

                </View>
            </View>
        </ScrollView>
    )
}

export default ViewDocsUploadScreen;

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
