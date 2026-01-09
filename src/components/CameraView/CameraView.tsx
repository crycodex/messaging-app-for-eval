import { CameraView as ExpoCameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Icon } from "../Icon/Icon";

interface CameraViewProps {
  visible: boolean;
  onClose: () => void;
  onCapture: (uri: string) => void;
}

export function CameraView({ visible, onClose, onCapture }: CameraViewProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<ExpoCameraView>(null);

  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (photo?.uri) {
        onCapture(photo.uri);
        onClose();
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  if (!visible) return null;

  if (!permission) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
    );
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.permissionText}>
            Se necesita acceso a la cámara
          </Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Otorgar permiso</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <ExpoCameraView ref={cameraRef} style={styles.camera} facing="back">
          <View style={styles.controls}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="xmark" size={32} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapture}
              disabled={isCapturing}
            >
              {isCapturing ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>
          </View>
        </ExpoCameraView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  controls: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  captureButtonInner: {
    backgroundColor: "#fff",
    borderRadius: 35,
    width: 70,
    height: 70,
  },
  permissionText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
