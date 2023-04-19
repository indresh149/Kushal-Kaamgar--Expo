import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';


const OtherKnowLangdata = [
    { OtherKnowLanglabel: 'Hindi', OtherKnowLangvalue: '1' },
    { OtherKnowLanglabel: 'English', OtherKnowLangvalue: '2' },
    { OtherKnowLanglabel: 'Urdu', OtherKnowLangvalue: '3' },
    { OtherKnowLanglabel: 'Bengali', OtherKnowLangvalue: '4' },

];

const OtherKnownLanguageFields = ({
    index,
    onChangeOtherKnownLangId,
    onClickRemove,
}) => {
    const [OtherKnowLangvalue, OtherKnowLangsetValue] = useState(null);
    const [OtherKnowLangisFocus, OtherKnowLangsetIsFocus] = useState(false);

    return (
        <View style={{ width: '100%' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                }}>
                <Text style={{ marginLeft: 20, color: '#1B75BB', fontFamily: 'zwodrei' }}>Other Known Language {index + 1} </Text>
                <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onPress={() => {
                        onClickRemove();
                    }}>
                    <Text style={{ color: '#53C1BA', fontFamily: 'zwodrei' }}>Remove</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Dropdown
                    style={[styles.dropdown, OtherKnowLangisFocus && { borderColor: '#25c4b9' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={OtherKnowLangdata}
                    search
                    maxHeight={400}
                    labelField="OtherKnowLanglabel"
                    valueField="OtherKnowLangvalue"
                    placeholder={!OtherKnowLangisFocus ? 'Click to choose' : '...'}
                    searchPlaceholder="Search..."
                    value={OtherKnowLangvalue}
                    onFocus={() => OtherKnowLangsetIsFocus(true)}
                    onBlur={() => OtherKnowLangsetIsFocus(false)}
                    onChange={item => {
                        OtherKnowLangsetValue(item.OtherKnowLangvalue);
                        onChangeOtherKnownLangId(item.OtherKnowLangvalue);
                        console.log(item.OtherKnowLangvalue)
                        OtherKnowLangsetIsFocus(false);
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
});

export default OtherKnownLanguageFields;