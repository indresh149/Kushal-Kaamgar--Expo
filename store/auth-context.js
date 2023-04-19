import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
    token: '',
    wid: '',
    isAuthenticated: false,
    authenticate: (token) => { },
    logout: () => { },
    addworkforceID: () => { },
    completesubmitwidRemove: () => { },
    email: '',
    getEmail:()=>{}
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [workforceid, setWorkforceid] = useState();
    const [emailID, setEmailID] = useState();

    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    function getEmail(email) {
        setEmailID(email);
        AsyncStorage.setItem('email', email);
    }



    function logout() {
        setAuthToken(null);
        setEmailID(null);
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('email');
    }

    function addworkforceID(wid) {
        setWorkforceid(wid);
        AsyncStorage.setItem('workforceid', wid); 
    }

    function completesubmitwidRemove() {
        AsyncStorage.removeItem('workforceid');
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
        wid: workforceid,
        addworkforceID: addworkforceID,
        completesubmitwidRemove: completesubmitwidRemove,
        email: emailID,
        getEmail: getEmail
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;