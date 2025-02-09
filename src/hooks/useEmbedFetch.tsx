import { useState } from "react";
import { API_URL } from "../constants";

/**
 * Hook that returns an object with utils to fetch towards the API
 */
function useEmbedFetch() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Could be separated from the API URL so it can accept any url
  // But in this case we only have one source so it's not that useful
  const fetchEmbed = async (link: string) => {
    const url = `${API_URL}?url=${link}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      const result = await response.json();

      setLoading(false);
      return result;
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return { fetchEmbed, error, loading };
}

export default useEmbedFetch;
