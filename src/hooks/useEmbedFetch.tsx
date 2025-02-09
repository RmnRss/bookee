import { useState } from "react";
import { API_URL } from "../constants";

const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Hook that returns an object with utils to fetch towards the API
 * We could create two hooks, one with the basic fetch logic and another using the API URL
 * But in this case it's kinda over doing it
 */
function useEmbedFetch() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEmbed = async (link: string) => {
    const params = new URLSearchParams({ url: link });
    const url = new URL(`/embed?${params.toString()}`, API_URL);

    try {
      const response = await fetch(url, { method: "GET", headers });

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
