import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { firebaseAuth } from '../firebaseconfig';
import Toast from 'react-native-toast-message';

const EmailVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};

  const [checking, setChecking] = useState(false);

  const handleContinue = async () => {
    setChecking(true);
    await firebaseAuth.currentUser.reload();
    if (firebaseAuth.currentUser.emailVerified) {
      Toast.show({
        type: 'success',
        text1: 'Email Verified',
        text2: 'You can now sign in.',
        visibilityTime: 2000,
      });
      navigation.navigate('Signinsignup');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Not Verified',
        text2: 'Please verify your email before continuing.',
        visibilityTime: 3000,
      });
    }
    setChecking(false);
  };

  return (
    <View style={styles.container}>
      <Toast />
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>
        An email verification link has been sent to:
      </Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.info}>
        Please check your inbox and click the link to verify your account.
      </Text>
      <Button title={checking ? "Checking..." : "Continue"} onPress={handleContinue} disabled={checking} />
      <View style={{ height: 10 }} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Signinsignup')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
    textAlign: 'center',
  },
  email: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#007bff',
  },
  info: {
    fontSize: 15,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center',
  },
});

export default EmailVerification;
