import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const DetailsCard = () => {
  const movieData = useLoaderData();
  const { _id, poster, title, genre, duration, year, rate, summary, favorite } =
    movieData;

  return (
    <div className="card bg-base-100 w-96 shadow-xl mx-auto my-8">
      <h1 className="text-center font-bold text-3xl py-7">Movie Details</h1>
      <figure className="w-full">
        <img className="w-full  object-cover" src={`${poster}`} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}!
          <div className="badge badge-secondary">
            Rating: <span>{rate}*</span>
          </div>
        </h2>
        <div>
          <h1>Duration : {duration} Min</h1>
          <h1>Release Year : {year}</h1>
        </div>

        <div className="card-actions justify-end">
          {genre.map((gen, index) => (
            <div key={index} className="badge badge-outline">
              {gen.value}
            </div>
          ))}
        </div>

        <div className="card-actions justify-start">
          <h1>{summary}</h1>
        </div>
      </div>
      <div className="card-actions justify-center">
        <Link to={"/all-movie"} className="btn btn-primary w-full">See All Movies</Link>
      </div>
    </div>
  );
};

export default DetailsCard;
