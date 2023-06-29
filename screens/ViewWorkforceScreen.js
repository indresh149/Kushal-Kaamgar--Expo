import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../store/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import { Alert, FlatList, ScrollView, Button, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import RadioForm from 'react-native-simple-radio-button';
import Iconnew from 'react-native-vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';
import * as yup from 'yup';
import LocationPreferencesFields from '../components/DropDown/LocationPreferencesFields';
import OtherKnownLanguageFields from '../components/DropDown/OtherKnownLanguageFields';
import ExperienceModal from '../Modals/ExperienceModal';

import Checkbox from 'expo-checkbox';
import Custom_Dropdown from '../components/DropDown/Custom_Dropdown';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-modern-datepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const OtherIDdata = [
    { OtherIDlabel: 'Voter ID', OtherIDvalue: 1 },
    { OtherIDlabel: 'Ration Card', OtherIDvalue: 2 },
    { OtherIDlabel: 'Education Certificate', OtherIDvalue: 3 },
    { OtherIDlabel: 'Driving License', OtherIDvalue: 4 },
    { OtherIDlabel: 'PAN Card', OtherIDvalue: 5},

];

const Genderdata = [
    { Genderlabel: 'Male', Gendervalue: 1 },
    { Genderlabel: 'Female', Gendervalue: 2 },

];

const MaritalStatusdata = [
    { MaritalStatuslabel: 'Married', MaritalStatusvalue: true },
    { MaritalStatuslabel: 'Unmarried', MaritalStatusvalue: false },

];

const QualificationTypedata = [
    { QualificationTypelabel: 'No Education', QualificationTypevalue: 1 },
    { QualificationTypelabel: 'Primary School Education', QualificationTypevalue: 2 },
    { QualificationTypelabel: 'Middle School Education', QualificationTypevalue: 3 },
    { QualificationTypelabel: 'High School Education', QualificationTypevalue: 4 },
    { QualificationTypelabel: 'Intermediate Pass', QualificationTypevalue:5 },
    { QualificationTypelabel: 'Graduation Pass', QualificationTypevalue: 6 },
    { QualificationTypelabel: 'Post-graduation Pass', QualificationTypevalue: 7 },
    { QualificationTypelabel: 'Phd', QualificationTypevalue:8 },
]

const primaryLanguageData = [
    { PrimaryLanguagelabel: 'Hindi', PrimaryLanguagevalue: 1 },
    { PrimaryLanguagelabel: 'English', PrimaryLanguagevalue: 2 },
    { PrimaryLanguagelabel: 'Urdu', PrimaryLanguagevalue: 3 },
    { PrimaryLanguagelabel: 'Bengali', PrimaryLanguagevalue: 4 },
];


const WayToCommutedata = [
    { WayToCommutelabel: 'Walking', WayToCommutevalue: '1' },
    { WayToCommutelabel: 'Bicycle', WayToCommutevalue: '2' },
    { WayToCommutelabel: 'Motrobike / Scooter', WayToCommutevalue: '3' },
    { WayToCommutelabel: 'Car / Jeep', WayToCommutevalue: '4' },

];

const criminalRecordData = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
];

const isOtherLanguageData = [
    { label: "Yes", value: true },
    { label: "No", value: false },
];

const registerValidationSchema = yup.object().shape({
    firstname: yup.string()
        .required('First Name is required'),
    middlename: yup.string(),
    lastname: yup.string(),

    email: yup.string()
        .email('Please enter valid email'),
    phonenumber: yup.string()
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactlt 10 digits')
        .required('Phone Number is required')
        .matches(/^[0-9]+$/, "Must be only digits"),
    Altphonenumber: yup.string()
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactlt 10 digits')
        .matches(/^[0-9]+$/, "Must be only digits"),
    AdhaarIDNumber: yup.string()
        .min(12, 'Must be exactly 12 digits')
        .max(12, 'Must be exactlt 12 digits')
        .matches(/^[0-9]+$/, "Must be only digits"),
    OtherIDNumber: yup.string()
        .min(3, 'Must be atleast 3 digits')
        .max(24, 'Must be atmost 24 digits'),
    CurrentAddress: yup.string(),
    PostalCodeCurrentAddress: yup.string()
        .min(6, 'Must be atleast 6 digits')
        .matches(/^[0-9]+$/, "Must be only digits"),
    PermanentAddress: yup.string(),
    PostalCodePermanentAddress: yup.string()
        .min(6, 'Must be atleast 6 digits')
        .matches(/^[0-9]+$/, "Must be only digits"),
    CriminalRecordDescription: yup.string()
        .min(4, 'Must be atleast 4 letters')
});




const ViewWorkforceScreen = ({ navigation }) => {

    const [firstname, setFirstName] = useState('');
    const [middlename, setMiddleName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [Altphonenumber, setAltPhoneNumber] = useState('');
    const [AdhaarIDNumber, setAdhaarIDNumber] = useState('');
    const [OtherIDNumber, setOtherIDNumber] = useState('');
    const [CurrentAddress, setCurrentAddress] = useState('');
    const [PostalCodeCurrentAddress, setPostalCodeCurrentAddress] = useState('');
    const [PermanentAddress, setPermanentAddress] = useState('');
    const [PostalCodePermanentAddress, setPostalCodePermanentAddress] = useState('');
    const [CriminalRecordDescription, setCriminalRecordDescription] = useState('');

    const [fetchedMessage, setFetchedMesssage] = useState([]);

    

    

   
   
    const [visible, setVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [experience, setExperience] = useState([]);


    const [isChecked, setChecked] = useState(false);


    const [data, setData] = useState([{ LocationPreferenceID: '', LocationPreferenceOrder: '' }]);
    const changeLocationPrefID = (ind, txt) => {
        let temp = data;
        temp.map((item, index) => {
            if (index == ind) {
                item.LocationPreferenceID = txt;
            }
        });
        console.log(temp);
        setData(temp);
    };
    const changeLocationPrefOrder = (ind, txt) => {
        let temp = data;
        temp.map((item, index) => {
            if (index == ind) {
                item.LocationPreferenceOrder = txt;
            }
        });
        console.log(temp);
        setData(temp);
    };

    const [otherKnownLangData, setOtherKnownLangData] = useState([]);

    const handleOtherKnownLangIdChange = (index, text) => {
        setOtherKnownLangData(prevData => {
            const newData = [...prevData];
            newData[index] = text;
            return newData;
        });
    };

    const handleRemoveItem = (index) => {
        setOtherKnownLangData(prevData => {
            const newData = [...prevData];
            newData.splice(index, 1);
            return newData;
        });
    };

    const handleAddItem = () => {
        setOtherKnownLangData(prevData => [...prevData, '']);
        console.log(otherKnownLangData);
    };


    const [WayToCommutevalue, setWayToCommuteValue] = useState(null);
    const [WayToCommuteisFocus, setWayToCommuteIsFocus] = useState(false);

    const [criminalRecordvalue, setCriminalRecordValuecr] = useState(null || true);
    

    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        if (currentDate == new Date()) {
            setDate(null);
        }
        else {
            setDate(currentDate);
        }

    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date || userdata.workforce.dateOfBirth,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const [selectedDate, setSelectedDate] = useState('');



    const [adhaarNumber, setAdhaarNumber] = useState('');

    const formatAdhaarNumber = (text) => {
        let formattedText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (formattedText.length > 0) {
            formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join('-'); // Insert hyphens after every 4 characters
        }
        setAdhaarNumber(formattedText);
        console.log(adhaarNumber)
    };

    //const [initialPrimaryLanguageValue, setInitialPrimaryLanguageValue] = useState();

    const authCtx = useContext(AuthContext);

    const token = authCtx.token;
    const workforceIDStored = authCtx.wid;
    const [userdata, setUserData] = useState(null);

    const route = useRoute();
    const { param1 } = route.params;

    const jwtToken = authCtx.token;
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await axios.get(`http://www.kushalkaamgar.com/kk.api/workforce/getdetails/${param1}/en`, {
    //             headers: {
    //                 'Authorization': `Bearer ${jwtToken}`
    //             }
    //         });
    //         setUserData(response.data);
    //         setInitialPrimaryLanguageValue(response.data.workforce.primaryLanguageId);
    //         console.log(response.data);

    //         console.log(userdata)
    //     };

    //     fetchData();
    // }, []);

    // const [primaryLanguageValue, setPrimaryLanguageValue] = useState(null);
    // const [primaryLanguageIsFocus, setPrimaryLanguageIsFocus] = useState(false);


    // const primaryLanguageData = [
    //     { PrimaryLanguagelabel: 'Hindi', PrimaryLanguagevalue: 1 },
    //     { PrimaryLanguagelabel: 'English', PrimaryLanguagevalue: 2 },
    //     { PrimaryLanguagelabel: 'Urdu', PrimaryLanguagevalue: 3 },
    //     { PrimaryLanguagelabel: 'Bengali', PrimaryLanguagevalue: 4},

    // ];

    // //const initialPrimaryLanguageValue = userdata.workforce.primaryLanguageId;
    // console.log("Hii")
    // console.log(initialPrimaryLanguageValue)
    // console.log("Bye")


    // const initialPrimaryLanguageOption = primaryLanguageData.find(
    //     (option) => option.PrimaryLanguagevalue === initialPrimaryLanguageValue
    // );

    // // Set the initial value when the component mounts


    // useState(() => {
    //     setPrimaryLanguageValue(initialPrimaryLanguageOption);
    // }, []);

    


    // if (!userdata) {
    //     return (
    //         <LoadingOverlay message="Loading..." />
    //     );
    // }

    const [initialPrimaryLanguageValue, setInitialPrimaryLanguageValue] = useState();
   // const [userdata, setUserData] = useState(null);
    const [primaryLanguageValue, setPrimaryLanguageValue] = useState(null);
    const [primaryLanguageIsFocus, setPrimaryLanguageIsFocus] = useState(false);


    const [initialOtherIDValue, setInitialOtherIDValue] = useState();
    const [OtherIDvalue, setOtherIDValue] = useState(null);
    const [OtherIDisFocus, setOtherIDIsFocus] = useState(false);

    const [initialQualificationTypeValue, setInitialQualificationTypeValue] = useState();
    const [QualificationTypevalue, setQualificationTypeValue] = useState(null);
    const [QualificationTypeisFocus, setQualificationTypeIsFocus] = useState(false);


    const [initialGenderValue, setInitialGenderValue] = useState();
    const [Gendervalue, setGenderValue] = useState(null);
    const [GenderisFocus, setGenderIsFocus] = useState(false);

    const [initialMaritalStatusValue, setInitialMaritalStatusValue] = useState();
    const [MaritalStatusvalue, setMaritalStatusValue] = useState(null);
    const [MaritalStatusisFocus, setMaritalStatusIsFocus] = useState(false);


    const [initialOtherLanguageValue, setInitialOtherLanguageValue] = useState();
    const [isOtherLanguagevalue, setIsOtherLanguagevalue] = useState(null);


    const preferenceData = [
    { preferenceOrder: 0 },
    { preferenceOrder: 1 },
    { preferenceOrder: 2 },
  ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://www.kushalkaamgar.com/kk.api/workforce/getdetails/${param1}/en`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });
                setUserData(response.data);
                setInitialPrimaryLanguageValue(response.data.workforce.primaryLanguageId);
                setInitialOtherIDValue(response.data.workforce.otherIdType);
                setInitialQualificationTypeValue(response.data.workforce.qualificationId);
                setInitialGenderValue(response.data.workforce.genderId);
                setInitialMaritalStatusValue(response.data.workforce.isMarried);
                setInitialOtherLanguageValue(response.data.workforce.isOtherLanguage);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (initialOtherIDValue && initialPrimaryLanguageValue && userdata) {
            const initialPrimaryLanguageOption = primaryLanguageData.find(
                (option) => option.PrimaryLanguagevalue === initialPrimaryLanguageValue
            );

            const initialOtherIDOption = OtherIDdata.find(
                (option) => option.OtherIDvalue === initialOtherIDValue
            );

            const initialQua = QualificationTypedata.find(
                (option) => option.QualificationTypevalue === initialQualificationTypeValue
            );

            const initialGenderOption = Genderdata.find(
                (option) => option.Gendervalue === initialGenderValue
            );

            const initialMaritalStatusOption = MaritalStatusdata.find(
                (option) => option.MaritalStatusvalue === initialMaritalStatusValue
            );

            const initialOtherLanguageOption = isOtherLanguageData.find(
                (option) => option.value === initialOtherLanguageValue
            );

            setPrimaryLanguageValue(initialPrimaryLanguageOption);
            setOtherIDValue(initialOtherIDOption);
            setQualificationTypeValue(initialQua);
            setGenderValue(initialGenderOption);
            setMaritalStatusValue(initialMaritalStatusOption);
            setIsOtherLanguagevalue(initialOtherLanguageOption);
        }
    }, [initialOtherIDValue, initialPrimaryLanguageValue, initialQualificationTypeValue, initialGenderValue, initialMaritalStatusValue, initialOtherLanguageValue, userdata]);

    if (!userdata) {
        return <LoadingOverlay message="Loading..." />;
    }
   

    return (
        <Formik
            initialValues={{
                firstname: '',
                middlename: '',
                lastname: '',
                email: '',
                phonenumber: '',
                Altphonenumber: '',
                AdhaarIDNumber: '',
                OtherIDNumber: '',
                CurrentAddress: '',
                PostalCodeCurrentAddress: '',
                PermanentAddress: '',
                PostalCodePermanentAddress: '',
                CriminalRecordDescription: '',

            }}

            validationSchema={registerValidationSchema}
            onSubmit={values => submitHandler(values.firstname, values.middlename, values.lastname, values.email, values.phonenumber, values.Altphonenumber, values.AdhaarIDNumber, values.OtherIDNumber,
                values.CurrentAddress, values.PostalCodeCurrentAddress, values.PermanentAddress, values.PostalCodePermanentAddress, values.CriminalRecordDescription)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldTouched, touched, isValid }) => (
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.container}>

                        <View style={styles.wrapper}>
                            {console.log(userdata.workforce.otherIdType)}
                            <Card elevation={7} containerStyle={{ borderRadius: 10, }}>

                                <TextInput
                                    style={styles.input}

                                    value={values.firstname || userdata.workforceTranslations[0].firstName}
                                    placeholder="Enter First Name"
                                    onChangeText={handleChange('firstname')}
                                    onBlur={() => setFieldTouched('firstname')}
                                />
                                {(errors.firstname && touched.firstname) &&
                                    <Text style={styles.errors}>{errors.firstname}</Text>
                                }



                                <TextInput
                                    style={styles.input}
                                    value={values.middlename || userdata.workforceTranslations[0].middleName}
                                    placeholder="Enter Middle Name"
                                    onChangeText={handleChange('middlename')}
                                    onBlur={() => setFieldTouched('middlename')}
                                />
                                {(errors.middlename && touched.middlename) && (
                                    <Text style={styles.errors}>{errors.middlename}</Text>
                                )}

                                <TextInput
                                    style={styles.input}
                                    value={values.lastname || userdata.workforceTranslations[0].lastName}
                                    placeholder="Enter Last Name"
                                    onChangeText={handleChange('lastname')}
                                    onBlur={() => setFieldTouched('lastname')}
                                />
                                {(errors.lastname && touched.lastname) &&
                                    <Text style={styles.errors}>{errors.lastname}</Text>
                                }

                                <TextInput
                                    style={styles.input}
                                    value={values.email || userdata.workforce.email}
                                    placeholder="Enter Email"
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                />
                                {(errors.email && touched.email) &&
                                    <Text style={styles.email}>{errors.email}</Text>
                                }
                            </Card>


                            <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                                <TextInput
                                    style={styles.input}
                                    value={values.phonenumber || userdata.workforce.cellphone}
                                    placeholder="Enter Phone Number"
                                    onChangeText={handleChange('phonenumber')}
                                    onBlur={() => setFieldTouched('phonenumber')}
                                    keyboardType="numeric"
                                />
                                {(errors.phonenumber && touched.phonenumber) &&
                                    <Text style={styles.errors}>{errors.phonenumber}</Text>
                                }

                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your Adhaar number"
                                    value={adhaarNumber || userdata.workforce.aadhaarId}
                                    onChangeText={formatAdhaarNumber}
                                    keyboardType="numeric"
                                    maxLength={14} // 12 digits and 2 hyphens
                                />


                                <TextInput
                                    style={styles.input}
                                    value={values.Altphonenumber || userdata.workforce.cellphoneAlt}
                                    placeholder="Enter Alternative Phone Number"
                                    onChangeText={handleChange('Altphonenumber')}
                                    onBlur={() => setFieldTouched('Altphonenumber')}
                                    keyboardType="numeric"
                                />
                                {(errors.Altphonenumber && touched.Altphonenumber) &&
                                    <Text style={styles.errors}>{errors.Altphonenumber}</Text>
                                }
                            </Card>


                            <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                                <Text style={styles.textshown}>Date Of Birth</Text>

                                <View style={styles.DOBPicker}>
                                    <TouchableOpacity
                                        onPress={showDatepicker}
                                    >
                                        <Text>{date.toLocaleDateString()}</Text>
                                    </TouchableOpacity>
                                    <Iconnew
                                        style={styles.icon}
                                        size={25}
                                        name="calendar"
                                        onPress={showDatepicker}
                                    >
                                    </Iconnew>


                                </View>



                                <TextInput
                                    style={styles.input}
                                    value={values.OtherIDNumber || userdata.workforce.otherIdNumber}
                                    placeholder="Enter OtherID Number"
                                    onChangeText={handleChange('OtherIDNumber')}
                                    onBlur={() => setFieldTouched('OtherIDNumber')}
                                />
                                {(errors.OtherIDNumber && touched.OtherIDNumber) &&
                                    <Text style={styles.errors}>{errors.OtherIDNumber}</Text>
                                }



                                <Text style={styles.textshown}>Select OtherID Type</Text>
                                <View style={styles.icondropdown}>

                                    <Dropdown
                                        style={[styles.dropdown, OtherIDisFocus && { borderColor: '#25c4b9' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={OtherIDdata.filter(item => item !== item.OtherIDvalue)}
                                        search
                                        maxHeight={400}
                                        labelField="OtherIDlabel"
                                        valueField="OtherIDvalue"
                                        placeholder={!OtherIDisFocus ? 'Select' : '...'}
                                        searchPlaceholder="Search..."
                                        value={OtherIDvalue || userdata.workforce.otherIdType}

                                        onFocus={() => setOtherIDIsFocus(true)}
                                        onBlur={() => setOtherIDIsFocus(false)}
                                        onChange={item => {
                                            setOtherIDValue(item.OtherIDvalue);
                                            setOtherIDIsFocus(false);
                                        }}
                                    />
                                    <Entypo
                                        style={styles.icon}
                                        name="circle-with-cross" size={24} color="black"
                                        onPress={() => {
                                            setOtherIDValue(null);
                                            setOtherIDIsFocus(false);
                                        }}
                                    />

                                </View>

                            </Card>

                            <Card elevation={7} containerStyle={{ borderRadius: 10, }}>

                                <Text style={styles.textshown}>Select Qualification Type</Text>
                                <View style={styles.icondropdown}>
                                    <Dropdown
                                        style={[styles.dropdown, QualificationTypeisFocus && { borderColor: '#25c4b9' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={QualificationTypedata}
                                        search
                                        maxHeight={400}
                                        labelField="QualificationTypelabel"
                                        valueField="QualificationTypevalue"
                                        placeholder={!QualificationTypeisFocus ? 'Select' : '...'}
                                        searchPlaceholder="Search..."
                                        value={QualificationTypevalue}
                                        onFocus={() => setQualificationTypeIsFocus(true)}
                                        onBlur={() => setQualificationTypeIsFocus(false)}
                                        onChange={item => {
                                            setQualificationTypeValue(item.QualificationTypevalue);
                                            console.log(item.QualificationTypevalue)
                                            setQualificationTypeIsFocus(false);
                                        }}
                                    />
                                    <Entypo
                                        style={styles.icon}
                                        name="circle-with-cross" size={24} color="black"
                                        onPress={() => {
                                            setQualificationTypeValue(null);
                                            setQualificationTypeIsFocus(false);
                                        }}
                                    />
                                </View>


                                <Text style={styles.textshown}>Select Gender</Text>
                                <View style={styles.icondropdown}>

                                    <Dropdown
                                        style={[styles.dropdown, GenderisFocus && { borderColor: '#25c4b9' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={Genderdata}
                                        search
                                        maxHeight={400}
                                        labelField="Genderlabel"
                                        valueField="Gendervalue"
                                        placeholder={!GenderisFocus ? 'Select' : '...'}
                                        searchPlaceholder="Search..."
                                        value={Gendervalue}
                                        onFocus={() => setGenderIsFocus(true)}
                                        onBlur={() => setGenderIsFocus(false)}
                                        onChange={item => {
                                            setGenderValue(item.Gendervalue);
                                            setGenderIsFocus(false);
                                        }}
                                    />
                                    <Entypo
                                        style={styles.icon}
                                        name="circle-with-cross" size={24} color="black"
                                        onPress={() => {
                                            setGenderValue(null);
                                            setGenderIsFocus(false);
                                        }}
                                    />
                                </View>

                                <Text style={styles.textshown}>Select Marital Status</Text>
                                <View style={styles.icondropdown}>
                                    <Dropdown
                                        style={[styles.dropdown, MaritalStatusisFocus && { borderColor: '#25c4b9' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={MaritalStatusdata}
                                        search
                                        maxHeight={400}
                                        labelField="MaritalStatuslabel"
                                        valueField="MaritalStatusvalue"
                                        placeholder={!MaritalStatusisFocus ? 'Select' : '...'}
                                        searchPlaceholder="Search..."
                                        value={MaritalStatusvalue}
                                        onFocus={() => setMaritalStatusIsFocus(true)}
                                        onBlur={() => setMaritalStatusIsFocus(false)}
                                        onChange={item => {
                                            setMaritalStatusValue(item.MaritalStatusvalue);
                                            console.log(item.MaritalStatusvalue)
                                            setMaritalStatusIsFocus(false);
                                        }}
                                    />
                                    <Entypo
                                        style={styles.icon}
                                        name="circle-with-cross" size={24} color="black"
                                        onPress={() => {
                                            setMaritalStatusValue(null);
                                            setMaritalStatusIsFocus(false);
                                        }}
                                    />
                                </View>

                            </Card>

                            <Card elevation={7} containerStyle={{ borderRadius: 10, }}>

                                <Text style={styles.textshown}>Select Primary Language</Text>
                                <View style={styles.icondropdown}>
                                    <Dropdown
                                        style={[styles.dropdown, primaryLanguageIsFocus && { borderColor: '#25c4b9' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        // data={PrimaryLanguagedata}
                                        search
                                        maxHeight={400}
                                        labelField="PrimaryLanguagelabel"
                                        valueField="PrimaryLanguagevalue"
                                        placeholder={!primaryLanguageIsFocus ? 'Select' : '...'}
                                        searchPlaceholder="Search..."
                                        // value={PrimaryLanguagevalue}
                                        onFocus={() => setPrimaryLanguageIsFocus(true)}
                                        onBlur={() => setPrimaryLanguageIsFocus(false)}
                                        // onChange={item => {
                                        //     setPrimaryLanguageValue(item.PrimaryLanguagevalue);
                                        //     console.log(item.PrimaryLanguagevalue)
                                        //     setPrimaryLanguageIsFocus(false);
                                        // }}
                                        data={primaryLanguageData}
                                        value={primaryLanguageValue}
                                        onChange={(item) => {
                                            setPrimaryLanguageValue(item);
                                            setPrimaryLanguageIsFocus(false);
                                        }}
                                    />
                                    <Entypo
                                        style={styles.icon}
                                        name="circle-with-cross" size={24} color="black"
                                        onPress={() => {
                                            setPrimaryLanguageValue(null);
                                            setPrimaryLanguageIsFocus(false);
                                        }}
                                    />
                                </View>

                                <Text style={styles.textshown}>Is other Language Know?</Text>
                                <RadioForm
                                    radio_props={isOtherLanguageData}
                                    initial={isOtherLanguagevalue}
                                    onPress={(isOtherLanguagevalue) => setIsOtherLanguagevalue(isOtherLanguagevalue)}
                                    buttonColor="#53C1BA"
                                    selectedButtonColor="#438dc6"
                                    selectedLabelColor="red"
                                    style={styles.radioformstyle}
                                    buttonSize={15}
                                    buttonOuterSize={25}
                                    labelColor="#53C1BA"
                                    labelHorizontal={true}
                                    formHorizontal={true}
                                    labelStyle={styles.radioLabelStyle}
                                />
                                {isOtherLanguagevalue ? <View>
                                    <Text style={styles.textshown}>Other Known Language</Text>
                                    <View style={[{ flex: 1 }, styles.input]}>
                                        <View>
                                            <FlatList
                                                scrollEnabled={false}
                                                data={otherKnownLangData}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <OtherKnownLanguageFields
                                                            index={index}
                                                            onChangeOtherKnownLangId={text => handleOtherKnownLangIdChange(index, text)}
                                                            onClickRemove={() => handleRemoveItem(index)}

                                                        />

                                                    );
                                                }}
                                            />

                                        </View>
                                        <TouchableOpacity
                                            style={styles.AddExperienceButton}
                                            onPress={handleAddItem}>
                                            <Text style={{ color: '#fff', paddingBottom: 10 }}>Add More Known Languages</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> : null
                                }

                                <Text style={styles.textshown}>Is Criminal record?</Text>

                                <RadioForm
                                    radio_props={criminalRecordData}
                                    initial={criminalRecordvalue || userdata.workforce.isCriminalRecord}
                                    onPress={(criminalRecordvalue) => setCriminalRecordValuecr(criminalRecordvalue)}
                                    buttonColor="#53C1BA"
                                    selectedButtonColor="#438dc6"
                                    selectedLabelColor="red"
                                    buttonSize={15}
                                    style={styles.radioformstyle}
                                    buttonOuterSize={25}
                                    labelColor="#53C1BA"
                                    labelHorizontal={true}
                                    formHorizontal={true}
                                    labelStyle={styles.radioLabelStyle}
                                />
                                {criminalRecordvalue ? <View>
                                    <Text style={styles.textshown}>If Yes, Description of Criminal Record</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={values.CriminalRecordDescription || userdata.workforceTranslations[0].criminalRecordDesc}
                                        placeholder="Enter Criminal Record Description"
                                        onChangeText={handleChange('CriminalRecordDescription')}
                                        onBlur={() => setFieldTouched('CriminalRecordDescription')}
                                        numberOfLines={3}
                                        multiline
                                    />
                                    {(errors.CriminalRecordDescription && touched.CriminalRecordDescription) &&
                                        <Text style={styles.errors}>{errors.CriminalRecordDescription}</Text>
                                    }
                                </View>
                                    : null
                                }

                            </Card>

                            <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                                <Text style={styles.textshown}>Location Preferences</Text>

                                <View style={[{ flex: 1 }, styles.input]}>
                                    <View>
                                        <FlatList
                                            scrollEnabled={false}
                                            data={data}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <LocationPreferencesFields
                                                        index={index}
                                                         //data = {Locationdata}
                                                        onChangeLocationPrefId={txt => {
                                                            changeLocationPrefID(index, txt);
                                                        }}
                                                        onChnageLocationPrefOrder={txt => {
                                                            changeLocationPrefOrder(index, txt);
                                                        }}
                                                        onClickRemove={() => {
                                                            if (data.length > 1) {
                                                                let temp = data;
                                                                temp.splice(index, 1);
                                                                let xyz = [];
                                                                temp.map(item => {
                                                                    xyz.push(item);
                                                                });
                                                                setData(xyz);
                                                            }
                                                        }}
                                                       // preferenceData={preferenceData}
                                                    />

                                                );
                                            }}
                                        />

                                    </View>
                                    <TouchableOpacity
                                        style={styles.AddExperienceButton}
                                        onPress={() => {
                                            let tempData = data;
                                            tempData.push({ LocationPreferenceID: '', LocationPreferenceOrder: '' });
                                            let temp = [];
                                            tempData.map(item => {
                                                temp.push(item);
                                            });
                                            setData(temp);
                                            console.log(temp)
                                        }}>
                                        <Text style={{ color: '#fff', paddingBottom: 10 }}>Add More Location Preferences</Text>
                                    </TouchableOpacity>
                                </View>
                            </Card>

                            <Card elevation={7} containerStyle={{ borderRadius: 10, }}>

                                <Text style={styles.textshown}>Profession Details</Text>

                                <ExperienceModal visible={visible} modalData={modalData} setVisible={setVisible} index={experience.length + 1} setExperience={setExperience} />

                                <View style={styles.input}>
                                    {experience.map((exe, ind) => {
                                        key = { ind }
                                        return (
                                            <View key={ind}>

                                                <TouchableWithoutFeedback
                                                    key={ind}
                                                    onPress={() => {
                                                        setModalData(experience[ind]);
                                                        console.log(experience[ind])
                                                        setVisible(true)
                                                    }}
                                                >
                                                    <View style={styles.input}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            marginTop: 10,
                                                        }}>
                                                            <Text style={{ marginLeft: 5, color: '#676A6C', fontFamily: 'zwodrei' }}> Experience {ind + 1}</Text>

                                                            <TouchableWithoutFeedback
                                                                key={ind}
                                                                onPress={() => {
                                                                    let temp = [...experience];
                                                                    temp.splice(ind, 1);
                                                                    setExperience([...temp]);


                                                                }}>
                                                                <Text style={{ color: '#676A6C', marginLeft: 90, marginRight: 15 }}>Remove</Text>
                                                            </TouchableWithoutFeedback>
                                                        </View>

                                                        <Text style={styles.customtextinput} key={ind}>{exe.professionType}</Text>

                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>


                                        )
                                    })}
                                    <TouchableOpacity
                                        style={[styles.AddExperienceButton]}
                                        onPress={() => {
                                            setVisible(true)
                                            console.log(experience)
                                        }}>
                                        <Text style={{ color: '#fff' }}>Add Experience Field</Text>
                                    </TouchableOpacity>
                                </View>





                                <Text style={styles.textshown}>Select Way to Commute</Text>
                                <View style={styles.icondropdown}>
                                    <Dropdown
                                        style={[styles.dropdown, WayToCommuteisFocus && { borderColor: '#25c4b9' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={WayToCommutedata}
                                        search
                                        maxHeight={400}
                                        labelField="WayToCommutelabel"
                                        valueField="WayToCommutevalue"
                                        placeholder={!WayToCommuteisFocus ? 'Select' : '...'}
                                        searchPlaceholder="Search..."
                                        value={WayToCommutevalue}
                                        onFocus={() => setWayToCommuteIsFocus(true)}
                                        onBlur={() => setWayToCommuteIsFocus(false)}
                                        onChange={item => {
                                            setWayToCommuteValue(item.WayToCommutevalue);
                                            console.log(item.WayToCommutevalue)
                                            setWayToCommuteIsFocus(false);
                                        }}
                                    />
                                    <Entypo
                                        style={styles.icon}
                                        name="circle-with-cross" size={24} color="black"
                                        onPress={() => {
                                            setWayToCommuteValue(null);
                                            setWayToCommuteIsFocus(false);
                                        }}
                                    />
                                </View>
                            </Card>

                            <Card elevation={7} containerStyle={{ borderRadius: 10, }}>
                                <Text style={styles.textshown}>Current Address</Text>

                                <View style={styles.input}>
                                    <TextInput
                                        style={styles.input}
                                        value={values.CurrentAddress || userdata.currentAddresses[0].address}
                                        placeholder="Enter Address"
                                        onChangeText={handleChange('CurrentAddress')}
                                        onBlur={() => setFieldTouched('CurrentAddress')}
                                        numberOfLines={3}
                                        multiline
                                    />
                                    {(errors.CurrentAddress && touched.CurrentAddress) &&
                                        <Text style={styles.errors}>{errors.CurrentAddress}</Text>
                                    }


                                    <TextInput
                                        style={styles.input}
                                        value={values.PostalCodeCurrentAddress || userdata.currentAddresses[0].postalCode}
                                        placeholder="Enter PinCode"
                                        onChangeText={handleChange('PostalCodeCurrentAddress')}
                                        onBlur={() => setFieldTouched('PostalCodeCurrentAddress')}
                                    />
                                    {(errors.PostalCodeCurrentAddress && touched.PostalCodeCurrentAddress) &&
                                        <Text style={styles.errors}>{errors.PostalCodeCurrentAddress}</Text>
                                    }
                                </View>
                            </Card>

                            <Card elevation={7} containerStyle={{ borderRadius: 10, marginBottom: 10 }}>


                                <View style={styles.checkboxsection}>
                                    <Text style={styles.textshown}>Is Permanent Address same as Current Address ?</Text>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? '#53C1BA' : undefined}
                                    />
                                </View>




                                <Text style={styles.textshown}>Permanent Address</Text>

                                <View style={styles.input}>
                                    <TextInput
                                        style={styles.input}
                                        value={userdata.permanentAddresses[0].address || values.PermanentAddress}
                                        placeholder="Enter Address"
                                        onChangeText={handleChange('PermanentAddress')}
                                        onBlur={() => setFieldTouched('PermanentAddress')}
                                        numberOfLines={3}
                                        multiline
                                    />
                                    {(errors.CurrentAddress && touched.PermanentAddress) &&
                                        <Text style={styles.errors}>{errors.PermanentAddress}</Text>
                                    }

                                    <TextInput
                                        style={styles.input}
                                        value={userdata.permanentAddresses[0].postalCode || values.PostalCodePermanentAddress}
                                        placeholder="Enter PinCode"
                                        onChangeText={handleChange('PostalCodePermanentAddress')}
                                        onBlur={() => setFieldTouched('PostalCodePermanentAddress')}
                                    />
                                    {(errors.PostalCodePermanentAddress && touched.PostalCodePermanentAddress) &&
                                        <Text style={styles.errors}>{errors.PostalCodePermanentAddress}</Text>
                                    }
                                </View>




                                {workforceIDStored == null ?
                                    <View>
                                        <TouchableOpacity
                                            style={styles.AddExperienceButton}
                                            onPress={handleSubmit}>
                                            <Text style={{ color: '#fff', paddingBottom: 10 }}>Next</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View>
                                        <TouchableOpacity
                                            style={styles.AddExperienceButton}
                                            onPress={updateSubmitHandler}>
                                            <Text style={{ color: '#fff', paddingBottom: 10 }}>Update</Text>
                                        </TouchableOpacity>
                                    </View>

                                }
                            </Card>




                        </View>
                    </View>
                </ScrollView>
            )
            }
        </Formik >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '100%',
    },
    text: {
        fontSize: 12,
        fontFamily: 'zwodrei'
    },
    input: {
        color: '#676A6C',
        marginBottom: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#53C1BA',
        borderRadius: 8,
        paddingHorizontal: 14,
        fontFamily: 'zwodrei',
        padding: 8
    },
    errors: {
        color: '#ED7D31',
        fontSize: 12,
        fontFamily: 'zwodrei',
        marginBottom: 10,
    },
    imageavatar: {
        backgroundColor: '#53C1BA',
        borderColor: '#53C1BA',
        borderWidth: 5,
        borderRadius: 100,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    textshown: {
        color: '#676A6C',
        fontSize: 14,
        fontFamily: 'zwodrei',
        marginTop: 10,

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
    logo: {
        marginTop: 10,
        width: 80,

    },
    touchtextbutton: {
        height: 40,
        width: 350,
        paddingTop: 10,
        marginVertical: 5,
        fontFamily: 'zwodrei',
        fontSize: 14,
        fontWeight: 'bold',
    },
    containercheckbox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    checkbox: {
        alignSelf: 'center',
        marginTop: 10,
        marginLeft: 10,
    },
    label: {
        fontFamily: 'zwodrei',
        margin: 4,
    },
    upperconatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    icon: {
        marginTop: 5,
        marginRight: 10,
        marginLeft: 17,
        alignContent: 'center'
    },
    customdropdownstyle: {
        width: 350,
        height: 40,
        borderWidth: 2,
        borderColor: '#53C1BA',
        borderRadius: 8,
        paddingHorizontal: 14,
        fontFamily: 'zwodrei',
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
    customtextinput: {
        color: '#676A6C',
        marginBottom: 12,
        marginTop: 12,
        borderWidth: 2,
        borderColor: '#53C1BA',
        borderRadius: 8,
        paddingHorizontal: 14,
        fontFamily: 'zwodrei',
        paddingBottom: 15,
        paddingTop: 15,

    },
    DOBPicker: {
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#53C1BA',
        borderRadius: 8,
        paddingHorizontal: 14,
        fontFamily: 'zwodrei',
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    dropdown: {
        width: '90%',
        height: 53,
        marginBottom: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#25c4b9',
        borderRadius: 8,
        paddingHorizontal: 14,
        fontFamily: 'zwodrei'
    },
    placeholderStyle: {
        color: '#676A6C',
        fontSize: 14,
        fontFamily: 'zwodrei',
        borderRadius: 8,
    },
    selectedTextStyle: {
        color: '#676A6C',
        fontSize: 16,
        fontFamily: 'zwodrei',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        color: '#676A6C',
        height: 40,
        fontSize: 16,
        fontFamily: 'zwodrei',
        borderRadius: 8,
    },
    radioformstyle: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 70,
        marginRight: 70,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    radioLabelStyle: {
        fontSize: 14,
        color: '#676A6C',
        fontFamily: 'zwodrei',
    },
    checkboxsection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    icondropdown: {
        alignItems: 'center',
        flexDirection: 'row',


    }






});
export default ViewWorkforceScreen;
