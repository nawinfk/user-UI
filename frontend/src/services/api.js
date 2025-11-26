// Use environment variable OR fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthService = {
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Login failed");
    return data;
  },

  register: async (fullName, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Registration failed");
    return data;
  },
};

export const DataService = {
  getStats: async (token) => {
    // REFACTOR: Safety check
    if (!token) throw new Error("No authentication token found");

    const res = await fetch(`${API_URL}/dashboard/stats`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!res.ok) {
       // Optional: Handle 401 Unauthorized globally here
       if (res.status === 401) {
         localStorage.removeItem('token');
         window.location.href = '/'; // Force logout
       }
       throw new Error("Failed to fetch stats");
    }

    return await res.json();
  },
};