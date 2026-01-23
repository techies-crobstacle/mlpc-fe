// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { Input, Button, Icon } from "react-native-elements";
// import { useNavigation } from "@react-navigation/native";
// import { firebaseAuth } from "@/firebaseconfig";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import Toast from 'react-native-toast-message';
// import * as Keychain from 'react-native-keychain';

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();
//   const auth = firebaseAuth;

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

//   const handleSignIn = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       if (!email?.trim() || !password?.trim()) {
//         Toast.show({
//           type: 'error',
//           text1: 'Error',
//           text2: 'Please fill in all fields'
//         });
//         setLoading(false);
//         return;
//       }

//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       await user.reload();

//       if (!user.emailVerified) {
//         Toast.show({
//           type: 'error',
//           text1: 'Error',
//           text2: 'Please verify your email before signing in'
//         });
//         await signOut(auth);
//         setLoading(false);
//         return;
//       }

//       const idToken = await user.getIdToken();

//       // Use fetch for backend token exchange
//       const response = await fetch("https://mlpc-backend.onrender.com/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ idToken }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Login failed');
//       }

//       const data = await response.json();
//       const sessionToken = data.token;

//       if (sessionToken) {
//         await Keychain.setGenericPassword('session', sessionToken);
//       }

//       Toast.show({
//         type: 'success',
//         text1: 'Success',
//         text2: 'Successfully signed in'
//       });

//       navigation.navigate('HomeScreen');

//     } catch (error) {
//       Toast.show({
//         type: 'error',
//         text1: 'Sign In Failed',
//         text2: error.message || 'Authentication failed'
//       });
//       try {
//         await signOut(auth);
//         await Keychain.resetGenericPassword();
//       } catch {
//         // Optional error handling for sign-out/reset failure
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ marginHorizontal: 12, marginVertical: 10, marginBottom: 20 }}>
//         <Text style={styles.title}>Welcome Back!</Text>
//         <Text style={{ color: "white", fontSize: 15 }}>
//           Login to continue our journey with us.
//         </Text>
//       </View>

//       <Input
//         style={styles.input}
//         placeholder="Enter your email"
//         value={email}
//         onChangeText={setEmail}
//         leftIcon={{ type: "font-awesome", name: "envelope", size: 18, color: "white" }}
//         disabled={loading}
//       />

//       <Input
//         style={styles.input}
//         placeholder="Enter your password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry={!isPasswordVisible}
//         leftIcon={{ type: "font-awesome", name: "lock", color: "white" }}
//         disabled={loading}
//         rightIcon={
//           <TouchableOpacity onPress={togglePasswordVisibility} disabled={loading}>
//             <Icon name={isPasswordVisible ? "eye-slash" : "eye"} type="font-awesome" color="white" size={20} />
//           </TouchableOpacity>
//         }
//       />

//       <Button
//         title="Login"
//         buttonStyle={[
//           styles.button,
//           loading && { opacity: 0.7 }
//         ]}
//         titleStyle={styles.buttonText}
//         onPress={handleSignIn}
//         loading={loading}
//         disabled={loading}
//         loadingProps={{ color: 'black' }}
//       />

//       <Text style={{ color: "white", fontSize: 16, fontWeight: "500", alignSelf: "center", marginTop: 110 }}>
//         or continue with
//       </Text>

//       <TouchableOpacity style={styles.containerGoogle}>
//         <Image source={require("../assets/images/google.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
//         <Text style={{ fontSize: 16, alignSelf: "center", fontWeight: "700" }}>Sign in with Google</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.containerFb}>
//         <Image source={require("../assets/images/facebook.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
//         <Text style={{ fontSize: 16, alignSelf: "center", color: "white", fontWeight: "700" }}>Sign in with Facebook</Text>
//       </TouchableOpacity>

//       <View style={{ alignItems: "center", marginVertical: 20, flexDirection: "row", justifyContent: "center" }}>
//         <Text style={{ fontSize: 16, color: "white" }}>Forgot password? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
//           <Text style={{ fontSize: 16, textDecorationLine: "underline", color: "white" }}>Reset now</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { height: "100%", paddingTop: 20, flex: 1 },
//   title: { color: "white", fontSize: 30, fontWeight: "bold", marginBottom: 10 },
//   button: { backgroundColor: "white", marginTop: 10, width: 140, alignSelf: "center" },
//   buttonText: { color: "black" },
//   input: { color: "white" },
//   containerGoogle: { marginVertical: 15, justifyContent: "center", flexDirection: "row", gap: 10, backgroundColor: "white", padding: 10, borderRadius: 24, width: "70%", alignSelf: "center" },
//   containerFb: { justifyContent: "center", flexDirection: "row", gap: 10, backgroundColor: "#1877f2", padding: 10, borderRadius: 24, width: "70%", alignSelf: "center" },
// });

// export default SignIn;


import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { firebaseAuth } from "@/firebaseconfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import Toast from 'react-native-toast-message';
import * as Keychain from 'react-native-keychain';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const auth = firebaseAuth;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignIn = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (!email?.trim() || !password?.trim()) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please fill in all fields'
        });
        setLoading(false);
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await user.reload();

      if (!user.emailVerified) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please verify your email before signing in'
        });
        await signOut(auth);
        setLoading(false);
        return;
      }

      const idToken = await user.getIdToken();

      // Use fetch for backend token exchange
      const response = await fetch("https://mlpc-backend.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      const sessionToken = data.token;

      if (sessionToken) {
        await Keychain.setGenericPassword('session', sessionToken);
      }

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Successfully signed in'
      });

      navigation.navigate('HomeScreen');

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign In Failed',
        text2: error.message || 'Authentication failed'
      });
      try {
        await signOut(auth);
        await Keychain.resetGenericPassword();
      } catch {
        // Optional error handling for sign-out/reset failure
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 12, marginVertical: 10, marginBottom: 20 }}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={{ color: "white", fontSize: 15 }}>
          Login to continue our journey with us.
        </Text>
      </View>

      <Input
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        leftIcon={{ type: "font-awesome", name: "envelope", size: 18, color: "white" }}
        disabled={loading}
      />

      <Input
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}
        leftIcon={{ type: "font-awesome", name: "lock", color: "white" }}
        disabled={loading}
        rightIcon={
          <TouchableOpacity onPress={togglePasswordVisibility} disabled={loading}>
            <Icon name={isPasswordVisible ? "eye-slash" : "eye"} type="font-awesome" color="white" size={20} />
          </TouchableOpacity>
        }
      />

      <Button
        title="Login"
        buttonStyle={[
          styles.button,
          loading && { opacity: 0.7 }
        ]}
        titleStyle={styles.buttonText}
        onPress={handleSignIn}
        loading={loading}
        disabled={loading}
        loadingProps={{ color: 'black' }}
      />

      {/* <Text style={{ color: "white", fontSize: 16, fontWeight: "500", alignSelf: "center", marginTop: 110 }}>
        or continue with
      </Text> */}

      {/* <TouchableOpacity style={styles.containerGoogle}>
        <Image source={require("../assets/images/google.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
        <Text style={{ fontSize: 16, alignSelf: "center", fontWeight: "700" }}>Sign in with Google</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity style={styles.containerFb}>
        <Image source={require("../assets/images/facebook.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
        <Text style={{ fontSize: 16, alignSelf: "center", color: "white", fontWeight: "700" }}>Sign in with Facebook</Text>
      </TouchableOpacity> */}

      <View style={{ alignItems: "center", marginVertical: 20, flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ fontSize: 16, color: "white" }}>Forgot password? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text style={{ fontSize: 16, textDecorationLine: "underline", color: "white" }}>Reset now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: "100%", paddingTop: 20, flex: 1 },
  title: { color: "white", fontSize: 30, fontWeight: "bold", marginBottom: 10 },
  button: { backgroundColor: "white", marginTop: 10, width: 140, alignSelf: "center" },
  buttonText: { color: "black" },
  input: { color: "white" },
  containerGoogle: { marginVertical: 15, justifyContent: "center", flexDirection: "row", gap: 10, backgroundColor: "white", padding: 10, borderRadius: 24, width: "70%", alignSelf: "center" },
  containerFb: { justifyContent: "center", flexDirection: "row", gap: 10, backgroundColor: "#1877f2", padding: 10, borderRadius: 24, width: "70%", alignSelf: "center" },
});

export default SignIn;
