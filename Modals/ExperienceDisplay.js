import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfessionalDetails = ({ profession }) => {
    const { professionName, experienceInMonths, selfRating, actualWage, expectedWage } = profession;

    // Helper function to format experience duration
    const formatExperience = (months) => {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return `${years} Years ${remainingMonths} Months`;
    };

    // Helper function to format wage amount
    const formatWage = (wage) => `Rs ${wage} per day`;

    return (
        <View>
            <Text style={styles.normalline}>Profession: {professionName}</Text>
            <Text style={styles.normalline}>Experience: {formatExperience(experienceInMonths)}</Text>
            <Text style={styles.normalline}>Self Rating: {selfRating} out of 10</Text>
            <Text style={styles.normalline}>Actual Wage: {formatWage(actualWage)}</Text>
            {expectedWage && <Text style={styles.normalline}>Expected Wage: {formatWage(expectedWage)}</Text>}
        </View>
    );
};

export default ProfessionalDetails;

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