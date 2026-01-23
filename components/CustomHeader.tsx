import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

interface CustomHeaderProps {
  title: string;
  onMenuPress: () => void;
  isMenuOpen: boolean;
  showBackButton: boolean;
  onBackPress?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ 
  title, 
  onMenuPress, 
  isMenuOpen,
  showBackButton = false,
  onBackPress 
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  // Animation for menu icon rotation
  const menuIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withSpring(isMenuOpen ? '180deg' : '0deg', {
          damping: 15,
          stiffness: 150,
        }),
      },
    ],
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {showBackButton ? (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleBackPress}
            >
              <Ionicons 
                name="arrow-back-outline"
                size={24} 
                color="white" 
              />
            </TouchableOpacity>
          ) : <View style={styles.placeholder} />}
          
          <Text style={styles.headerTitle}>
            {title}
          </Text>
          
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={onMenuPress}
          >
            <Animated.View style={menuIconStyle}>
              <Ionicons 
                name={isMenuOpen ? "close-outline" : "menu-outline"}
                size={28} 
                color="white" 
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
    zIndex: 9999,
    elevation: 9999,
  },
  headerContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(10px)',
    zIndex: 9999,
    elevation: 9999,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
    zIndex: 9999,
    elevation: 9999,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    zIndex: 10000,
    elevation: 10000,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  placeholder: {
    width: 40,
  },
});


export default CustomHeader;