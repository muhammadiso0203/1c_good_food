const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export const setAuthSession = (username: string, token: string) => {
  try {
    localStorage.setItem(AUTH_USER_KEY, username);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error("Error setting auth session:", error);
  }
};

export const checkAuth = (): boolean => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return !!token;
  } catch (error) {
    console.error("Error checking auth:", error);
    return false;
  }
};

export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const getAuthUser = (): string | null => {
  try {
    return localStorage.getItem(AUTH_USER_KEY);
  } catch {
    return null;
  }
};

export const clearAuthSession = () => {
  try {
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error("Error clearing auth session:", error);
  }
};
