import { BACKEND_API } from "../constants";

interface HandleRegistrationProps {
  username: string;
  password: string;
}

export const handleRegistration = async ({
  username,
  password,
}: HandleRegistrationProps) => {
  try {
    // API call to your backend registration route
    const response = await fetch(`${BACKEND_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.status === 400) {
      alert(data.detail);
    }
    if (response.status === 200) {
      alert(`Successfully Registered: ${data.username}`);
    }
    return data;
  } catch (error) {
    console.error(error);
    // Handle network errors or show a generic error message
    alert(`Error: An error occurred during registration.`);
    return {};
  }
};

interface HandleLoginProps {
  username: string;
  password: string;
}

export const getUserInfo = async () => {
  try {
    const response = await fetch(`${BACKEND_API}/auth/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert("Error, An error occurred getting your user info.");
    return error;
  }
};

export const handleLogin = async ({ username, password }: HandleLoginProps) => {
  try {
    const response = await fetch(`${BACKEND_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: `username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
    });

    const data = await response.json();
    return { access_token: data.access_token || null, detail: data.detail };
  } catch (error) {
    console.error(error);
    alert(
      "Error, An error occurred during login. Please contact your administrator."
    );
    return { access_token: null, detail: error };
  }
};

export const handleLogout = async () => {
  try {
    const response = await fetch(`${BACKEND_API}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert("Error, An error occurred during login.");
  }
};
