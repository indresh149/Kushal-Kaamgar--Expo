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
    getEmail: () => { },
    firstName: '',
    addfirstName: () => { },
    lastName: '',
    addlastName: () => { },
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [workforceid, setWorkforceid] = useState();
    const [emailID, setEmailID] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    function getEmail(email) {
        setEmailID(email);
        AsyncStorage.setItem('email', email);
    }

    function addfirstName(first) {
        setFirstName(first);
        AsyncStorage.setItem('firstName', first);
    }

    function addlastName(last) {
        setLastName(last);
        AsyncStorage.setItem('lastName', last);
    }



    function logout() {
        setAuthToken(null);
        setEmailID(null);
        setFirstName(null);
        setWorkforceid(null);
        setLastName(null);
        AsyncStorage.removeItem('wid')
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('email');
        AsyncStorage.removeItem('firstName');
        AsyncStorage.removeItem('lastName');
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
        getEmail: getEmail,
        addfirstName: addfirstName,
        firstName: firstName,
        addlastName: addlastName,
        lastName: lastName,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;