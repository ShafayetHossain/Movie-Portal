import React from "react";
import Footer from "../Footers/Footer";
import Header from "../Headers/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <Header></Header>
      </header>

      <main style={{ minHeight: "calc(100vh - (80px + 80px))" }} >
        <Outlet></Outlet>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Layout;
