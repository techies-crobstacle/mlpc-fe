import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth, db } from "../firebaseconfig";
import { setDoc, doc } from "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CountryPicker from 'react-native-country-picker-modal';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { sendEmailVerification } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();

  // Form state
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    phone: ""
  });
  
  // UI state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [countryCallingCode, setCountryCallingCode] = useState('1');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    const { fullname, email, password, confirmPassword, country, phone } = formData;
    
    // Check empty fields
    if (!fullname?.trim()) newErrors.fullname = "Full name is required";
    if (!email?.trim()) newErrors.email = "Email is required";
    if (!password?.trim()) newErrors.password = "Password is required";
    if (!confirmPassword?.trim()) newErrors.confirmPassword = "Please confirm your password";
    if (!country?.trim()) newErrors.country = "Country is required";
    if (!phone?.trim()) newErrors.phone = "Phone number is required";
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email?.trim() && !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Check password match
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update form data
  const updateFormField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Handle phone input
  const handlePhoneChange = (text) => {
    const filteredText = text.replace(/[^0-9]/g, "");
    updateFormField('phone', filteredText);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  // Debounce sign-up to prevent multiple submissions
  const handleSignUp = useCallback(async () => {
    if (isLoading) return;
    
    // Validate form
    if (!validateForm()) {
      Toast.show({
        type: 'error',
        text1: 'Form Error',
        text2: 'Please fix the errors in the form',
        visibilityTime: 3000,
      });
      return;
    }
    
    const { fullname, email, password, country, phone } = formData;
    
    setIsLoading(true);
    
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth, 
        email.trim(), 
        password
      );
      const user = userCredential.user;
      
      // Perform all operations
      await Promise.all([
        // Update user profile
        updateProfile(user, { displayName: fullname.trim() }),
        
        // Send verification email
        sendEmailVerification(user),
        
        // Create user document in Firestore
        setDoc(doc(db, "users", user.uid), {
          fullname: fullname.trim(),
          email: email.trim(),
          country: country.trim(),
          phone: `+${countryCallingCode}${phone.trim()}`,
          emailVerified: false,
          verified: false,
          createdAt: new Date().toISOString(),
        })
      ]);
      
      // Show success message
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'Please check your email for verification',
        visibilityTime: 4000,
      });
      
      // Navigate after a delay
      setTimeout(() => {
        navigation.navigate('Signinsignup');
      }, 1500);
      
    } catch (error) {
      console.error("Sign Up Error:", error);
      
      // Handle specific Firebase errors
      let errorMessage = 'An error occurred during sign up';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error - please check your connection';
      }
      
      Toast.show({
        type: 'error',
        text1: 'Sign Up Failed',
        text2: errorMessage,
        visibilityTime: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, isLoading, countryCallingCode, navigation]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraHeight={100}
      keyboardShouldPersistTaps="handled" // Important to prevent button press issues
    >
      <Text style={styles.title}>Join us Today!</Text>
      <Text style={styles.subtitle}>Create an account and unlock amazing features.</Text>

      <Input
        style={styles.input}
        placeholder="Full Name"
        value={formData.fullname}
        onChangeText={(text) => updateFormField('fullname', text)}
        leftIcon={{ type: "font-awesome", name: "user", size: 22, color: "white" }}
        disabled={isLoading}
        errorMessage={errors.fullname}
        errorStyle={styles.errorText}
      />

      <Input
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => updateFormField('email', text)}
        leftIcon={{ type: "font-awesome", name: "envelope", size: 18, color: "white" }}
        disabled={isLoading}
        errorMessage={errors.email}
        errorStyle={styles.errorText}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Input
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => updateFormField('password', text)}
        secureTextEntry={!isPasswordVisible}
        leftIcon={{ type: "font-awesome", name: "lock", color: "white" }}
        rightIcon={
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={isPasswordVisible ? "eye-slash" : "eye"} type="font-awesome" color="white" size={20} />
          </TouchableOpacity>
        }
        disabled={isLoading}
        errorMessage={errors.password}
        errorStyle={styles.errorText}
      />

      <Input
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => updateFormField('confirmPassword', text)}
        secureTextEntry={!isConfirmPasswordVisible}
        leftIcon={{ type: "font-awesome", name: "lock", color: "white" }}
        rightIcon={
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
            <Icon name={isConfirmPasswordVisible ? "eye-slash" : "eye"} type="font-awesome" color="white" size={20} />
          </TouchableOpacity>
        }
        disabled={isLoading}
        errorMessage={errors.confirmPassword}
        errorStyle={styles.errorText}
      />

      <TouchableOpacity 
        onPress={() => setShowCountryPicker(true)}
        disabled={isLoading}
      >
        <Input
          style={styles.input}
          placeholder="Select Country"
          value={formData.country}
          editable={false}
          leftIcon={
            selectedCountry ? (
              <Image
                source={{ uri: selectedCountry.flag }}
                style={{ width: 25, height: 18, borderRadius: 3 }}
              />
            ) : (
              <Icon type="font-awesome" name="globe" size={20} color="white" />
            )
          }
          rightIcon={{ type: "font-awesome", name: "caret-down", size: 20, color: "white" }}
          disabled={isLoading}
          errorMessage={errors.country}
          errorStyle={styles.errorText}
        />
      </TouchableOpacity>

      <CountryPicker
        visible={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        onSelect={(country = { cca2: "US", callingCode: ["1"], name: "United States" }) => {
          setSelectedCountry({
            flag: `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`,
            callingCode: country.callingCode[0],
          });
          updateFormField('country', country.name);
          setCountryCallingCode(country.callingCode[0]);
          setShowCountryPicker(false);
        }}
        withFlag
        withCallingCode
        withFilter
        withAlphaFilter
        containerButtonStyle={{ display: "none" }}
        theme={{
          onBackgroundTextColor: "#000",
          backgroundColor: "#fff",
          searchPlaceholderTextColor: "#999",
          primaryColor: "#ccc",
          primaryTextColor: "#000",
          separatorColor: "#eee",
        }}
        translation="common"
      />

      <Input
        style={styles.input}
        placeholder="Phone Number"
        value={formData.phone}
        onChangeText={handlePhoneChange}
        keyboardType="numeric"
        leftIcon={
          selectedCountry ? (
            <Text style={{ color: "white", fontSize: 16 }}>+{selectedCountry.callingCode}</Text>
          ) : (
            <Icon type="font-awesome" name="phone" size={20} color="white" />
          )
        }
        leftIconContainerStyle={{ marginRight: 10 }}
        disabled={isLoading}
        errorMessage={errors.phone}
        errorStyle={styles.errorText}
      />

      <Button
        title={isLoading ? "Creating Account..." : "Sign Up"}
        titleStyle={styles.buttonText}
        buttonStyle={[
          styles.button,
          isLoading && { opacity: 0.7 }
        ]}
        onPress={handleSignUp}
        loading={isLoading}
        disabled={isLoading}
        disabledStyle={styles.buttonDisabled}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 30,
    color: "white",
    textAlign: "center",
  },
  input: {
    color: "white",
  },
  button: {
    backgroundColor: "white",
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 20,
  },
  buttonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 2,
  },
});

export default SignUp;