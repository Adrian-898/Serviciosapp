import "expo-dev-client";
import { useState, useEffect } from "react";
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
import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Platform, type AppStateStatus } from "react-native";
import { useColorScheme } from "react-native";
import useAppState from "@/hooks/useAppState";
import useOnlineManager from "@/hooks/useOnlineManager";
import AuthContext from "@/contexts/AuthContext";
import { loadUser } from "@/services/AuthService";
import getErrorMessage from "@/utils/getErrorMessage";
//import { DevToolsBubble } from "react-native-react-query-devtools";

// Previene al splash screen de ocultarse antes de que los recursos esten cargados.
SplashScreen.preventAutoHideAsync();

function onAppStateChange(status: AppStateStatus) {
  // React Query ya soporta el refetch al reconectarse por defecto en web
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const RootLayout = () => {
  useAppState(onAppStateChange);
  useOnlineManager();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState("loading");
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 2, // 2 horas de duracion de cache
            retry: 2, // queries fallidos se reintentan 2 veces
            staleTime: 1000 * 30, // se evita el refetch inmediato al establecer 30 segundos como tiempo de espera para considerar los datos vencidos o obsoletos (stale)
            networkMode: "online", // modo de operacion de queries, "online" significa que la App requiere conexion a internet para funcionar
          },
        },
      })
  );

  // carga el usuario al iniciar la app
  useEffect(() => {
    const runEffect = async () => {
      try {
        const user = await loadUser();
        if (user !== null) {
          setUser(user);
          setStatus("resolved");
        }
      } catch (error) {
        setStatus("error");
        console.error(error + " Mensaje: " + getErrorMessage(error));
      }
    };
    runEffect();
  }, []);

  console.log("Status: ", status);

  if (status !== "resolved") {
    return;
  }

  SplashScreen.hideAsync();

  // Layout de navegacion de la app
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, setUser }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <PaperProvider>
            <Stack screenOptions={{ headerShown: false }}>
              {user ? (
                <Stack.Screen name="(tabs)" />
              ) : (
                <Stack.Screen name="index" />
              )}
              <Stack.Screen name="+not-found" />
            </Stack>
          </PaperProvider>
        </ThemeProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default RootLayout;
