import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Addmovie from "./components/Addmovie/Addmovie.jsx";
import Provider from "./Provider/Provider.jsx";
import Registration from "./components/Registration/Registration.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Login from "./components/Login/Login.jsx";
import DetailsCard from "./components/DetailsCard/DetailsCard.jsx";
import AllMovie from "./components/AllMovie/AllMovie.jsx";
import Favorite from "./components/Favorite/Favorite.jsx";
import EditMovie from "./components/EditMovie/EditMovie.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-movie",
        element: (
          <PrivateRoute>
            <Addmovie></Addmovie>
          </PrivateRoute>
        ),
      },
      {
        path: "/sign-up",
        element: <Registration></Registration>,
      },
      {
        path: "/sign-in",
        element: <Login></Login>,
      },
      {
        path: "/details-card/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/movie/${params.id}`),
        element: (
          <PrivateRoute>
            <DetailsCard></DetailsCard>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-movie",
        element: (
          <PrivateRoute>
            <AllMovie></AllMovie>
          </PrivateRoute>
        ),
      },
      {
        path: "/favorite-movie",
        element: (
          <PrivateRoute>
            <Favorite></Favorite>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-movie/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/movie/${params.id}`),
        element: (
          <PrivateRoute>
            <EditMovie></EditMovie>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
    errorElement : <ErrorPage></ErrorPage>
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

