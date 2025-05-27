import * as usersAPI from "./users-api";

export async function signUp(userData) {
  try {
    const response = await usersAPI.signUp(userData);
    const { user, token } = response;

    localStorage.setItem("token", token);
    console.log("Token stored:", token);

    localStorage.setItem("user", JSON.stringify(user));

    return getUser();
  } catch (error) {
    console.error("Sign-up failed:", error);
    throw error;
  }
}

export async function login(userData) {
  try {
    const { user, token } = await usersAPI.login(userData);
    localStorage.setItem("token", String(token));
    localStorage.setItem("user", JSON.stringify(user));
    return { user, token };
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export function logOut() {
  localStorage.removeItem("token");
}

export function getToken() {
  const token = String(localStorage.getItem("token"));

  if (!token) return null;

  try {
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      throw new Error("Invalid token format: Token does not have 3 parts");
    }

    const payload = JSON.parse(atob(tokenParts[1]));

    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid token format: Payload is not a valid object");
    }

    if (!payload.user) {
      throw new Error("Invalid token format: User data is missing");
    }

    return token;
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export async function checkToken() {
  return await usersAPI.checkToken().then((dateStr) => new Date(dateStr));
}
