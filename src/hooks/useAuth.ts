import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import AuthService from "../api/domain/auth/auth.service";
import { LoginRequest } from "../api/domain/auth/auth.types";
import { StorageService } from "../utils/storage";

const authService = new AuthService();

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await authService.login(credentials);
      await StorageService.saveToken(response.token);
      await StorageService.saveUsername(response.user.username);
      return response;
    },
  });
};

export const useLogout = () => {
  const logout = useCallback(async () => {
    await StorageService.clearAll();
  }, []);

  return { logout };
};

export const useCheckAuth = () => {
  const checkAuth = useCallback(async () => {
    const token = await StorageService.getToken();
    const username = await StorageService.getUsername();
    return { token, username, isAuthenticated: !!token };
  }, []);

  return { checkAuth };
};
