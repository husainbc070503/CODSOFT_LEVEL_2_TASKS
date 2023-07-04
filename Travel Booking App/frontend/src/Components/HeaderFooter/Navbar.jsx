import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../images/logo.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Contexts/Context";
import styled from "@emotion/styled";
import { toast } from "react-toastify";

const LoginButton = styled(Button)`
  @media (max-width: 890px) {
    font-size: 12px;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="AppBar">
        <Toolbar>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <Box className="icons" sx={{ flexGrow: 1 }}>
            {!open ? (
              <MenuIcon onClick={() => setOpen(!open)} />
            ) : (
              <CloseIcon onClick={() => setOpen(!open)} />
            )}
          </Box>
          <Box className={`Box links ${open && "open"}`} sx={{ flexGrow: 1 }}>
            <NavLink to="/" className="navlink">
              Home
            </NavLink>

            {user.user && (
              <>
                <NavLink to="updateProfile" className="navlink">
                  Update Profile
                </NavLink>
                <NavLink to="bookings" className="navlink">
                  Past Bookings
                </NavLink>
                <Typography
                  className="navlink"
                  onClick={() => {
                    toast.info("You have been logout!", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                    localStorage.removeItem("travel-book-app-user");
                    navigate("../login");
                  }}
                >
                  Logout
                </Typography>
              </>
            )}
          </Box>
          <LoginButton
            color="secondary"
            variant="contained"
            onClick={() => !user.user && navigate("../login")}
          >
            {user.user ? `Welcome, ${user.user.name}` : "Login"}
          </LoginButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
