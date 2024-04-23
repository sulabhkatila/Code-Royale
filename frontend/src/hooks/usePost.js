import { useState, useEffect } from "react";

const usePost = (url, body, authorization) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            ...(authorization && { "Authorization": `Bearer ${authorization}` }),
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
  }, [url, body]);

  return { data, loading, error };
};

export default usePost;
