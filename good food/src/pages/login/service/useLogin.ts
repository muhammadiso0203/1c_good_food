import { useMutation } from "@tanstack/react-query";
import api from "@/config/config";
import { encodeBase64 } from "@/lib/auth";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserResponse {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: Record<string, unknown> | null;
}

export const useLogin = () => {
  return useMutation<UserResponse, Error, LoginCredentials>({
    mutationFn: async ({ username, password }) => {
      // console.log(api.defaults.baseURL);
      const token = encodeBase64(`${username}:${password}`);
      const response = await api.post<UserResponse>(
        "/dashboard/user",
        {},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      return response.data;
    },
  });
};

