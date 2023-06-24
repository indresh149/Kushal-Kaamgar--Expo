import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import AppLoading from 'expo-app-loading';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';
import LoadingOverlay from './components/ui/LoadingOverlay';
import { useFonts } from 'expo-font'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DocsUploadScreen from './screens/DocsUploadScreen';
import Incomplete_workforceScreen from './screens/Incomplete_workforceScreen';
import CustomDrawer from './/components//CustomDrawer';
import Iconnew from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import ProfileScreen from './screens/ProfileScreen';
import Complete_workforceScreen from './screens/Complete_workforceScreen';
import Verified_workforceScreen from './screens/Verified_workforceScreen';
import Approved_workforceScreen from './screens/Approved_workforceScreen';
import axios from 'axios';
import ViewWorkforceScreen from './screens/ViewWorkforceScreen';
import ViewCompleteWorkforceScreenDetails from './screens/ViewCompleteWorkforceScreenDetails'
import ViewApprovedWorkforceScreenDetails from './screens/ViewApprovedWorkforceScreenDetails'
import ViewVerifiedWorkforceScreenDetails from './screens/ViewVerifiedWorkforceScreenDetails'


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const authCtx = useContext(AuthContext);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        contentStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: '#53C1BA',
        //sceneContainerStyle: { backgroundColor: '#d5e4ef' },
        // drawerContentStyle: { backgroundColor: '#53C1BA' },
        // drawerInactiveTintColor: '#1B75BB',
        //drawerActiveTintColor: '#bdc6cd',
        //drawerActiveBackgroundColor: '#8eccc8',

      }}
    >
      <Drawer.Screen
        name="Add Workforce"
        component={WelcomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="adduser" size={24} color="black" />
          ),

          headerRight: ({ tintColor }) => (
            <View style={styles.upperconatiner}>
              <IconButton
                icon="exit"
                color='#53C1BA'
                size={40}
                onPress={authCtx.logout}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Image
                style={{ width: 35, height: 50, marginRight: 15 }}
                source={require('.//assets//images//homeIcon.png')}
                resizeMode='contain'
              />
              <Text style={styles.headertext}>Add Workforce</Text>
            </View>
          ),
          headerTitleStyle: { flex: 1, textAlign: 'center' },
        }}
      />

      <Drawer.Screen
        name="Incomplete Workforce List"
        component={Incomplete_workforceScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="user" size={24} color="black" />
          ),
          headerRight: ({ tintColor }) => (
            <View style={styles.upperconatiner}>
              <IconButton
                icon="exit"
                color='#53C1BA'
                size={40}
                onPress={authCtx.logout}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Image
                style={{ width: 35, height: 50, marginRight: 15 }}
                source={require('.//assets//images//homeIcon.png')}
                resizeMode='contain'
              />
              <Text style={styles.headertext}>Incomplete List</Text>
            </View>
          ),
          headerTitleStyle: { flex: 1, textAlign: 'center' },
        }}
      />
      <Drawer.Screen
        name="Complete Workforce List"
        component={Complete_workforceScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="user" size={24} color="black" />
          ),
          headerRight: ({ tintColor }) => (
            <View style={styles.upperconatiner}>
              <IconButton
                icon="exit"
                color='#53C1BA'
                size={40}
                onPress={authCtx.logout}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Image
                style={{ width: 35, height: 50, marginRight: 15 }}
                source={require('.//assets//images//homeIcon.png')}
                resizeMode='contain'
              />
              <Text style={styles.headertext}>Complete List</Text>
            </View>
          ),
          headerTitleStyle: { flex: 1, textAlign: 'center' },
        }}
      />
      <Drawer.Screen
        name="Verified Workforce List"
        component={Verified_workforceScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="user" size={24} color="black" />
          ),
          headerRight: ({ tintColor }) => (
            <View style={styles.upperconatiner}>
              <IconButton
                icon="exit"
                color='#53C1BA'
                size={40}
                onPress={authCtx.logout}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Image
                style={{ width: 35, height: 50, marginRight: 15 }}
                source={require('.//assets//images//homeIcon.png')}
                resizeMode='contain'
              />
              <Text style={styles.headertext}>Verified List</Text>
            </View>
          ),
          headerTitleStyle: { flex: 1, textAlign: 'center' },
        }}
      />
      <Drawer.Screen
        name="Approved Workforce List"
        component={Approved_workforceScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="user" size={24} color="black" />
          ),
          headerRight: ({ tintColor }) => (
            <View style={styles.upperconatiner}>
              <IconButton
                icon="exit"
                color='#53C1BA'
                size={40}
                onPress={authCtx.logout}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Image
                style={{ width: 35, height: 50, marginRight: 15 }}
                source={require('.//assets//images//homeIcon.png')}
                resizeMode='contain'
              />
              <Text style={styles.headertext}>Approved List</Text>
            </View>
          ),
          headerTitleStyle: { flex: 1, textAlign: 'center' },
        }}
      />
      
      


    </Drawer.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: '#d5e4ef' },
        sceneContainerStyle: { backgroundColor: '#18c94d' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Signup" component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  //const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#53C1BA',
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >

      <Stack.Screen
        name="DrawerScreen"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DocsUploadScreen"
        component={DocsUploadScreen}
        options={{
          headerShown: true,
          headerTintColor: '#53C1BA',
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Image
                style={{ width: 30, height: 50 }}
                source={require('.//assets//images//homeIcon.png')}
                resizeMode='contain'
              />
              <Text style={styles.headertext}>Documents Upload</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTintColor: '#53C1BA',
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Image
                style={{ width: 30, height: 50 }}
                source={require('.//assets//images//homeIcon.png')}
                resizeMode='contain'
              />
              <Text style={styles.headertext}>User Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ViewWorkforceDetails"
        component={ViewWorkforceScreen}
        options={{
          headerShown: true,
          headerTintColor: '#53C1BA',
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Image
                style={{ width: 30, height: 50 }}
                source={require('.//assets//images//homeIcon.png')}
                resizeMode='contain'
              />
              <Text style={styles.headertext}>User Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ViewCompleteWorkforceDetails"
        component={ViewCompleteWorkforceScreenDetails}
        options={{
          headerShown: true,
          headerTintColor: '#53C1BA',
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Image
                style={{ width: 30, height: 50 }}
                source={require('.//assets//images//homeIcon.png')}
                resizeMode='contain'
              />
              <Text style={styles.headertext}>User Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ViewApprovedWorkforceDetails"
        component={ViewApprovedWorkforceScreenDetails}
        options={{
          headerShown: true,
          headerTintColor: '#53C1BA',
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Image
                style={{ width: 30, height: 50 }}
                source={require('.//assets//images//homeIcon.png')}
                resizeMode='contain'
              />
              <Text style={styles.headertext}>User Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ViewVerifiedWorkforceDetails"
        component={ViewVerifiedWorkforceScreenDetails}
        options={{
          headerShown: true,
          headerTintColor: '#53C1BA',
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Image
                style={{ width: 30, height: 50 }}
                source={require('.//assets//images//homeIcon.png')}
                resizeMode='contain'
              />
              <Text style={styles.headertext}>User Profile</Text>
            </View>
          ),
        }}
      />


    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);


  // useEffect(() => {

  //   const fetchData = async () => {
  //     const jwtToken = await AsyncStorage.getItem('token');
  //     const response = await axios.get('http://www.kushalkaamgar.com/kk.api/account/user', {
  //       headers: {
  //         'Authorization': `Bearer ${jwtToken}`
  //       }
  //     });
  //     setUserDetails(response.data);
  //     console.log(response.data.firstName)
  //     console.log(response.data.lastName)
  //     authCtx.addfirstName(response.data.firstName);
  //     authCtx.addlastName(response.data.lastName);
  //     console.log(response.data)
  //   };

  //   fetchData();
  // }, []);


  if (isTryingLogin) {
    //return <AppLoading />;
    return <LoadingOverlay message="Loading..." />;
  }

  return <Navigation />;
}

export default function App() {
  const [loaded] = useFonts({
    zwodrei: require('./assets/fonts/zwodrei-Bold.ttf')
  });
  if (!loaded) {
    return <LoadingOverlay message="Loading..." />;
  }




  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  upperconatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titlecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headertext: {
    color: '#1B75BB',
    fontSize: 30,
    fontFamily: 'zwodrei',
    marginLeft: 10,
    marginRight: 10,
  },
})