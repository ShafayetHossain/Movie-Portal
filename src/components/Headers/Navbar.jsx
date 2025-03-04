import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextProvider } from "../../Provider/Provider";

const Navbar = () => {
  const { userAcount, signOutUser, notifySuccess, notifyError } =
    useContext(ContextProvider);

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        notifySuccess("Sign-out successful.");
        navigate("/");
      })
      .catch((error) => {
        notifyError(`${error.message}`);
      });
  };

  const links = (
    <>
      <li>
        <Link to={"/"}>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link to={"/all-movie"}>
          <a>All Movie</a>
        </Link>
      </li>
      <li>
        <Link to={"/add-movie"}>
          <a>Add Movie</a>
        </Link>
      </li>
      <li>
        <Link to={"/favorite-movie"}>
          <a>My Favorites </a>
        </Link>
      </li>
      <li>
        <Link to={"/sign-in"}>
          <a>Login</a>
        </Link>
      </li>
      <li>
        <Link to={"/sign-up"}>
          <a>Register </a>
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"}>
          <a className="btn btn-ghost text-xl">Movie Portal</a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <span className="mr-4">{userAcount?.displayName || "User Name"}</span>
        <div className="dropdown dropdown-end ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {userAcount?.photoURL ? (
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`${userAcount.photoURL}`}
                />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                <Link to={"/profile"}>Profile</Link>
              </a>
            </li>
            {userAcount ? (
              <li onClick={handleSignOut}>
                <a>Logout</a>{" "}
              </li>
            ) : (
              <Link to={"/sign-in"}>
                <li>
                  <a>Login</a>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
