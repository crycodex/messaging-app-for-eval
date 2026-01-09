import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Color } from "../constants/colors";
import { useCheckAuth } from "../hooks/useAuth";

SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent() {
  const [isReady, setIsReady] = useState(false);
  const { checkAuth } = useCheckAuth();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const { isAuthenticated } = await checkAuth();

        if (isAuthenticated) {
          router.replace("/chat");
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        router.replace("/login");
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Color.PRIMARY_300} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.PRIMARY_500,
  },
});
