import { ThemeProvider, Zoom, createTheme } from "@mui/material";
import { cyan, deepOrange } from "@mui/material/colors";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Components/Index";
import Login from "./Components/Authentication/Login";
import Home from "./Components/Home";
import { Context } from "./Contexts/Context";
import Booking from "./Components/Booking/Booking";
import { useEffect } from "react";
import Bookings from "./Components/Booking/Bookings";
import UpdateProfile from "./Components/Authentication/UpdateProfile";

function App() {
  const theme = createTheme({
    palette: {
      primary: deepOrange,
      secondary: cyan,
    },

    typography: {
      allVariants: {
        fontFamily: "Josefin Sans",
      },
    },
  });

  const loadscript = (url) => {
    return new Promise(async (resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => resolve(true);
      script.onerror = () => reject(false);

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadscript("https://checkout.razorpay.com/v1/checkout.js")
      .then((data) => console.log("Script Loaded", data))
      .catch((err) => console.log(err));
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Context>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />}>
              <Route path="/" index element={<Home />} />
              <Route path="/bookTicket/:id" element={<Booking />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/updateProfile" element={<UpdateProfile />} />
            </Route>
          </Routes>
        </Context>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
