import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, TouchableNativeFeedback } from 'react-native';
import React, { useState } from 'react';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/Entypo';
import { Dropdown } from 'react-native-element-dropdown';
import { Formik } from 'formik';
import * as yup from 'yup';


const registerValidationSchema = yup.object().shape({
    ExperienceInMonths: yup.string()
        .required('ExperienceInMonths is required')
        .min(1, 'Must be between one or two digits')
        .max(2, 'Must be between one or two digits'),
    SelfRating: yup.string()
        .min(1,'Must be between one or two digits')
        .max(2,'Must be between one or two digits'),
    ActualWage: yup.string()
        .min(1, 'Must be a valid decimal value')
        .max(8, 'Must be a valid decimal value'),
    ExpectedWage: yup.string()
        .min(1, 'Must be a valid decimal value')
        .max(8, 'Must be a valid decimal value'),      
});

const ExperienceModal = (props) => {
    const [professionType, setProfessionType] = useState(props.modalData.professionType || "");
    const [valueeqipment, setValueeqipment] = useState(null);
    const itemseqipment = [
        { label: "Yes", value: 0 },
        { label: "No", value: 1 },
    ];
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'Carpenter', value: "1" },
        { label: 'Plumber', value: "2" },
        { label: 'Raj Mistri', value: "3" },
        { label: 'Labourer Normal', value: "4" },
        { label: 'Labourer Construction', value: "5" },

    ];

    const experienceSubmitHandler = (ExperienceInMonths, SelfRating, ActualWage, ExpectedWage) => {
        props.setExperience(prev => [...prev, {
            professionType: professionType,
            ProfessionId: value,
            ExperienceInMonths: ExperienceInMonths,
            SelfRating: SelfRating,
            ActualWage: ActualWage,
            ExpectedWage: ExpectedWage,
            isWorkEquipmentAvailable: valueeqipment
        }])
       // resetForm();
        props.setVisible(false)
    }

    return (
        <Formik
            initialValues={{
                ExperienceInMonths: '',
                SelfRating: '',
                ActualWage: '',
                ExpectedWage: '',
            }}
            validationSchema={registerValidationSchema}
            onSubmit={values => experienceSubmitHandler(values.ExperienceInMonths,values.SelfRating,values.ActualWage,values.ExpectedWage)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldTouched, touched, isValid }) => (

                <View style={{ width: '100%' }}>
                    <Modal
                        transparent={true}
                        visible={props.visible}
                        animationType="slide"
                    >
                        <View style={{ backgroundColor: '#06050eaa', flex: 1 }}>
                            <View style={styles.modalView}>
                                <View style={styles.upperconatiner}>
                                    <Text style={{ color: '#1B75BB', fontFamily: 'zwodrei' }}>Experience {props.index} </Text>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => { props.setVisible(false) }}>
                                        <Icon
                                            style={styles.icon}
                                            size={25}
                                            name="cross"

                                        >
                                        </Icon>
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: '#25c4b9' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={data}
                                        search
                                        maxHeight={400}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Profession Type' : '...'}
                                        searchPlaceholder="Search..."
                                        value={value}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setValue(item.value);
                                            setProfessionType(item.label);
                                            setIsFocus(false);
                                        }}
                                    />
                                </View>
                                <TextInput
                                    style={styles.inputtextstyle}
                                    placeholder="Experience In Months"
                                    value={values.ExperienceInMonths}
                                    onChangeText={handleChange('ExperienceInMonths')}
                                    onBlur={() => setFieldTouched('ExperienceInMonths')}
                                />
                                {(errors.ExperienceInMonths && touched.ExperienceInMonths) &&
                                    <Text style={styles.errors}>{errors.ExperienceInMonths}</Text>
                                }

                                <TextInput
                                    style={styles.inputtextstyle}
                                    placeholder="Self Rating (1-10)"
                                    value={values.SelfRating}
                                    onChangeText={handleChange('SelfRating')}
                                    onBlur={() => setFieldTouched('SelfRating')}
                                />
                                {(errors.SelfRating && touched.SelfRating) &&
                                    <Text style={styles.errors}>{errors.SelfRating}</Text>
                                }

                                <TextInput
                                    style={styles.inputtextstyle}
                                    placeholder="Actual Wage"
                                    value={values.ActualWage}
                                    onChangeText={handleChange('ActualWage')}
                                    onBlur={() => setFieldTouched('ActualWage')}
                                />
                                {(errors.ActualWage && touched.ActualWage) &&
                                    <Text style={styles.errors}>{errors.ActualWage}</Text>
                                }

                                <TextInput
                                    style={styles.inputtextstyle}
                                    placeholder="Expected Wage"
                                    value={values.ExpectedWage}
                                    onChangeText={handleChange('ExpectedWage')}
                                    onBlur={() => setFieldTouched('ExpectedWage')}
                                />
                                {(errors.ExpectedWage && touched.ExpectedWage) &&
                                    <Text style={styles.errors}>{errors.ExpectedWage}</Text>
                                }

                                <Text style={styles.textshown}>Is WorkEquipment Available ?</Text>

                                <RadioForm
                                    radio_props={itemseqipment}
                                    initial={valueeqipment}
                                    onPress={(valueeqipment) => setValueeqipment(valueeqipment)}
                                    buttonColor="#53C1BA"
                                    selectedButtonColor="#1B75BB"
                                    selectedLabelColor="red"
                                    justifyContent="space-between"
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    labelColor="#53C1BA"
                                    style={styles.radioformstyle}
                                    formHorizontal={true}
                                    labelStyle={{ fontSize: 14, paddingLeft: 10, color: '#53C1BA', fontFamily: 'zwodrei', }}

                                />
                                <View style={styles.submitbuttonstyle}>
                                    <TouchableOpacity
                                        style={styles.nativefeedback}
                                        onPress={handleSubmit}
                                        >
                                        <Text style={styles.buttontext}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </Modal>
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    inputtextstyle: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: '#53C1BA',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 10,
        paddingLeft: 15,
        marginBottom: 8,
        fontFamily: 'zwodrei',
    },
    modalView: {
        margin: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 40,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
    },
    textshown: {
        fontSize: 12,
        fontFamily: 'zwodrei',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
    },
    upperconatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    nativefeedback: {
        backgroundColor: '#1B75BB',
        color: 'white',
        fontFamily: 'zwodrei',
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    submitbuttonstyle: {
        marginTop: 20,
        width: '100%',

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
    radioformstyle: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between',
    },
    dropdown: {
        height: 53,
        marginBottom: 12,
        marginTop: 12,
        borderWidth: 2,
        borderColor: '#25c4b9',
        borderRadius: 8,
        paddingHorizontal: 14,
        fontFamily: 'zwodrei'
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        fontFamily: 'zwodrei',
        borderRadius: 8,
    },
    placeholderStyle: {
        fontSize: 14,
        fontFamily: 'zwodrei',
        borderRadius: 8,
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'zwodrei',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: 'zwodrei',
        borderRadius: 8,
    },
    errors: {
        color: 'red',
    },
});

export default ExperienceModal;