import "dotenv/config";

export default {
  expo: {
    name: "app-la-guaira",
    slug: "app-la-guaira",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
    },
    ios: {
      supportsTablet: true,
      requireFullScreen: true,
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_API_KEY,
        },
      },
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
      ],
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.applaguaira",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-secure-store",
      [
        "expo-camera",
        {
          recordAudioAndroid: false,
        },
      ],
      [
        "expo-screen-orientation",
        {
          initialOrientation: "DEFAULT",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    extra: {
      eas: {
        projectId: "1dc3a6b1-cd20-4c56-878f-18eed5a1c865",
      },
    },
  },
};
