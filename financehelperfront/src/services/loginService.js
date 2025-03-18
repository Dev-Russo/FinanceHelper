import axios from "axios";

const API_URL = "https://localhost:7219/api/Usuario/login";

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
  
      return await response.json(); // ✅ Retorna a resposta corretamente
    } catch (error) {
      console.error("Erro no login:", error);
      throw error; // ❌ Se não lançar, `response` pode ser undefined
    }
  };

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");