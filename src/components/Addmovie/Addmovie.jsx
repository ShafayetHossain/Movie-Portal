import React, { useContext, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { ContextProvider } from "../../Provider/Provider";
import CreatableSelect from "react-select/creatable";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Addmovie = () => {
  const { notifyError, userAcount } = useContext(ContextProvider);
  const [rating, setRating] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const options = [
    { value: "action", label: "Action" },
    { value: "drama", label: "Drama" },
    { value: "romantic", label: "Romantic" },
    { value: "horror", label: "Horror" },
    { value: "science fiction", label: "Science fiction" },
    { value: "thriller", label: "Thriller" },
    { value: "comedy", label: "Comedy" },
    { value: "animation", label: "Animation" },
    { value: "crime film", label: "Crime film" },
  ];
  const handleRating = (rate) => {
    setRating(rate);
  };

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      notifyError("Invalid URL. Please enter a valid link.");
      return false;
    }
  };

  const validateTitle = (title) => {
    if (title.trim().length >= 2) {
      return true;
    } else {
      notifyError("Title must be at least 2 characters.");
      return false;
    }
  };

  const validateDuration = (duration) => {
    if (!isNaN(duration) && duration > 60) {
      return true;
    } else {
      notifyError("Duration must be a number and greater than 60 minutes.");
      return false;
    }
  };

  const handleMovie = (event) => {
    event.preventDefault();
    const form = event.target;

    const poster = form.poster.value;
    const title = form.title.value;
    const genre = selectedOption;
    const duration = form.duration.value;
    const year = form.year.value;
    const rate = rating;
    const summary = form.summary.value;
    const email = userAcount.email;
    const favorite = false;

    const newMovie = {
      poster,
      title,
      genre,
      duration,
      year,
      rate,
      summary,
      email,
      favorite,
    };

    if (
      validateURL(poster) &&
      validateTitle(title) &&
      validateDuration(duration)
    ) {
      fetch("http://localhost:3000/movie", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(newMovie),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            Swal.fire({
              title: "Good job!",
              text: "Movie Insert Successfully!",
              icon: "success",
            }).then(() => navigate("/"));
          }
        });
    }
  };

  return (
    <div className="bg-[#F4F3F0]">
      <div className="p-5 w-10/12 mx-auto">
        <form onSubmit={handleMovie} action="" method="post" className="">
          <div className="flex justify-center items-center py-4 gap-x-2">
            <div className="w-full flex flex-col justify-center items-center">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-[#374151] font-semibold text-xl">
                    Movie Poster
                  </span>
                </div>
                <input
                  type="text"
                  name="poster"
                  placeholder="Enter Poster Url"
                  className="input input-bordered w-full bg-white"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-[#374151] font-semibold text-xl">
                    Movie Title
                  </span>
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Movie Title"
                  className="input input-bordered w-full bg-white"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-[#374151] font-semibold text-xl">
                    Genre
                  </span>
                </div>
                <CreatableSelect
                  required
                  isMulti
                  value={selectedOption} // Use "value" instead of "defaultValue" for controlled components
                  onChange={setSelectedOption}
                  options={options}
                />
              </label>

              <label className="form-control w-full py-2">
                <div className="label">
                  <span className="label-text text-[#374151] font-semibold text-xl">
                    Duration
                  </span>
                </div>
                <input
                  type="text"
                  name="duration"
                  placeholder="Enter Movie Duration"
                  className="input input-bordered w-full bg-white"
                />
              </label>
            </div>

            <div className="w-full flex flex-col justify-center items-center">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text text-[#374151] font-semibold text-xl">
                    Release Year
                  </span>
                </div>
                <input
                  type="date"
                  name="year"
                  placeholder="Enter Release Year"
                  className="input input-bordered w-full bg-white"
                />
              </label>

              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text text-[#374151] font-semibold text-xl">
                    Rating
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  {/* Rating container with a fixed height */}
                  <div className="h-[8rem] w-auto flex items-center">
                    <div className="flex flex-col-reverse rotate-90">
                      <Rating onClick={handleRating} />
                    </div>
                  </div>
                  {/* Display selected rating */}
                  <p className=" text-lg font-semibold">
                    Selected Rating: {rating}
                  </p>
                </div>
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-[#374151] font-semibold text-xl">
                    Summary
                  </span>
                </div>
                <input
                  type="text"
                  name="summary"
                  placeholder="Enter Movie Summary "
                  className="input input-bordered w-full bg-white"
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="rancho-font bg-[#D2B48C] text-[#331A15] px-4 py-2 text-2xl flex justify-center items-center w-full rounded-xl"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addmovie;
