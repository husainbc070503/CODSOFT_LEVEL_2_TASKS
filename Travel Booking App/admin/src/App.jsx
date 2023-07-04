import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Components/Index";
import Header from "./Components/HeaderFooter/Header";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import { AdminContext } from "./Context/AdminContext";
import AddFlight from "./Components/Flights/AddFlight";
import { deepPurple, teal } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Home from "./Components/Home";
import Bookings from "./Components/Bookings/Bookings";

function App() {
  const theme = createTheme({
    palette: {
      primary: deepPurple,
      secondary: teal,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AdminContext>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />}>
              <Route path="/" index element={<Index />} />
              <Route path="/addFlight" element={<AddFlight />} />
              <Route path="/updateFlight/:id" element={<AddFlight />} />
              <Route path="/bookings" element={<Bookings />} />
            </Route>
          </Routes>
        </AdminContext>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
