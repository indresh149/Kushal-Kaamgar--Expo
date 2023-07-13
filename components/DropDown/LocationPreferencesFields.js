import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const data = [
    { label: 'Locally', value: '1' },
    { label: 'Within Block', value: '2' },
    { label: 'Within District', value: '3' },
    { label: 'Nearby Districts', value: '4' },
    { label: 'Within State', value: '5' },
    { label: 'Nearby States', value: '6' },
    { label: 'Anywhere Within Country', value: '7' },
    { label: 'Outside Country', value: '8' },

]

const LocationPreferencesFields = ({
    index,
    //data,
    onChangeLocationPrefId,
    onChnageLocationPrefOrder,
    onClickRemove,
}) => {

   const [value, setValue] = useState(null);
    console.log(data)
    //const [value, setValue] = useState(data[0].locationPreferenceId);
    const [isFocus, setIsFocus] = useState(false);
    //const [valuee, setValuee] = useState(data[0]);

    // const handleDroppdownOptionSelect = (item) => {
    //     setValue(item.value);
    //     const newData = data.filter((d) =>  d.value !== item.value)
    //     setData(newData);
    //     onChangeLocationPrefId(item.value);
    //     onChnageLocationPrefOrder(index + 1);
    //     setIsFocus(false);
    // }


    return (
        <View style={{ width: '100%' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                }}>
                <Text style={{ marginLeft: 20, color: '#676A6C', fontFamily: 'zwodrei' }}>Location Preference {index + 1} </Text>
                <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onPress={() => {
                        onClickRemove();
                    }}>
                    <Text style={{ color: '#676A6C', fontFamily: 'zwodrei' }}>Remove</Text>
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
                    placeholder={!isFocus ? 'Click to choose' : '...'}
                    searchPlaceholder="Search..."
                    value={value}

                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        onChangeLocationPrefId(item.value);
                        onChnageLocationPrefOrder(index + 1);
                        setIsFocus(false);
                    }}
                />
            </View>



        </View>
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
    textshown: {
        fontSize: 12,
        fontFamily: 'zwodrei',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
    },
    dropdown: {
        height: 53,
        marginBottom: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#25c4b9',
        borderRadius: 8,
        paddingHorizontal: 14,
        fontFamily: 'zwodrei'
    },
    icon: {
        marginRight: 5,
    },
    label: {
        color: '#676A6C',
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
        height: 40,
        fontSize: 16,
        fontFamily: 'zwodrei',
        borderRadius: 8,
    },
});

export default LocationPreferencesFields;