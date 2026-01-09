import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { HttpStatusCode } from "../api/baseRepositories/api/http/constants";
import { BaseError } from "../api/errors/BaseError";
import { useColorScheme } from "../hooks/useColorSchemeWeb";
import { store } from "../redux/store";
import SocketProvider from "./socketProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const clearStorage = async () => {
    // NOTE: Clear any stored data, e.g., AsyncStorage, Redux store, etc.
  };

  const defaultOnError = (error: BaseError) => {
    if (error) {
      const { status } = error;
      if (status === HttpStatusCode.UNAUTHORIZED) {
        return clearStorage();
      }

      // NOTE: Handle other global errors here, f.e.g. show a toast notification
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: false,
      },
      mutations: {
        onError: (e) => {
          defaultOnError(e as BaseError);
        },
      },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <SocketProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="chat" options={{ headerShown: false }} />
              </Stack>

              <StatusBar style="light" />
            </GestureHandlerRootView>
          </SocketProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
