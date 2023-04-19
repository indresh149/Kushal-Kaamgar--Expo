import React, { useContext, useState } from 'react';
import {Button,Text,TextInput,TouchableOpacity,View,StyleSheet,useWindowDimensions,Image,Alert,} from 'react-native';
import Logo from '../assets/images/logo-vector.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';

const registerValidationSchema = yup.object().shape({
  firstname: yup.string()
    .required('First Name is required'),
  lastname: yup.string()
    .required('Last Name is required'),
  email: yup.string()
    .email('Please enter valid email')
    .required('Email Address is required'),
  phonenumber: yup.string()
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactlt 10 digits')
    .required('Phone Number is required')
    .matches(/^[0-9]+$/, "Must be only digits"),
  password: yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmpassword: yup.string()
    .required('Confirm Password is required')
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});


const RegisterScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler(firstname, lastname, email, phonenumber, password, confirmpassword) {

    console.log(firstname, lastname, email, phonenumber, password, confirmpassword)
    setIsAuthenticating(true);
    try {
      const token = await createUser(firstname, lastname, email, phonenumber, password, confirmpassword);
      const newtoken = token.toString();
      authCtx.authenticate(newtoken);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmpassword: ''
      }}
      validationSchema={registerValidationSchema}
      onSubmit={values => signupHandler(values.firstname, values.lastname, values.email, values.phonenumber, values.password, values.confirmpassword)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldTouched, touched, isValid }) => (


        <View style={styles.container}>


          <Image source={Logo} style={[styles.logo, { height: height * 0.18 }, { marginBottom: 30 }]}
            resizeMode="contain"
          />

          <View style={styles.wrapper}>
            <TextInput
              style={styles.input}
              value={values.firstname}
              placeholder="Enter firstname"
              onChangeText={handleChange('firstname')}
              onBlur={() => setFieldTouched('firstname')}
            />
            {(errors.firstname && touched.firstname) && (
              <Text style={styles.errors}>{errors.firstname}</Text>
            )}

            <TextInput
              style={styles.input}
              value={values.lastname}
              placeholder="Enter lastname"
              onChangeText={handleChange('lastname')}
              onBlur={() => setFieldTouched('lastname')}
            />
            {(errors.lastname && touched.lastname) &&
              <Text style={styles.errors}>{errors.lastname}</Text>
            }

            <TextInput
              style={styles.input}
              value={values.email}
              placeholder="Enter email"
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            {(errors.email && touched.email) &&
              <Text style={styles.errors}>{errors.email}</Text>
            }

            <TextInput
              style={styles.input}
              value={values.phonenumber}
              placeholder="Enter Phonenumber"
              onChangeText={handleChange('phonenumber')}
              onBlur={() => setFieldTouched('phonenumber')}
              keyboardType="numeric"
            />
            {(errors.phonenumber && touched.phonenumber) &&
              <Text style={styles.errors}>{errors.phonenumber}</Text>
            }


            <TextInput
              style={styles.input}
              value={values.password}
              placeholder="Enter password"
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              secureTextEntry
            />
            {(errors.password && touched.password) &&
              <Text style={styles.errors}>{errors.password}</Text>
            }

            <TextInput
              style={styles.input}
              value={values.confirmpassword}
              placeholder="Confirm password"
              onChangeText={handleChange('confirmpassword')}
              onBlur={() => setFieldTouched('confirmpassword')}
              secureTextEntry
            />
            {(errors.confirmpassword && touched.confirmpassword) &&
              <Text style={styles.errors}>{errors.confirmpassword}</Text>
            }

            <Button
              title="Register"
              onPress={handleSubmit}
              disabled={!isValid}
              style={[
                styles.submitbutton,
                { backgroundColor: isValid ? '#1B75BB' : '#A5C9CA' },

              ]}
            />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ fontFamily: 'zwodrei' }}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
    fontFamily: 'zwodrei',
    padding: 5
  },
  link: {
    fontFamily: 'zwodrei',
    color: '#53C1BA',
  },
  errors: {
    color: 'red',
  },
});

export default RegisterScreen;
