import React, { useContext, useState ,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { AuthContext } from '../store/auth-context';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const CustomDrawer = props => {
    const [storedEmail, setStoredEmail] = useState(null);

    useEffect(() => {
        async function fetchEmail() {
            const storedEmail = await AsyncStorage.getItem('email');
            setStoredEmail(storedEmail);
        }
        fetchEmail();
    }, []);

    const authCtx = useContext(AuthContext);
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#68a5d3' }}>
                <ImageBackground
            
                    style={{ padding: 20,margin:5 }}>
                    <Image
                        source={require('..//assets//images//homeIcon.png')}
                        style={{ height: 70, width: 70, marginBottom: 10 }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 14,
                            fontFamily: 'zwodrei',
                            
                            marginTop:10
                        }}>
                        {storedEmail}
    
                    </Text>
                    
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 5, borderTopWidth: 1, borderTopColor: '#1B75BB' }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#1B75BB' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'zwodrei',
                                marginLeft: 5,
                            }}>
                            About us
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={authCtx.logout} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'zwodrei',
                                marginLeft: 5,
                            }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;