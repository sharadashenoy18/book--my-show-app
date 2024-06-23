import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieLayoutHoc from "../layout/Movie.layout";
import axios from "axios";

const MoviePage = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const requestCast = async () => {
      try {
        const getCast = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7d70deb4741f16bc8c16ab5d66409eb3`
        );
        setCast(getCast.data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };
    requestCast();
  }, [id]);

  useEffect(() => {
    const requestSimilarMovies = async () => {
      try {
        const getSimilarMovies = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=7d70deb4741f16bc8c16ab5d66409eb3`
        );
        setSimilarMovies(getSimilarMovies.data.results);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };
    requestSimilarMovies();
  }, [id]);

  return (
    <div>
      <h1>MoviePage</h1>
      <section>
        <h2>Cast</h2>
        {cast && cast.length > 0 ? (
          <ul>
            {cast.map((member) => (
              <li key={member.id}>
                {member.name} as {member.character}
              </li>
            ))}
          </ul>
        ) : (
          <p>No cast information available.</p>
        )}
      </section>
      <section>
        <h2>Similar Movies</h2>
        {similarMovies && similarMovies.length > 0 ? (
          <ul>
            {similarMovies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        ) : (
          <p>No similar movies available.</p>
        )}
      </section>
    </div>
  );
};

export default MovieLayoutHoc(MoviePage);
