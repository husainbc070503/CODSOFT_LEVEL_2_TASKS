import React from "react";
import Navbar from "./HeaderFooter/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./HeaderFooter/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Index;
