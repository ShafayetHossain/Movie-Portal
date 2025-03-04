import React from "react";

const FavoriteCard = ({movie}) => {
  const { _id, poster, title, genre, duration, year, rate, summary, favorite } =
    movie;
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="w-full">
        <img
          className="w-full max-h-60 object-cover"
          src={`${poster}`}
          alt={title}
        />
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
      
    </div>
  );
};

export default FavoriteCard;
