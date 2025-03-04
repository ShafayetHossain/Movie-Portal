import React, { useContext, useEffect } from "react";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import { ContextProvider } from "../../Provider/Provider";

const Favorite = () => {

   const { movies, setMovies,userAcount } = useContext(ContextProvider);
     useEffect(() => {
       fetch(`http://localhost:3000/movie?searchEmail=${userAcount?.email}`)
         .then((res) => res.json())
         .then((result) => setMovies(result));
     }, [userAcount?.email]);


  return (
    <div className="w-11/12 mx-auto">
      <h1 className="font-bold text-2xl text-center">Favorite Movies</h1>
      <div className="flex flex-wrap gap-10 py-8">
        {movies.map((movie) => (
          movie.favorite?<FavoriteCard key={movie._id} movie={movie}></FavoriteCard> : ""
        ))}
      </div>
    </div>
  );
};

export default Favorite;
