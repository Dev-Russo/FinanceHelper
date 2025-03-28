export const login = async (username, password) => {
  try {
    const response = await fetch("https://localhost:7219/api/Usuario/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer login");
    }

    const data = await response.json();
    return data; // Retorna apenas os dados, sem manipulação extra
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
};

export const saveTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const getToken = () => localStorage.getItem("token");
export const getRefreshToken = () => localStorage.getItem("refreshToken");