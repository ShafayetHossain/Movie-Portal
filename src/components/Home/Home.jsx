import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../Provider/Provider";
import Banner from "../Banner/Banner";
import MovieCard from "../MovieCard/MovieCard";

const Home = () => {
  const { movies, setMovies, userAcount } = useContext(ContextProvider);
  useEffect(() => {
    fetch(`https://movie-portal-server-nine-orcin.vercel.app/movie?searchEmail=${userAcount?.email}`)
      .then((res) => res.json())
      .then((result) => setMovies(result));
  }, [userAcount?.email]);
  return (
    <div>
      <Banner></Banner>
      <div className="w-11/12 mx-auto">
        <h1 className="font-bold text-2xl">Featured Movies</h1>
        <div className="flex flex-wrap gap-10 py-8">
          {movies.slice(0, 6).map((movie) => (
            <MovieCard key={movie._id} movie={movie}></MovieCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
