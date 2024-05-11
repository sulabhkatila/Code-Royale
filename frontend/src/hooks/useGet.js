import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useGet = (url, credentials = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        let res;

        if (credentials) {
          res = await fetch(url, {
            signal,
            headers: {
              "Authorization": `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          });
        } else {
          res = await fetch(url, { signal });
        }
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, user]);

  return { data, loading, error };
};
