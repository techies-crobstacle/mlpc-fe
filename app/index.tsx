import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';

export default function Index() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Do any initialization here
    const prepare = async () => {
      // Check AsyncStorage, auth, etc.
      await new Promise(resolve => setTimeout(resolve, 100));
      setIsReady(true);
    };

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return <Redirect href="/SplashScreen" />;
}