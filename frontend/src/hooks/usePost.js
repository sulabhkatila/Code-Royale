import { useEffect, useState } from "react";

export const usePost = (url, body, user) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authorization = user ? user.token : null;
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      if (Object.keys(body).length !== 0) {
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: {
              ...(authorization && {
                Authorization: `Bearer ${authorization}`,
              }),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            signal,
          });

          if (!res.ok) {
            setError("Failed to fetch");
            return;
          }

          const json = await res.json();
          console.log("the email was sent ", json)
          setData(json);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, body, user]);

  return { data, loading, error };
};
