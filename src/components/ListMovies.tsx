import { type Movies } from "../schema";

type ListMoviesProps = {
  movies: Movies["Search"];
  onMovieClick: (selectedId: string) => void;
};

function ListMovies({ movies, onMovieClick }: ListMoviesProps) {
  return (
    <ul className="space-y-4">
      {movies.map((movie) => (
        <li
          onClick={() => onMovieClick(movie.imdbID)}
          key={movie.imdbID}
          className="flex items-center justify-start gap-4 border-b-2 border-base-100 p-2 cursor-pointer hover:bg-base-100 transition-colors"
        >
          <img
            src={movie.Poster}
            alt="Movies Poster"
            className="rounded-sm m-0 w-10 h-16
            object-cover"
          />
          <div className="m-0">
            <h3 className="text-lg font-medium">{movie.Title}</h3>
            <p className="text-muted-foreground">{movie.Year}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListMovies;
