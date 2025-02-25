import React, { useEffect, useState } from "react";
import axios from "axios";

// Layout HOC
import DefaultLayoutHoc from "../layout/Default.layout";

// Components
import HeroCarousel from "../components/HeroCarousel/HeroCarousel.Component";
import PosterSlider from "../components/PosterSlider/PosterSlider.Component";
import EntertainmentCardSlider from "../components/Entertainment/EntertainmentCard.Component";

const HomePage = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [premierMovies, setPremierMovies] = useState([]);
  const [onlineStreamEvents, setOnlineStreamEvents] = useState([]);

  useEffect(() => {
    const requestTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=7d70deb4741f16bc8c16ab5d66409eb3"
        );
        setRecommendedMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };
    requestTopRatedMovies();
  }, []);

  useEffect(() => {
    const requestPopularMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=7d70deb4741f16bc8c16ab5d66409eb3"
        );
        setPremierMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    requestPopularMovies();
  }, []);

  useEffect(() => {
    const requestUpcomingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=7d70deb4741f16bc8c16ab5d66409eb3"
        );
        setOnlineStreamEvents(response.data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };
    requestUpcomingMovies();
  }, []);

  return (
    <>
      <HeroCarousel />

      <div className="container mx-auto px-4 md:px-12 my-8">
        <h1 className="text-2xl font-bold text-gray-800 sm:ml-3 ml-0 my-3">
          The best of Entertainment
        </h1>
        <EntertainmentCardSlider />
      </div>

      <div className="container mx-auto px-4 md:px-12 my-8">
        <PosterSlider
          title="Recommended Movies"
          subtitle="List of recommended movies"
          posters={recommendedMovies}
          isDark={false}
        />
      </div>

      <div className="bg-premier-800 py-12">
        <div className="container mx-auto px-4 md:px-12 my-8 flex flex-col gap-3">
          <div className="hidden md:flex">
            <img src="" alt="Rupay" className="w-full h-full" />
          </div>
          <PosterSlider
            title="Premiers"
            subtitle="Brand new releases every Friday"
            posters={premierMovies}
            isDark={true}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 my-8">
        <PosterSlider
          title="Online Streaming Events"
          subtitle="Online Stream Events"
          posters={onlineStreamEvents}
          isDark={false}
        />
      </div>
    </>
  );
};
export default DefaultLayoutHoc(HomePage);
