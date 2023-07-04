import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../images/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/AdminContext";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { toast } from "react-toastify";

const Logout = styled(Typography)`
  display: inline-block;
  margin: 0 20px;
  cursor: pointer;
  font-size: 19px;
  font-family: "Times new roman";

  @media (max-width: 890px) {
    margin-top: 6px;
    color: #40128b;
    font-weight: bold;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { admin } = useGlobalContext();
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    toast.info("You have been logout!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    localStorage.removeItem("travel-book-admin");
    navigate("../login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ padding: "7px 0" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <div className="image">
              <img src={logo} alt="logo" />
            </div>
          </Box>
          <Box>
            <div className="icons">
              {!open ? (
                <MenuIcon onClick={() => setOpen(!open)} />
              ) : (
                <CloseIcon onClick={() => setOpen(!open)} />
              )}
            </div>
            <div className={`lists ${open && "open"}`}>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="bookings" className="nav-link">
                Bookings
              </Link>
              <Logout onClick={handleLogout}>Logout</Logout>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => !admin && navigate("../login")}
              >
                {admin ? `Welcome, ${admin?.user?.name}` : "Login"}
              </Button>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
