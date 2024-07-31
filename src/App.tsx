import { useEffect, useState } from "react";
import Box from "./components/Box";
import Layout from "./components/layout";
import ListMovies from "./components/ListMovies";
import MoviesDetails from "./components/MoviesDetails";
import Navbar from "./components/Navbar";
import { Err, Loading } from "./components/Static";
import WatchedMovies from "./components/WatchedMovies";
import WatchedSummary from "./components/WatchedSummary";
import { KEY } from "./constants";
import { MovieDetails, moviesSchema, type Movies } from "./schema";

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movies["Search"] | []>([]);
  const [watched, setWatched] = useState<MovieDetails[] | []>(() => {
    const watched = localStorage.getItem("watched");
    console.log("Initial watched", watched);
    if (watched) {
      return JSON.parse(watched);
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  function handleSelectedMovie(id: string) {
    setSelectedId(id);
  }

  function handleResetSelectedMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: MovieDetails) {
    setWatched((prev) => {
      const isMovieAlreadyWatched = prev.some(
        (m) => m.Title === movie.Title,
      );
      if (isMovieAlreadyWatched) {
        return prev;
      }
      return [...prev, movie];
    });
  }

  function handleDeleteWatched(id: string) {
    setWatched((prev) => {
      return prev.filter((m) => m.imdbID !== id);
    });
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

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

  return (
    <div className="py-8">
      <Navbar
        query={query}
        setQuery={setQuery}
        count={movies.length}
      />
      <Layout>
        <Box shouldButtonBeVisible={true}>
          {isLoading && <Loading />}
          {error && <Err message={error} />}
          {!error && !isLoading && (
            <ListMovies
              movies={movies}
              onMovieClick={handleSelectedMovie}
            />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MoviesDetails
              setLoading={setIsLoading}
              setError={setError}
              onClose={handleResetSelectedMovie}
              selectedId={selectedId}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watchedMovies={watched} />
              <WatchedMovies
                watchedMovies={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Layout>
    </div>
  );
}

export default App;
