import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActionSheet } from "../../../components/ActionSheet/ActionSheet";
import { CameraView } from "../../../components/CameraView/CameraView";
import { Icon } from "../../../components/Icon/Icon";
import { ThemedView } from "../../../components/ThemedView/ThemedView";
import { useSendImageMessage } from "../../../hooks/useSendImageMessage";
import { setMessageInput } from "../../../redux/chat";
import { getMessageInput } from "../../../redux/chat/chat.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Send from "./Send";

function Footer() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const message = useAppSelector(getMessageInput);

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const { mutate: sendImage } = useSendImageMessage();

  const onChangeText = useCallback((text: string) => {
    dispatch(setMessageInput(text));
  }, []);

  const handleCameraCapture = useCallback(
    (uri: string) => {
      sendImage({ uri, caption: "" });
    },
    [sendImage]
  );

  const actionSheetOptions = [
    {
      label: "Cámara",
      icon: "camera.fill",
      onPress: () => setShowCamera(true),
      disabled: false,
    },
    {
      label: "Fototeca",
      icon: "photo.fill",
      onPress: () => {},
      disabled: true,
    },
    {
      label: "Archivo",
      icon: "doc.fill",
      onPress: () => {},
      disabled: true,
    },
    {
      label: "Audio",
      icon: "mic.fill",
      onPress: () => {},
      disabled: true,
    },
  ];

  return (
    <ThemedView
      style={[styles.footerContainer, { paddingBottom: insets.bottom }]}
    >
      <TouchableOpacity
        style={styles.attachButton}
        onPress={() => setShowActionSheet(true)}
      >
        <Icon name="plus.circle.fill" size={28} color="#007AFF" />
      </TouchableOpacity>

      <TextInput
        style={styles.textInput}
        value={message}
        onChangeText={onChangeText}
        placeholder="Escribe un mensaje..."
        multiline
        numberOfLines={4}
        maxLength={1000}
        textAlignVertical="top"
        scrollEnabled={true}
      />

      <Send />

      <ActionSheet
        visible={showActionSheet}
        onClose={() => setShowActionSheet(false)}
        options={actionSheetOptions}
        title="Adjuntar"
      />

      <CameraView
        visible={showCamera}
        onClose={() => setShowCamera(false)}
        onCapture={handleCameraCapture}
      />
    </ThemedView>
  );
}

export default React.memo(Footer);

const styles = StyleSheet.create({
  footerContainer: {
    borderTopWidth: 1,
    flexDirection: "row",
    width: "100%",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 70,
  },
  attachButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
  },
  textInput: {
    borderWidth: 1,
    flex: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 16,
    lineHeight: 22,
    backgroundColor: "#fff",
    minHeight: 44,
    maxHeight: 110,
    textAlignVertical: "top",
  },
});
