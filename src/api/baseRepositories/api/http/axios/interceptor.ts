import { StorageService } from "../../../../../utils/storage";

export const authInterceptor = async (config: any) => {
  if (!config || !config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
  }

  const token = await StorageService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
