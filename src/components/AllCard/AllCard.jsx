import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  MdDelete,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ContextProvider } from "../../Provider/Provider";

const AllCard = ({ movie }) => {
  const { movies, setMovies, notifySuccess, notifyWarning } =
    useContext(ContextProvider);
  const { _id, poster, title, genre, duration, year, rate, summary, favorite } =
    movie;
  const [isFavorite, setIsFavorite] = useState(favorite || false);

  const handleFavorite = (id) => {
    !isFavorite
      ? notifySuccess("Add to Favorite")
      : notifyWarning("Remove From Favorite");

    const updateFavorite = { favorite: !isFavorite };
    fetch(`http://localhost:3000/favoritemovie/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFavorite),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          setIsFavorite(!isFavorite);
        }
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/movie/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              }).then(() => {
                const remaining = movies.filter((movie) => movie._id != id);
                setMovies(remaining);
              });
            }
          });
      }
    });
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl mx-auto my-8">
      <figure className="w-full">
        <img
          className="w-full max-h-60  object-cover"
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

      <div className="card-actions justify-evenly pb-8">
        <button onClick={() => handleDelete(_id)} className="btn">
          <MdDelete className="text-red-500" size={25} />
        </button>
        <Link to={`/edit-movie/${_id}`} className="btn">
          <FaEdit className="text-yellow-500" size={25} />
        </Link>
        <button onClick={() => handleFavorite(_id)} className="btn">
          {isFavorite ? (
            <MdOutlineFavoriteBorder className="text-red-500" size={25} />
          ) : (
            <MdOutlineFavorite className=" text-white" size={25} />
          )}
        </button>
      </div>
    </div>
  );
};

export default AllCard;
