import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity ,TextInput, } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { AuthContext } from '../store/auth-context';
import axios from 'axios';
import LoadingOverlay from '../components/ui/LoadingOverlay';


const ProfileScreen = () => {
    const authCtx = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(null);


    const handleForgotPassword = () => {
        axios.post('https:/26d5-160-202-36-62.ngrok-free.app/account/forgot-password',
            { email: userDetails.email })
            .then(response => {

                console.log(response.data);
                
            })
            .catch(error => {
                console.error(error);
                
            });
    };

    const jwtToken = authCtx.token;
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://382d-103-191-235-186.ngrok-free.app/account/user', {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            setUserDetails(response.data);
            console.log(response.data)
        };

        fetchData();
    }, []);

    if (!userDetails) {
        return (
            <LoadingOverlay message="Loading..." />
        );
    }

    return (
        <View style={styles.container}>
            <EvilIcons name="user" size={150} color="#53C1BA" />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Profile</Text>
            <View style={styles.fieldcontainer}> 
            <Text style={styles.label}>Name: </Text>
                <Text style={styles.value}>{userDetails.firstName} {userDetails.lastName}</Text>
            </View>
            <View style={styles.fieldcontainer}> 
            <Text style={styles.label}>Username: </Text>
                <Text style={styles.value}>{userDetails.userName}</Text>
            </View>
            <View style={styles.fieldcontainer}> 
            <Text style={styles.label}>Email: </Text>
                <Text style={styles.value}>{userDetails.email}</Text>
            </View>
            <View style={styles.fieldcontainer}> 
            <Text style={styles.label}>Phone Number: </Text>
                <Text style={styles.value}>{userDetails.phoneNumber}</Text>
            </View>
            <View>
                <Text style={styles.editLink}>Edit Profile</Text>
            </View>
            <View>
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.label}>Send reset password email</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    fieldcontainer: {
        flexDirection:'row',
        //alignItems: 'center',
       // justifyContent: 'center',   
        marginBottom:20
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    value: {
        fontSize: 16,
        marginBottom: 5,
    },
    editLink: {
        marginBottom:10,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default ProfileScreen;
