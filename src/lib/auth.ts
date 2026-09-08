const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

/**
 * UTF-8 safe Base64 encoder for Cyrillic and other Unicode characters
 */
export const encodeBase64 = (str: string): string => {
  try {
    const bytes = new TextEncoder().encode(str);
    const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
    return btoa(binString);
  } catch {
    return btoa(unescape(encodeURIComponent(str)));
  }
};

/**
 * UTF-8 safe Base64 decoder for Cyrillic and other Unicode characters
 */
export const decodeBase64 = (base64Str: string): string => {
  try {
    const binString = atob(base64Str);
    const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return decodeURIComponent(escape(atob(base64Str)));
  }
};

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
    localStorage.removeItem("selected_date_range");
    localStorage.removeItem("selected_branch");
  } catch (error) {
    console.error("Error clearing auth session:", error);
  }
};


