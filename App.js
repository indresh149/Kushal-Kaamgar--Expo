import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
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
import CustomDrawer from './/components//CustomDrawer';
import Iconnew from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const authCtx = useContext(AuthContext);
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#68a5d3',
        },
        headerTintColor: 'white',
        sceneContainerStyle: { backgroundColor: '#d5e4ef' },
        drawerContentStyle: { backgroundColor: '#53C1BA' },
        drawerInactiveTintColor: '#1B75BB',
        drawerActiveTintColor: '#1B75BB',
        drawerActiveBackgroundColor: '#8eccc8',
        
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
                color={tintColor}
                size={40}
               onPress={authCtx.logout}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require('.//assets//images//homeIcon.png')}
                resizeMode='contain'
              />
              <Text style={styles.headertext}>Add Workforce</Text>
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

  if (isTryingLogin) {
    //return <AppLoading />;
    return <LoadingOverlay message="Loading..."/>;
  }

  return <Navigation />;
}

export default function App() {
  const [loaded] = useFonts({
    zwodrei: require('./assets/fonts/zwodrei-Bold.ttf')
  });
  if (!loaded) {
    return <LoadingOverlay message="Loading..."/>;
  }
  return (
    <>
      <StatusBar style="light" />
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
    fontSize: 30,
    fontFamily: 'zwodrei',
    marginLeft: 10,
    marginRight:10,
  },
})