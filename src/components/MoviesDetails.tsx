import { useEffect, useState } from "react";
import { KEY } from "../constants";
import { movieDetailsSchema, type MovieDetails } from "../schema";
import { Loading } from "./Static";

type MoviesDetailsProps = {
  selectedId: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  onAddWatched: (movie: MovieDetails) => void;
};

function MoviesDetails({
  selectedId,
  onClose,
  onAddWatched,
}: MoviesDetailsProps) {
  const [movie, setMovie] = useState<MovieDetails | {}>({});
  const [isLoading, setIsLoading] = useState(true);

  function handleAddWatch() {
    const movieDetails = movie as MovieDetails;
    onAddWatched(movieDetails);
    onClose();
  }
  useEffect(
    function () {
      function handleCallback(e: KeyboardEvent) {
        if (e.code === "Escape") {
          onClose();
        }
      }

      document.addEventListener("keydown", handleCallback);

      return function () {
        document.removeEventListener("keydown", handleCallback);
      };
    },
    [onClose],
  );
  useEffect(
    function () {
      async function fetchMovie() {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?i=${selectedId}&apikey=${KEY}`,
          );

          if (!response.ok) {
            throw new Error(
              JSON.stringify("failed to fetch details"),
            );
          }

          const data = await response.json();
          const validateData = movieDetailsSchema.safeParse(data);

          if (!validateData.success) {
            throw new Error(JSON.stringify("Invalid data"));
          }

          setMovie(validateData.data);
        } catch (err: any) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovie();
    },
    [selectedId],
  );

  useEffect(
    function () {
      if (!movie?.Title) return;
      document.title = `usePopcorn | ${movie?.Title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [movie?.Title],
  );

  return (
    <div className="flex flex-col items-start w-full h-full">
      <button
        className="btn btn-circle uppercase text-2xl place-self-end"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col flex-1 w-full gap-10 items-center">
          <header className="flex items-center justify-start p-1 shadow-md bg-base-100 w-full h-1/3">
            <img
              src={movie?.Poster}
              height={100}
              width={100}
              className="m-0 object-cover rounded-sm"
            />
            <div className="flex gap-2 flex-col">
              <p>{movie?.Title}</p>
              <p>
                {movie?.Released}
                <span className="ml-2"> {movie?.Runtime}min</span>
              </p>
              <p>{movie?.Genre}</p>
              <p>⭐️ {movie?.imdbRating} IMDb rating</p>
            </div>
          </header>

          <button
            onClick={handleAddWatch}
            className="btn btn-wide btn-outline"
          >
            Add to List
          </button>

          <div className="flex flex-1 flex-col gap-7 items-start">
            <p className="font-medium">{movie?.Plot}</p>
            <p className="font-medium">{movie?.Actors}</p>
            <p className="font-medium">
              Directed by {movie?.Director}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoviesDetails;
