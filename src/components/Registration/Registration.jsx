import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextProvider } from "../../Provider/Provider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {
  const { createUser, updateUser, notifySuccess, notifyError } =
    useContext(ContextProvider);
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(true);

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (hasUppercase && hasLowercase && isValidLength) {
      return true;
    } else {
      notifyError(
        "Password must have at least 6 characters, including an uppercase and a lowercase letter ❌"
      );
      return false;
    }
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if(validatePassword(password)){

      createUser(email, password)
        .then((res) => {
          updateUser(name, photo);
          notifySuccess("User Create Successfully!");
  
          navigate("/");
        })
        .catch((error) => {
          notifyError(`${error.message}!`);
        });
    }
    else{
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <div className="w-full max-w-md p-6 bg-slate-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Register your account
        </h2>
        <form onSubmit={handleRegistration}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="Name"
            >
              Your Name
            </label>
            <input
              required
              name="name"
              type="text"
              id="Name"
              placeholder="Enter your name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="Photo"
            >
              Photo URL
            </label>
            <input
              required
              name="photo"
              type="text"
              id="Photo"
              placeholder="Enter your photo Url"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              required
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:outline-none"
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              name="password"
              type={viewPassword ? "password" : "text"}
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setViewPassword(!viewPassword)}
              className="absolute right-4 bottom-3"
            >
              {viewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none"
          >
            SignUp
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already Have An Account?{" "}
          <Link to="/sign-in" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
