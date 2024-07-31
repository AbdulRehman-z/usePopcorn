import { MovieDetails } from "../schema";

type WatchedMoviesProps = {
  watchedMovies: MovieDetails[];
  onDeleteWatched: (id: string) => void;
};

function WatchedMovies({
  watchedMovies,
  onDeleteWatched,
}: WatchedMoviesProps) {
  return (
    <ul className="mt-4">
      {watchedMovies.map((movie) => (
        <li
          key={movie.Title}
          className="flex items-center justify-between border-b-2  border-base-100 p-2 cursor-pointer hover:bg-base-100 transition-colors"
        >
          <div className="flex m-0 gap-8">
            <img
              src={movie.Poster}
              alt="Movies Poster"
              className="rounded-sm m-0 w-10 h-15
         object-cover"
            />
            <div className="m-0">
              <div>
                <h3 className="text-lg font-medium">{movie.Title}</h3>
              </div>
              <div className="flex gap-9">
                <p className="text-muted-foreground">
                  ⭐️ {movie.imdbRating}
                </p>
                <p className="text-muted-foreground">
                  ⌛️ {movie.Runtime}min
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => onDeleteWatched(movie.imdbID)}
            className="text-red-500 btn btn-circle btn-sm -mt-6"
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

export default WatchedMovies;
