// import React, { useState, useRef, useEffect } from "react";
// import { View, StyleSheet, Dimensions, Animated, SafeAreaView } from "react-native";
// import { StatusBar } from 'expo-status-bar';
// import { Stack, useRouter, usePathname, useLocalSearchParams } from 'expo-router';
// import Toast from 'react-native-toast-message';
// import CustomHeader from "../components/CustomHeader";
// import Sidebar from '../components/Sidebar';

// const { width } = Dimensions.get('window');

// const getHeaderTitle = (pathname: string, params?: any) => {
//   if (pathname === '/HomeScreen' || pathname === '/') {
//     return 'Media Leader Prayer Calendar';
//   } else if (pathname === '/PersonDetail') {
//     return params?.title || 'Details';
//   } else if (pathname === '/PrayerPoints') {
//     return 'Prayer Points';
//   } else if (pathname === '/ResetPassword') {
//     return 'Reset Password';
//   } else if (pathname === '/NewPassword') {
//     return 'New Password';
//   }
//   return 'App';
// };

// export default function RootLayout() {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const slideAnim = useRef(new Animated.Value(-width)).current;
//   const router = useRouter();
//   const pathname = usePathname();
//   const params = useLocalSearchParams();

//   // Show welcome toast when Home screen mounts
//   useEffect(() => {
//     if (pathname === '/HomeScreen' || pathname === '/') {
//       Toast.show({
//         type: 'success',
//         text1: 'Welcome',
//         text2: 'Welcome to Media Leader Prayer Calendar',
//         position: 'top',
//         visibilityTime: 3000,
//         autoHide: true,
//         topOffset: 50,
//       });
//     }
//   }, [pathname]);

//   const toggleSidebar = () => {
//     const toValue = isSidebarVisible ? -width : 0;
//     Animated.spring(slideAnim, {
//       toValue,
//       useNativeDriver: true,
//       friction: 8,
//       tension: 40,
//     }).start();
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   const handleBackPress = () => {
//     if (router.canGoBack()) {
//       router.back();
//     }
//   };

//   const shouldShowHeader = !['/SplashScreen', '/Signinsignup'].includes(pathname);
//   const shouldShowBackButton = pathname !== '/HomeScreen' && pathname !== '/';

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="black" style="light" />
      
//       {shouldShowHeader && (
//         <SafeAreaView style={styles.safeArea}>
//           <CustomHeader
//             title={getHeaderTitle(pathname, params)}
//             onMenuPress={toggleSidebar}
//             isMenuOpen={isSidebarVisible}
//             showBackButton={shouldShowBackButton}
//             onBackPress={handleBackPress}
//           />
//         </SafeAreaView>
//       )}

//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="SplashScreen" />
//         <Stack.Screen name="Signinsignup" />
//         <Stack.Screen name="HomeScreen" />
//         <Stack.Screen name="PersonDetail" />
//         <Stack.Screen name="PrayerPoints" />
//         <Stack.Screen name="ResetPassword" />
//         <Stack.Screen name="NewPassword" />
//       </Stack>

//       {shouldShowHeader && (
//         <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}> 
//           <Sidebar onClose={toggleSidebar} />
//         </Animated.View>
//       )}

//       <Toast />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   safeArea: {
//     backgroundColor: '#000',
//   },
//   sidebar: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     width: '80%',
//     backgroundColor: '#143D60',
//     zIndex: 1000,
//     elevation: 1000,
//     shadowColor: '#000',
//     shadowOffset: { width: 2, height: 0 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
// });

import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter, usePathname, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import CustomHeader from "../components/CustomHeader";
import Sidebar from '../components/Sidebar';




const { width } = Dimensions.get('window');

const getHeaderTitle = (pathname: string, params?: any) => {
  if (pathname === '/HomeScreen' || pathname === '/') {
    return 'Media Leader Prayer Calendar';
  } else if (pathname === '/PersonDetail') {
    return params?.title || 'Details';
  } else if (pathname === '/PrayerPoints') {
    return 'Prayer Points';
  } else if (pathname === '/ResetPassword') {
    return 'Reset Password';
  } else if (pathname === '/NewPassword') {
    return 'New Password';
  }
  return 'App';
};

export default function RootLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const router = useRouter();
  const pathname = usePathname();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (pathname === '/HomeScreen' || pathname === '/') {
      Toast.show({
        type: 'success',
        text1: 'Welcome',
        text2: 'Welcome to Media Leader Prayer Calendar',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
      });
    }
  }, [pathname]);

  const toggleSidebar = () => {
    const toValue = isSidebarVisible ? -width : 0;
    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

// useEffect(() => {
//     setTimeout(() => {
//       SplashScreen.hideAsync(); // hide default native splash
//     }, 100); 
//   }, []);

  const shouldShowHeader = !['/SplashScreen', '/Signinsignup', '/'].includes(pathname);
  const shouldShowBackButton = pathname !== '/HomeScreen' && pathname !== '/';

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" style="light" />
      
      {shouldShowHeader && (
        <SafeAreaView style={styles.safeArea}>
          <CustomHeader
            title={getHeaderTitle(pathname, params)}
            onMenuPress={toggleSidebar}
            isMenuOpen={isSidebarVisible}
            showBackButton={shouldShowBackButton}
            onBackPress={handleBackPress}
          />
        </SafeAreaView>
      )}

      <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="SplashScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Signinsignup" options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
        <Stack.Screen name="PersonDetail" options={{ headerShown: false }} />
        <Stack.Screen name="PrayerPoints" options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" options={{ headerShown: false }} />
        <Stack.Screen name="NewPassword" options={{ headerShown: false }} />
      </Stack>

      {shouldShowHeader && (
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}> 
          <Sidebar onClose={toggleSidebar} />
        </Animated.View>
      )}

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    backgroundColor: '#000',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#143D60',
    zIndex: 1000,
    elevation: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});