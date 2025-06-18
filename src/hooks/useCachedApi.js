import { useState, useEffect } from "react";

function useCachedApi(cacheKey, apiCallFunction, expiry = 60 * 60 * 1000) { // default: 1 hour
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unmounted = false;

    const fetchData = async () => {
      try {
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const parsed = JSON.parse(cached);
          const now = Date.now();

          if (now - parsed.timestamp < expiry) {
            setData(parsed.data);
            setLoading(false);
            return;
          }
        }

        const freshData = await apiCallFunction();

        if (!unmounted) {
          setData(freshData);
          setLoading(false);

          localStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), data: freshData })
          );
        }
      } catch (err) {
        if (!unmounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => { unmounted = true; };
  }, [cacheKey, apiCallFunction, expiry]);

  return { data, loading, error };
}

export default useCachedApi;
