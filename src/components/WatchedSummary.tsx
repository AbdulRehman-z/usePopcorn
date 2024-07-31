import { average } from "../constants";

type WatchedSummaryProps = {
  watchedMovies: any[];
};

function WatchedSummary({ watchedMovies }: WatchedSummaryProps) {
  const avgImdbRating = average(
    watchedMovies.map((movie) => movie.imdbRating),
  );
  const avgRuntime = average(
    watchedMovies.map((movie) => movie.runtime),
  );
  const avgUserRating = average(
    watchedMovies.map((movie) => movie.userRating),
  );

  return (
    <div className="card w-full shadow-md bg-base-100 rounded-sm">
      <div className="card-body flex flex-col gap-4">
        <h2 className="text-center text-2xl font-medium">
          Watched Summary
        </h2>
        <div className="grid grid-cols-4 gap-2">
          <div className="flex gap-1 items-center justify-center">
            <h3>🖥️</h3>
            <p className="font-semibold">{watchedMovies.length}</p>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h3>⭐️</h3>
            <p className="font-semibold">
              {avgImdbRating.toFixed(2)}
            </p>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h3>⌛️</h3>
            <p className="font-semibold">
              {avgRuntime.toFixed(2)} mins
            </p>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h3>🌟</h3>
            <p className="font-semibold">
              {avgUserRating.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchedSummary;
