import React, { useState, useEffect, useContext } from 'react';
import { Alert, FlatList, ScrollView, Button, StyleSheet, Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { AuthContext } from '../store/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Card } from 'react-native-elements';
import ProfessionalDetails from '../Modals/ExperienceDisplay'
import CurrentAddress from '../Modals/AddressDisplay'

const OtherIDdata = [
    { OtherIDlabel: 'Voter ID', OtherIDvalue: '1' },
    { OtherIDlabel: 'Ration Card', OtherIDvalue: '2' },
    { OtherIDlabel: 'Education Certificate', OtherIDvalue: '3' },
    { OtherIDlabel: 'Driving License', OtherIDvalue: '4' },
    { OtherIDlabel: 'PAN Card', OtherIDvalue: '5' },
];

const QualificationTypedata = [
    { QualificationTypelabel: 'No Education', QualificationTypevalue: '1' },
    { QualificationTypelabel: 'Primary School Education', QualificationTypevalue: '2' },
    { QualificationTypelabel: 'Middle School Education', QualificationTypevalue: '3' },
    { QualificationTypelabel: 'High School Education', QualificationTypevalue: '4' },
    { QualificationTypelabel: 'Intermediate Pass', QualificationTypevalue: '5' },
    { QualificationTypelabel: 'Graduation Pass', QualificationTypevalue: '6' },
    { QualificationTypelabel: 'Post-graduation Pass', QualificationTypevalue: '7' },
    { QualificationTypelabel: 'Phd', QualificationTypevalue: '8' },
];

const PrimaryLanguagedata = [
    { PrimaryLanguagelabel: 'Hindi', PrimaryLanguagevalue: '1' },
    { PrimaryLanguagelabel: 'English', PrimaryLanguagevalue: '2' },
    { PrimaryLanguagelabel: 'Urdu', PrimaryLanguagevalue: '3' },
    { PrimaryLanguagelabel: 'Bengali', PrimaryLanguagevalue: '4' },

];
const WayToCommutedata = [
    { WayToCommutelabel: 'Walking', WayToCommutevalue: '1' },
    { WayToCommutelabel: 'Bicycle', WayToCommutevalue: '2' },
    { WayToCommutelabel: 'Motrobike / Scooter', WayToCommutevalue: '3' },
    { WayToCommutelabel: 'Car / Jeep', WayToCommutevalue: '4' },

];



const ViewCompleteWorkforceScreenDetails = () => {

    const authCtx = useContext(AuthContext);

    const token = authCtx.token;
    const workforceIDStored = authCtx.wid;
    const [userdata, setUserData] = useState(null);

    const route = useRoute();
    const { param1 } = route.params;

    const jwtToken = authCtx.token;
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://www.kushalkaamgar.com/kk.api/workforce/getdetails/${param1}/en`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            setUserData(response.data);
            //console.log(response.data);


        };

        fetchData();
    }, []);


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
            const response = await axios.get(`http://www.kushalkaamgar.com/kk.api/workforce/getAadharCard/${param1}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });

            var dd = JSON.parse(JSON.stringify(response.data))
            console.log(dd.frontFileData)
            setUserAdhaarFrontImageData(dd.frontFileData);
            setUserAdhaarBackImageData(dd.backFileData);
        };

        fetchAdhaarImageData();
    }, []);

    const [userOtherIDFrontImagedata, setUserOtherIDFrontImageData] = useState(null);
    const [userOtherIDBackImagedata, setUserOtherIDBackImageData] = useState(null);


    useEffect(() => {
        const fetchOtherIDImageData = async () => {
            const response = await axios.get(`http://www.kushalkaamgar.com/kk.api/workforce/getOtherIdCard/${param1}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });

            var dd = JSON.parse(JSON.stringify(response.data))
            console.log(dd.frontFileData)
            setUserOtherIDFrontImageData(dd.frontFileData);
            setUserOtherIDBackImageData(dd.backFileData);
        };

        fetchOtherIDImageData();
    }, []);



    const [otpStatus, setOTPStatus] = useState('');

    const generateOTP = async (workforceId, jwtToken) => {
        const url = `http://www.kushalkaamgar.com/kk.api/workforce/generateotp/${workforceId}`;
        const headers = {
            'Authorization': `Bearer ${jwtToken}`
        };

        try {
            const response = await axios.post(url, null, { headers });
            console.log(response)
            if (response.status === 200) {
                setOTPStatus('OK');
            } else {
                throw new Error('SMS sending failed');
            }
        } catch (error) {
            setOTPStatus(error.message);
        }
    };



    if (!userdata) {
        return (
            <LoadingOverlay message="Loading..." />
        );
    }

    const selectedOtherID = OtherIDdata.find(item => item.OtherIDvalue == userdata.workforce.otherIdType);
    const selectedQualificationType = QualificationTypedata.find(item => item.QualificationTypevalue == userdata.workforce.qualificationId);
    const selectedPrimaryLanguage = PrimaryLanguagedata.find(item => item.PrimaryLanguagevalue == userdata.workforce.primaryLanguageId);
    const selectedWayToCommute = WayToCommutedata.find(item => item.WayToCommutevalue == userdata.workforce.commuteById);

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.wrapper}>
                <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                    <Text style={styles.headline}>Personal Info</Text>
                    <Text style={styles.normalline}>Name                   : {userdata.workforceTranslations[0].firstName} {userdata.workforceTranslations[0].middleName} {userdata.workforceTranslations[0].lastName}</Text>
                    <Text style={styles.normalline}>Email                    : {userdata.workforce.email}</Text>
                    <Text style={styles.normalline}>Cellphone             : {userdata.workforce.cellphone}</Text>
                    <Text style={styles.normalline}>Aadhaar               : {userdata.workforce.aadhaarId}</Text>
                    <Text style={styles.normalline}>Alt Cellphone         : {userdata.workforce.cellphoneAlt}</Text>
                    <Text style={styles.normalline}>Date of Birth         : {userdata.workforce.dateOfBirth}</Text>
                    <Text style={styles.normalline}>Gender                  : {userdata.workforce.genderId == 1 ? "Male" : "Female"}</Text>
                    <Text style={styles.normalline}>Marital Status        : {userdata.workforce.maritalStatusId == 1 ? "Single" : "Married"}</Text>
                    <Text style={styles.normalline}>Other ID                : {userdata.workforce.otherIdNumber}</Text>
                    <Text style={styles.normalline}>Other ID Type         : {selectedOtherID ? selectedOtherID.OtherIDlabel : 'Not Selected'}</Text>
                    <Text style={styles.normalline}>Qualification           : {selectedQualificationType ? selectedQualificationType.QualificationTypelabel : "Not Selected"}</Text>
                </Card>

                <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                    <Text style={styles.headline}>Language Info</Text>
                    <Text style={styles.normalline}>Primary Language         : {selectedPrimaryLanguage ? selectedPrimaryLanguage.PrimaryLanguagelabel : "Not Selected"}</Text>
                    <View style={styles.otherLangContainer}>
                        <Text style={styles.normalline}>Other Language(s)        :</Text>

                        <Text>{userdata.otherLanguages.map((language, index) => (
                            <Text key={index} style={styles.normalline}>  {index + 1}{"."} {language.otherLanguageName}{'\n'}</Text>
                        ))}</Text>
                    </View>

                </Card>

                <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                    <Text style={styles.headline}>Location Preferences</Text>

                    <View style={styles.otherLangContainer}>

                        <Text style={styles.normalline}>{userdata.locationPreferences.map((location, index) => (
                            <Text key={index} style={styles.normalline}>  {index + 1}{"."} {location.locationPreferenceName}{'\n'}</Text>
                        ))}</Text>
                    </View>

                </Card>

                <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                    <Text style={styles.headline}>Professional Details</Text>

                    {userdata.professions.map((profession, index) => (
                        <View key={index}>
                            <Card>
                                <Text style={styles.headline}>Experience {index + 1}</Text>
                                <ProfessionalDetails profession={profession} />
                            </Card>
                        </View>
                    ))}

                    <Text style={[styles.normalline, { marginTop: 15 }]}>Mode of Commute :  {selectedWayToCommute ? selectedWayToCommute.WayToCommutelabel : 'Not Selected'}</Text>

                </Card>

                <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                    <Text style={styles.headline}>Current Address</Text>
                    {userdata.currentAddresses.map((address, index) => (
                        <View key={index}>
                            <CurrentAddress addressdata={address} />
                        </View>
                    ))}

                </Card>

                <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                    <Text style={styles.headline}>Permanent Address</Text>
                    {userdata.permanentAddresses.map((address, index) => (
                        <View key={index}>
                            <CurrentAddress addressdata={address} />
                        </View>
                    ))}

                </Card>

                <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                    <Text style={styles.headline}>Image Files</Text>


                    <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                        <Text style={styles.headline}>Photograph </Text>

                        <Image
                            style={{
                                width: 370,
                                height: 200,
                                resizeMode: 'contain',
                            }}
                            source={{
                                uri:
                                    `data:image/png;base64,${userImagedata}`,
                            }}
                        />
                    </Card>

                    <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                        <Text style={styles.headline}>Aadhaar  </Text>
                        <Text style={styles.headline}>Front</Text>
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

                        <Text style={styles.headline}>Back</Text>
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
                    </Card>


                    <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                        <Text style={styles.headline}>Other ID: </Text>
                        <Text style={styles.headline}>Front</Text>
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
                        <Text style={styles.headline}>Back</Text>
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
                    </Card>

                </Card>

                <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                    <Text style={styles.headline}>Verify Workforce</Text>
                    <TouchableOpacity
                        style={styles.AddExperienceButton}
                        onPress={() => generateOTP(param1, jwtToken)}
                    >
                        <Text style={{ color: '#fff', paddingBottom: 5 }}>Send OTP to Verify</Text>
                    </TouchableOpacity>


                    <View style={styles.otherLangContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter OTP"
                            secureTextEntry
                        />

                        <TouchableOpacity
                            style={styles.Verifyotp}
                        >
                            <Text style={{ color: '#fff', paddingBottom: 5 }}>Click to Verify</Text>
                        </TouchableOpacity>
                    </View>



                </Card>




            </View>
        </ScrollView >
    );
};

export default ViewCompleteWorkforceScreenDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '100%',
    },
    headline: {
        fontSize: 18,
        fontWeight: 'bold',
      
    },
    normalline: {
        fontSize: 16,
        marginBottom: 10,
    },
    otherLangContainer: {
        flexDirection: 'row',
        alignContent: 'space-around',


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
        marginBottom: 10

    },
    input: {
        height: 45,
        borderWidth: 2,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontFamily: 'zwodrei',
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    },
    Verifyotp: {
        width: '30%',
        height: 45,
        backgroundColor: '#1B75BB',
        justifyContent: 'space-around',
        marginLeft: 90,
        borderRadius: 5,
        padding: 5,
        marginTop: 10,
        marginBottom: 10,

    },


});

