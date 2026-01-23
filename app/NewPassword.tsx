import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Platform,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
//   const navigation = useNavigation();

  const handleSetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
   
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/images/Login_Signup_Forgot BG.jpg")}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="black"
          translucent={Platform.OS === "android"}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Set New Password</Text>
          <Text style={styles.subtitle}>
            Enter a new password for your account
          </Text>

          <Input
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#999"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            leftIcon={{ type: "font-awesome", name: "lock", color: "white", size: 20 }}
          />

          <Input
            style={styles.input}
            placeholder="Confirm New Password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            leftIcon={{ type: "font-awesome", name: "lock", color: "white", size: 18 }}
          />

          <Button
            title="Set New Password"
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={handleSetPassword}
          />

          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 50,
    
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    marginLeft:5
  },
  subtitle: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 20,
    marginLeft:5
  },
  input: {
    color: "white",
  },
  button: {
    backgroundColor: "white",
    marginTop: 10,
    width: 160,
    marginLeft:5

  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  backText: {
    color: "white",
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default NewPassword;
