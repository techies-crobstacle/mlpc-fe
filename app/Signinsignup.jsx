  // export default Signinsignup;
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  ImageBackground,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Toast from 'react-native-toast-message';
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

const Signinsignup = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Added missing state
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params?.showLogoutToast) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Logged out successfully',
        visibilityTime: 2000,
      });

      // Clear the parameter after showing toast to prevent re-triggering
      // Note: In Expo Router, params are cleared when navigating away
    }
  }, [params?.showLogoutToast]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Toast />

      <ImageBackground
        style={styles.background}
        source={require("../assets/images/Login_Signup_Forgot BG.jpg")}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={Platform.OS === "android"}
          />
          <SafeAreaView style={{ flex: 1 }}>
            {/* Custom Navigation Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  isSignIn && styles.activeButton,
                  { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }
                ]}
                onPress={() => setIsSignIn(true)}
              >
                <Text style={[styles.buttonText, isSignIn && styles.activeText]}>
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  !isSignIn && styles.activeButton,
                  { borderTopRightRadius: 10, borderBottomRightRadius: 10 }
                ]}
                onPress={() => setIsSignIn(false)}
              >
                <Text style={[styles.buttonText, !isSignIn && styles.activeText]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Render SignIn or SignUp based on state */}
            <View style={styles.formContainer}>
              {isSignIn ? <SignIn /> : <SignUp />}
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 10 : 70,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  activeButton: {
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  activeText: {
    color: "#000",
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
});

export default Signinsignup;