import { z } from "zod";

export const moviesSchema = z.object({
  Search: z.array(
    z.object({
      Title: z.string(),
      Year: z.string(),
      imdbID: z.string(),
      Type: z.string(),
      Poster: z.string(),
    }),
  ),
});

export type Movies = z.infer<typeof moviesSchema>;

export const movieDetailsSchema = z.object({
  imdbID: z.string(),
  Title: z.string(),
  Year: z.string().transform((value) => parseInt(value, 10)), // Convert year to number
  Poster: z.string().url(), // Validate as a URL
  Runtime: z
    .string()
    .transform((value) => parseInt(value.split(" ")[0], 10)), // Extract minutes from runtime
  imdbRating: z.string().transform((value) => parseFloat(value)), // Convert imdb rating to number
  Plot: z.string(),
  Released: z.string(), // Convert release date to Date object
  Actors: z.string(),
  Director: z.string(),
  Genre: z.string(),
});

export type MovieDetails = z.infer<typeof movieDetailsSchema>;
