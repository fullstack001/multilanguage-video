// lib/token.ts

export const setToken = (token: string, expiresIn: number = 10800) => {
  const expirationTime = Date.now() + expiresIn * 1000; // Expires in seconds
  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiration", expirationTime.toString());
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("tokenExpiration");

  if (!token || !expirationTime) {
    return null;
  }

  if (Date.now() > Number(expirationTime)) {
    // Token expired
    removeToken();
    return null;
  }

  return token;
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiration");
};
