import { useState } from "react";
import Box from "./components/Box";
import Layout from "./components/layout";
import ListMovies from "./components/ListMovies";
import MoviesDetails from "./components/MoviesDetails";
import Navbar from "./components/Navbar";
import { Err, Loading } from "./components/Static";
import WatchedMovies from "./components/WatchedMovies";
import WatchedSummary from "./components/WatchedSummary";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { MovieDetails } from "./schema";

function App() {
  const [query, setQuery] = useState("");
  const { error, isLoading, movies } = useFetchMovies(query);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [watched, setWatched] = useLocalStorageState(
    [],
    "watchedMovies",
  );
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
