import React, { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../Provider/Provider";
import AllCard from "../AllCard/AllCard";

const AllMovie = () => {
  const { movies, setMovies, userAcount } = useContext(ContextProvider);

  useEffect(() => {
    fetch(`https://movie-portal-server-nine-orcin.vercel.app/movie?searchEmail=${userAcount?.email}`)
      .then((res) => res.json())
      .then((result) => setMovies(result));
  }, [userAcount?.email]);

  const handleSearch = (event) => {
    let search = event.target.value;
    fetch(
      `https://movie-portal-server-nine-orcin.vercel.app/movie?searchEmail=${userAcount?.email}&&searchMovie=${search}`
    )
      .then((res) => res.json())
      .then((result) => setMovies(result));
  };

  return (
    <div>
      <div className="w-11/12 mx-auto">
        <h1 className="text-center font-bold text-3xl py-7">All Movie</h1>
        <div className="join flex justify-center items-center">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search Movie With Title"
            className="input input-bordered input-info w-full max-w-xs"
          />
        </div>
        <div className="flex flex-wrap gap-10 py-8">
          {movies.map((movie) => (
            <AllCard key={movie._id} movie={movie}></AllCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovie;
