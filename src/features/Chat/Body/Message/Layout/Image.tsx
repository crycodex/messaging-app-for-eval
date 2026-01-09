import { Image as ExpoImage } from "expo-image";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { config } from "../../../../../api/config";
import { Text } from "../../../../../components/Text/Text";
import { getChatEventPropertyById } from "../../../../../redux/chat/chat.selector";
import { useAppSelector } from "../../../../../redux/hooks";
import { useMessageContext } from "../Provider";

function ImageLayout() {
  const { id } = useMessageContext();

  const imageUrl = useAppSelector(getChatEventPropertyById(id, "imageUrl"));
  const text = useAppSelector(getChatEventPropertyById(id, "text"));

  const fullImageUrl = imageUrl
    ? `${config.apiUrl.replace("/api", "")}${imageUrl}`
    : "";

  return (
    <View style={styles.container}>
      {fullImageUrl ? (
        <ExpoImage
          source={{ uri: fullImageUrl }}
          style={styles.image}
          contentFit="cover"
          placeholderContentFit="cover"
        />
      ) : (
        <View style={styles.placeholder}>
          <ActivityIndicator />
        </View>
      )}

      {text && <Text style={styles.caption}>{text}</Text>}
    </View>
  );
}

export default React.memo(ImageLayout);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  placeholder: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  caption: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
});
