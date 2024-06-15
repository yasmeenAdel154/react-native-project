// screens/RegisterScreen.js
import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const registerValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(6, 'Password should be at least 6 characters'),
  });

  const handleRegister = async (values) => {
    await AsyncStorage.setItem('user', JSON.stringify(values));
    navigation.navigate('Products');
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={registerValidationSchema}
      onSubmit={handleRegister}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          <Button onPress={handleSubmit} title="Register" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});

export default RegisterScreen;
