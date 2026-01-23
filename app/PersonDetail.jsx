import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, StatusBar } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const PersonDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { personData } = route.params; // Destructure to get the data passed from HomeScreen

  // Dynamically update the header title when the component mounts
  useEffect(() => {
    // Set the title of the header to the title of the person clicked
    navigation.setOptions({
      title: personData.title, // Set the header title to the person's title
    });
  }, [navigation, personData.title]); // Dependency array ensures it updates when `personData.title` changes

  return (
    <View style={{flex:1  }}>
      <StatusBar />
      <ImageBackground style={{flex:1}} source={require('../assets/images/3.jpg')}>
    <View style={{ padding: 20 , flex:1, paddingVertical:80 }}>
       <View style={styles.container}>
         <Image
          style={styles.logo}
          source={{ uri: personData?.imageUrl || 'https://reactnative.dev/img/tiny_logo.png' }} // Default image
        />
        <Text style={{fontSize:20, fontWeight:'bold' , paddingTop:28}}>{personData?.title || 'Default Title'}</Text>
        <Text style={{ marginBottom: 10 }}>
          {personData?.description ||
            'Default description for Cultural Influencer.'}
        </Text>
        <View style={{ flexDirection:"row", gap: 15 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("PrayerPoints")}>
            <Text style={styles.buttonText}>Prayer Points</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Navigate to Donate')}>
            <Text style={styles.buttonText}>Donate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 18,
      backgroundColor:"white",
      borderRadius:10,
      opacity:0.9
    },
  
    logo: {
      width: 70,
      height: 70,
      borderRadius:50,
position:"absolute",
top:-35
    },
  
    button: {
      width: 130,
      textAlign: 'center',
      backgroundColor: '#004ba5',
      paddingVertical: 10,
      borderRadius: 5,
    },
  
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
  });

export default PersonDetailScreen;
