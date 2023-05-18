import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CurrentAddress = ({ addressdata }) => {
    const { address, postalCode } = addressdata;

    return (
        <View style={[{ marginRight: 15 }]}>
            <View style={[styles.otherLangContainer, { marginRight: 40 }]}>
                <Text style={styles.normalline}>Address:  </Text>
                <Text style={styles.normalline}>{address}</Text>
            </View>
            <Text style={styles.normalline}>Postal Code: {postalCode}</Text>

        </View>
    );
};

export default CurrentAddress;

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
        marginBottom: 10,
    },
    normalline: {
        fontSize: 16,
        marginBottom: 10,
    },
    otherLangContainer: {
        flexDirection: 'row'
    },



});

