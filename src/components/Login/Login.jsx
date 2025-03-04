import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ContextProvider } from "../../Provider/Provider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [viewPassword, setViewPassword] = useState(true);
  const {
    signInUser,
    signWithGoogle,
    resetPassword,
    notifySuccess,
    notifyError,
    notifyWarning,
  } = useContext(ContextProvider);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        notifySuccess("Login Successfully!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        notifyError(`${error.message}!`);
      });
  };

  const handleGoogleLogin = () => {
    

    signWithGoogle()
      .then(() => {
        notifySuccess("Login Successfully!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        notifyError(`${error.message}!`);
      });
  };




  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      notifyWarning("Please input email first.!");
    } else {
      resetPassword(email);
      notifySuccess("Sent email successfully.!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <div className="w-full max-w-md p-6 bg-slate-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Login your account
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              ref={emailRef}
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:outline-none"
              required
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
              className="text-red-700 hover:text-red-500"
              onClick={handleResetPassword}
            >
              forget password.?
            </button>

            <button
              type="button"
              onClick={() => setViewPassword(!viewPassword)}
              className="absolute right-4 bottom-9"
            >
              {viewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between items-center pt-3">
          <p className="text-center text-sm text-gray-500">
            Don’t Have An Account?{" "}
            <Link to="/sign-up" className="text-red-500 hover:underline">
              Register
            </Link>
          </p>
          <button
            onClick={handleGoogleLogin}
            type="button"
            class="text-white  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
          >
            <svg
              class="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign up with Google<div></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
