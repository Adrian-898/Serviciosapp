import { useEffect } from "react";
import { useCameraPermissions } from "expo-camera";
import getErrorMessage from "@/utils/getErrorMessage";

const useCamera = () => {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    const loadCamera = async () => {
      try {
        await requestPermission();
      } catch (error) {
        console.log(error + " Mensaje: " + getErrorMessage(error));
      }
    };
    loadCamera();
  }, []);

  return permission;
};

export default useCamera;
