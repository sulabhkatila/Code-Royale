import { usePost } from "./usePost";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export default function useRegister() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useAuthContext();

  const register = async (username, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
    }
    setLoading(false);
  };
  return { register, loading, error };
}
