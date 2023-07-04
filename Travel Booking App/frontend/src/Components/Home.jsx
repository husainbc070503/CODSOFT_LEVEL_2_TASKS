import React from "react";
import { Container } from "@mui/material";
import Intro from "./Intro/Intro";
import Flights from "./Flights/Flights";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Services from "./Services/Services";
import { useGlobalContext } from "../Contexts/Context";

const Home = () => {
  const { flights } = useGlobalContext();

  return (
    <>
      <Intro />
      <Flights flights={flights} />
      <About />
      <Services />
      <Contact />
    </>
  );
};

export default Home;
