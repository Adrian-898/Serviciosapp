import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { Platform } from "react-native";

const useOnlineManager = () => {
  useEffect(() => {
    // React Query ya soporta el refetch al reconectarse por defecto en web
    if (Platform.OS !== "web") {
      return NetInfo.addEventListener((state) => {
        onlineManager.setOnline(
          state.isConnected != null &&
            state.isConnected &&
            Boolean(state.isInternetReachable)
        );
      });
    }
  }, []);
};

export default useOnlineManager;
