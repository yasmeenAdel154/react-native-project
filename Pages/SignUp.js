import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const savedUsers = await AsyncStorage.getItem('Users');
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
        console.log(savedUsers) ;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveUsers = async (todos) => {
    try {
      await AsyncStorage.setItem('Users', JSON.stringify(users));
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters long')
      .required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phoneNumber: Yup.number()
      .typeError('Phone number must be a number')
      .required('Phone number is required'),
  });

  const handleSignUp = async (values) =>  {
    console.log(values);
    console.log(values.password);
    if (values.email === '' || values.password === '') {
      alert('userName and password cannot be empty');
      return;
    }
    
      const newUser = { id: Date.now().toString(), userName: values.email, password: values.password };
      console.log( newUser)
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      saveUsers(updatedUsers);
    
      setUserName('');
      setPassword('');
  };

  return (
    <Formik
      initialValues={{ password: '', email: '' }}
      validationSchema={validationSchema}
       onSubmit={(values) => {
         // handle form submission
         handleSignUp(values)
         console.log(values);
       }}
      //onSubmit={handleSignUp}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
         

         <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

          
          <Button onPress={handleSubmit} title="Sign UP" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  inputPassword: {
    height: 40,
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showButton: {
    marginLeft: 8,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 12,
  },
});

export default SignUp;
