import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../store/auth-context';
import axios from 'axios';
import LoadingOverlay from '../components/ui/LoadingOverlay';

const Incomplete_workforceScreen = ({ navigation }) => {
    const authCtx = useContext(AuthContext);
    const [data, setData] = useState(null);

    const jwtToken = authCtx.token;
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https:/5bdd-160-202-36-170.ngrok-free.app/workforce/getsavedlist/en', {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            setData(response.data);

            console.log(response.data)
        };

        fetchData();
    }, []);


    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.firstName} {item.middleName} {item.lastName}</Text>
            <Text style={styles.subtitle}>Cellphone: {item.cellphone}</Text>
            <Text style={styles.subtitle}>Alt Cellphone: {item.cellphone_Alt}</Text>
            <Text style={styles.subtitle}>Aadhaar ID: {item.aadhaarId}</Text>
            <Text style={styles.subtitle}>Other ID: {item.otherIdNumber}</Text>
            <Text style={styles.subtitle}>Status: {item.id}</Text>
            <View style={styles.buttoncontainer}>
                <TouchableOpacity style={styles.buttonstyle}
                    onPress={() => navigation.navigate('ViewWorkforceDetails', {
                        param1: item.id,
                    })}
                >
                    <Text>View</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (!data) {
        return (
            <LoadingOverlay message="Loading..." />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#444',
    },
    buttonstyle: {
        padding: 5,
        width: 200,
        height: 35,
        backgroundColor: '#1B75BB',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        bottom: 10,
        borderRadius: 8,
        marginTop: 17,

    },
    buttoncontainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
    },
});

export default Incomplete_workforceScreen;
