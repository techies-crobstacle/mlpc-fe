import React, { useEffect, useState, useCallback, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  useSharedValue
} from 'react-native-reanimated';
import { fetchWithTimeout } from '../utils/api';

// Memoized card component for better performance
const PersonCard = memo(({ data, onReadMore }) => {
  if (!data) return null;

  return (
    <View style={styles.card}>
      <Image
        style={styles.logo}
        source={{ uri: data.imageUrl }}
        defaultSource={require('../assets/images/logo.png')}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{data.title}</Text>
        <Text numberOfLines={3} style={styles.description}>
          {data.description}
        </Text>
        <TouchableOpacity
          onPress={() => onReadMore(data)}
          style={styles.readMoreButton}
        >
          <Text style={styles.readMore}>Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

// Error component
const ErrorDisplay = memo(({ error, onRetry }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{error}</Text>
    <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
      <Text style={styles.retryText}>Retry</Text>
    </TouchableOpacity>
  </View>
));

const HomeScreen = () => {
  const navigation = useNavigation();
  const [mediaLeaderData, setMediaLeaderData] = useState(null);
  const [culturalInfluencerData, setCulturalInfluencerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format Date - memoized to prevent unnecessary re-calculations
  const todayFormatted = React.useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  // Fetch data function
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching Media Leader & Cultural Influencer Data...");

      const [mediaResult, culturalResult] = await Promise.all([
        fetchWithTimeout('/medialeaders/today'),
        fetchWithTimeout('/culturalinfluencers/today')
      ]);

      // Set Media Leader Data
      if (mediaResult?.success && mediaResult.data?.length > 0) {
        const mediaLeader = mediaResult.data[0];
        setMediaLeaderData({
          title: mediaLeader.name || 'No Name Available',
          description: mediaLeader.description || 'No Description Available',
          imageUrl: mediaLeader.imageUrl || "https://reactnative.dev/img/tiny_logo.png",
          id: mediaLeader.id,
          type: 'Media Leader'
        });
      } else {
        console.log('No media leader data available for today');
        setMediaLeaderData({
          title: 'No Media Leader Available',
          description: 'Information not available for today',
          imageUrl: "https://reactnative.dev/img/tiny_logo.png",
          type: 'Media Leader'
        });
      }
      
      // Set Cultural Influencer Data
      if (culturalResult?.success && culturalResult.data?.length > 0) {
        const influencer = culturalResult.data[0];
        setCulturalInfluencerData({
          title: influencer.name || 'No Name Available',
          description: influencer.description || 'No Description Available',
          imageUrl: influencer.imageUrl || "https://reactnative.dev/img/tiny_logo.png",
          id: influencer.id,
          type: 'Cultural Influencer'
        });
      } else {
        console.log('No cultural influencer data available for today');
        setCulturalInfluencerData({
          title: 'No Cultural Influencer Available',
          description: 'Information not available for today',
          imageUrl: "https://reactnative.dev/img/tiny_logo.png",
          type: 'Cultural Influencer'
        });
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data on initial render and when screen comes into focus
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refresh data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {
        // Clean up if needed
      };
    }, [fetchData])
  );

  // Navigate to PersonDetail page - memoized to avoid recreating on each render
  const navigateToPersonDetail = useCallback((data) => {
    navigation.navigate("PersonDetail", { personData: data });
  }, [navigation]);

  // Render section content based on loading/error state
  const renderSectionContent = useCallback((data, type) => {
    if (loading) {
      return <ActivityIndicator size="large" color="#fff" />;
    }

    if (error) {
      return <ErrorDisplay error={error} onRetry={fetchData} />;
    }

    return (
      <PersonCard 
        data={data} 
        onReadMore={navigateToPersonDetail} 
      />
    );
  }, [loading, error, fetchData, navigateToPersonDetail]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/images/3.jpg')}
        resizeMode="cover"
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.topContainer}>
              <Text style={styles.prayText}>Pray For...</Text>
              <Text style={styles.dateText}>{todayFormatted}</Text>
            </View>
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Media Leader</Text>
              {renderSectionContent(mediaLeaderData, 'Media Leader')}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cultural Influencer</Text>
              {renderSectionContent(culturalInfluencerData, 'Cultural Influencer')}
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Optimized Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prayText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    paddingVertical: 10
  },
  dateText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  card: {
    borderWidth: 2,
    borderColor: "black",
    padding: 16,
    paddingVertical: 24,
    borderRadius: 10,
    flexDirection: "row",
    gap: 20,
    backgroundColor: "white",
    opacity: 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 0.8,
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  description: {
    width: "100%",
    color: "#333",
  },
  readMoreButton: {
    marginTop: 5,
  },
  readMore: {
    textDecorationLine: "underline",
    fontWeight: "600",
    color: "blue",
    fontSize: 15,
  },
  logo: {
    width: 66,
    height: 58,
    borderRadius: 9999,
  },
  errorContainer: {
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 10,
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: "#0066cc",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  retryText: {
    color: "white",
    fontWeight: "500",
  },
});

export default HomeScreen;