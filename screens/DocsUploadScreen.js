import { View, Text, ScrollView, StyleSheet, Alert, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import axios from 'axios';
import ImagePicker from '../components/ui/ImagePicker'
import { AuthContext } from '../store/auth-context'
import { string } from 'yup';
import * as FileSystem from 'expo-file-system';
import { Card } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';


const DocsUploadScreen = ({ navigation }) => {
    const route = useRoute();
    const { param1 } = route.params;

    const [firstnamefilled, setFirstNamefilled] = useState(false);
    const [lastnamefilled, setLastNamefilled] = useState(false);
    const [phonenumberfilled, setPhoneNumberfilled] = useState(false);
    const [AdhaarIDNumberfilled, setAdhaarIDNumberfilled] = useState(false);
    const [OtherIDNumberfilled, setOtherIDNumberfilled] = useState(false);
    const [CurrentAddressfilled, setCurrentAddressfilled] = useState(false);
    const [PostalCodeCurrentAddressfilled, setPostalCodeCurrentAddressfilled] = useState(false);
    const [PermanentAddressfilled, setPermanentAddressfilled] = useState(false);
    const [PostalCodePermanentAddressfilled, setPostalCodePermanentAddressfilled] = useState(false);
    const [CriminalRecordDescriptionfilled, setCriminalRecordDescriptionfilled] = useState(false);
    const [OtherIDvaluefilled, setOtherIDValuefilled] = useState(null);
    const [Gendervaluefilled, setGenderValuefilled] = useState(null);
    const [MaritalStatusvaluefilled, setMaritalStatusValuefilled] = useState(null);
    const [QualificationTypevaluefilled, setQualificationTypeValuefilled] = useState(null);
    const [experiencefilled, setExperiencefilled] = useState(null);

    const [isComplete, setIsComplete] = useState(false);



   
    

    



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

    const jwtToken = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdGVyQGdtYWlsLmNvbSIsImp0aSI6Ijk5NGY3ZTZkLWNkZGYtNGRiYS1iMmJlLTk2YjNhMDk3NGNhZCIsImV4cCI6MTY4OTIzOTU5NywiaXNzIjoiaHR0cDovL3d3dy5rdXNoYWxrYWFtZ2FyLmNvbS9hcGkiLCJhdWQiOiJVc2VyIn0.- DLtW7BcKt03MQSKRGPzgReHgeNm3t6Pg3qtF_b0pwE";
    const wfid = "6b252c8e-68b9 - 49a3 - 8a29 - 19fa8ef572df";


    const handleMarkComplete = async () => {
        console.log(jwtToken)
        console.log(wfid)
        try {
            const response = await axios.post(`http://www.kushalkaamgar.com/kk.api/workforce/markcomplete/${wfid}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            console.log(JSON.stringify(response.data))
        } catch (error) {
            console.log(error);
        }
    };

    

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

                    <Card elevation={7} containerStyle={{ borderRadius: 10, marginBottom: 5,flex: 1,flexDirection:"column" }}>
                        <TouchableOpacity
                            style={styles.AddExperienceButton}
                            onPress={() => navigation.navigate("IncompleteWorkforceList")}>
                            <Text style={{ color: '#fff', paddingBottom: 10 }}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.AddExperienceButton}
                            onPress={handleMarkComplete}>
                            <Text style={{ color: '#fff', paddingBottom: 10 }}>Mark Complete</Text>
                        </TouchableOpacity>
                        
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
