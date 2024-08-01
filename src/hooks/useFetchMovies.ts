import { useEffect, useState } from "react";
import { KEY } from "../constants";
import { type Movies, moviesSchema } from "../schema";

export function useFetchMovies(query: string) {
  const [movies, setMovies] = useState<Movies["Search"] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
            { signal: controller.signal },
          );
          const data = await response.json();
          const validateData = moviesSchema.safeParse(data);
          if (!validateData.success) {
            throw new Error(JSON.stringify(validateData.error));
          }
          setMovies(data.Search);
        } catch (error: any) {
          if (error.name !== "AbortError") {
            console.error(error);

            setError(error.message);
          }
        } finally {
          setError("");
          setIsLoading(false);
        }
      }

      if (query.length <= 3) {
        setMovies([]);
        setError("");
        setIsLoading(false);
        return;
      }

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query],
  );
  return { movies, isLoading, error, setIsLoading, setError };
}
