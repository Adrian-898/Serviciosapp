import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useState, useEffect } from "react";
import { Platform, AppStateStatus } from "react-native";
import { useColorScheme } from "react-native";
import { useAppState } from "@/hooks/useAppState";
import { useOnlineManager } from "@/hooks/useOnlineManager";
import AuthContext from "@/contexts/AuthContext";
import { loadUser } from "@/services/AuthService";
import { StrictMode } from "react";
//import { DevToolsBubble } from "react-native-react-query-devtools";

// Previene al splash screen de ocultarse antes de que los recursos esten cargados.
SplashScreen.preventAutoHideAsync();

function onAppStateChange(status: AppStateStatus) {
  // React Query ya soporta el refetch al reconectarse por defecto en web
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function RootLayout() {
  useAppState(onAppStateChange);
  useOnlineManager();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<any>();
  const [status, setStatus] = useState("loading");
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60, // 1 hora de duracion de cache
            retry: 2, // queries fallidos se reintentan 2 veces
            staleTime: 1000 * 30, // evita refetch inmediato
            networkMode: "online", // modo de operacion de queries, "online" requiere conexion
          },
        },
      })
  );

  useEffect(() => {
    const runEffect = async () => {
      try {
        const user = await loadUser();
        setUser(user);
      } catch (error) {
        console.log("No se pudo cargar la información del usuario: ", error);
      }
      setStatus("idle");
    };
    runEffect();
  }, []);

  if (status === "loading") {
    return;
  }

  SplashScreen.hideAsync();

  // Layout de navegacion de la app
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AuthContext.Provider value={{ user, setUser }}>
            <Stack screenOptions={{ headerShown: true, headerTitle: "" }}>
              {user ? (
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              ) : (
                <Stack.Screen name="index" options={{ headerShown: false }} />
              )}
              <Stack.Screen name="+not-found" />
            </Stack>
          </AuthContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

