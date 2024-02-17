import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSubmit = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (problem, language, solution) => {
    setLoading(true);
    setError(null);

    // Don't allow anonymous submissions
    if (!user) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/problem/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem, language, solution }),
      });

      if (response.status !== 200) {
        const data = await response.json();
        setError(data.error ? data.error : data.message);
      } else {
        const data = await response.json();
        setData(data);
      }
    } catch (err) {
      if (err.error) {
        console.log('the err.error is ', err.error)
      }
      setError(err.error ? err.error : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submit, data, loading, error };
};
