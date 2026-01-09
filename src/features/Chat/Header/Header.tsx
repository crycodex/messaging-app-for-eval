import { router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Socket } from "../../../api/sockets/Sockets";
import { Icon } from "../../../components/Icon/Icon";
import { ThemedView } from "../../../components/ThemedView/ThemedView";
import { Color } from "../../../constants/colors";
import { useLogout } from "../../../hooks/useAuth";
import { useAppDispatch } from "../../../redux/hooks";
import { resetStore } from "../../../redux/store";
import Avatar from "./Avatar";
import Data from "./Data";

function Header() {
  const insets = useSafeAreaInsets();
  const { logout } = useLogout();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          await logout();
          await Socket.disconnect();
          dispatch(resetStore());
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <ThemedView
      style={[
        styles.headerContainer,
        { paddingTop: insets.top + 8, height: 80 + insets.top },
      ]}
    >
      <Avatar />

      <Data />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="rectangle.portrait.and.arrow.right" size={24} color="#fff" />
      </TouchableOpacity>
    </ThemedView>
  );
}

export default React.memo(Header);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    width: "100%",
    backgroundColor: Color.PRIMARY_500,
    height: 80,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logoutButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
