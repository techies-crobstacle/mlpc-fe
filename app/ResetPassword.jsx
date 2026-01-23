// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
// } from "react-native";
// import { Input, Button, Icon } from "react-native-elements";
// import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Platform,StatusBar } from 'react-native';
// import { useRouter } from "expo-router";

// const ResetPassword = () => {
//   const [email, setEmail] = useState("");
//   const navigation = useNavigation();
// // const router=useRouter();

//   const handleContinue = () => {
//     // console.log("Password reset email sent to:", email);
//   navigation.navigate("NewPassword");
//   };

//   return (
//     <View style={{ flex: 1 }}>
    
//       <ImageBackground
//         style={styles.background}
//         source={require("../assets/images/Login_Signup_Forgot BG.jpg")}
//       >
//           <StatusBar
//                   barStyle="light-content"
//                   backgroundColor="black"
//                   translucent={Platform.OS === "android"}
//                 />
//                 <SafeAreaView>
//         <View style={styles.container}>
//           <Text style={styles.title}>Reset your Password</Text>
//           <Text style={styles.subtitle}>
//             Enter your email to receive a password reset link
//           </Text>

//           <Input
//             style={styles.input}
//             placeholder="Enter your email"
//             placeholderTextColor="#999"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             leftIcon={{ type: "font-awesome", name: "envelope", color: "white", size:18 }}
//           />

//           <Button
//             title="Continue"
//             buttonStyle={styles.button}
//             titleStyle={styles.buttonText}
//             onPress={handleContinue}
//           />

//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.backText}>Back to Login</Text>
//           </TouchableOpacity>
//         </View>
//         </SafeAreaView>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
// container:{
//   padding:15,
//   paddingTop:50
// },

//   background: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//   },

//   title: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#ccc",
    
//     marginBottom: 20,
//   },
//     input: {
//     color: "white",
//   },
//   button: {
//     backgroundColor: "white",
//     marginTop: 10,
//     width: 110,
    
//   },
//   buttonText: {
//     color: "black",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   backText: {
//     color: "white",
//     marginTop: 20,
//     fontSize: 16,
//     textDecorationLine: "underline",
//   },
// });

// export default ResetPassword;



import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  StatusBar,
  Platform,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendPasswordResetEmail } from "firebase/auth"; // Import Firebase method
import { auth } from "../firebaseconfig"; // Import Firebase auth instance

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleContinue = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email); // Send the password reset email
      Alert.alert("Success", "Password reset link has been sent to your email.");
      navigation.navigate("Signinsignup"); // Navigate back to the sign-in screen
    } catch (error) {
      console.error("Password Reset Error:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/images/Login_Signup_Forgot BG.jpg")}
      >
        <StatusBar barStyle="light-content" backgroundColor="black" translucent={Platform.OS === "android"} />
        <SafeAreaView>
          <View style={styles.container}>
            <Text style={styles.title}>Reset your Password</Text>
            <Text style={styles.subtitle}>
              Enter your email to receive a password reset link.
            </Text>

            <Input
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              leftIcon={{ type: "font-awesome", name: "envelope", color: "white", size: 18 }}
            />

            <Button
              title="Continue"
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              onPress={handleContinue}
            />

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
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
  },
  subtitle: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 20,
  },
  input: {
    color: "white",
  },
  button: {
    backgroundColor: "white",
    marginTop: 10,
    width: 110,
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

export default ResetPassword;
