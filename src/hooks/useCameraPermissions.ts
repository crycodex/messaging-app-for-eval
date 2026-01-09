import { Camera } from "expo-camera";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const useCameraPermissions = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const granted = status === "granted";
      setHasPermission(granted);

      if (!granted) {
        Alert.alert(
          "Permiso denegado",
          "Se necesita acceso a la cámara para tomar fotos"
        );
      }

      return granted;
    } catch (error) {
      console.error("Error requesting camera permission:", error);
      Alert.alert("Error", "No se pudo solicitar permiso de cámara");
      return false;
    }
  }, []);

  const checkPermission = useCallback(async () => {
    const { status } = await Camera.getCameraPermissionsAsync();
    const granted = status === "granted";
    setHasPermission(granted);
    return granted;
  }, []);

  return { hasPermission, requestPermission, checkPermission };
};
