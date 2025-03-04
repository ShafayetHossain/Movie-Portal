import React, { useContext } from "react";
import { ContextProvider } from "../../Provider/Provider";

const Profile = () => {
  const { userAcount } = useContext(ContextProvider);

  return (
    <div className="card bg-base-100 w-96 shadow-xl mx-auto outline outline-1 outline-orange-500 py-4">
        <h1 className="text-3xl font-bold text-center ">User Profile</h1>
      <figure className="px-10 pt-10">
        {userAcount?.photoURL ? (
          <img
            alt="Tailwind CSS Navbar component"
            src={`${userAcount.photoURL}`}
          />
        ) : (
          <img
            src="https://i.ibb.co.com/svySF97g/user.png"
            alt="User"
            className="rounded-xl"
          />
        )}
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">User Name : {userAcount?.displayName || "N/A"}</h2>
        <p>User Mail : {userAcount?.email || "N/A"}</p>
      </div>
    </div>
  );
};

export default Profile;
