import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@chatter_auth_token";
const USERNAME_KEY = "@chatter_username";

export const StorageService = {
  async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving token:", error);
      throw error;
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing token:", error);
      throw error;
    }
  },

  async saveUsername(username: string): Promise<void> {
    try {
      await AsyncStorage.setItem(USERNAME_KEY, username);
    } catch (error) {
      console.error("Error saving username:", error);
      throw error;
    }
  },

  async getUsername(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(USERNAME_KEY);
    } catch (error) {
      console.error("Error getting username:", error);
      return null;
    }
  },

  async removeUsername(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USERNAME_KEY);
    } catch (error) {
      console.error("Error removing username:", error);
      throw error;
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, USERNAME_KEY]);
    } catch (error) {
      console.error("Error clearing storage:", error);
      throw error;
    }
  },
};
