import { useEffect, useState } from "react"

export function useFetch(url) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch(url, {
        headers: {
          Accept: "application/json; charset=UTF-8"
           }
      })
        .then((r) => r.json() )
        .then((data) => {
          setData(data.results);
        })
        .catch((e) => {
          setError(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [url]);
  
    return {
      data,
      loading,
      error,
      setData
    };
  }
  
