// app/SplashScreen.jsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { Platform,StatusBar } from 'react-native';


const SplashScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Signinsignup'); // Navigate to SignUp screen instead of Home
    }, 5000);

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
              barStyle="light-content" // Change text/icons to light for visibility
              backgroundColor="transparent" // Transparent on Android, Black on iOS
              translucent={Platform.OS === "android"} // Only translucent on Android
            />
      <ImageBackground source={require("../assets/images/splash-bg.jpg")} resizeMode="cover" style={styles.image}>
        <View>
          <Image
            style={styles.logo}
            source={require("../assets/images/logo2.png")}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  logo:{
    margin:"auto",
    width:'200',
    resizeMode:"contain"
  }
});

export default SplashScreen;
