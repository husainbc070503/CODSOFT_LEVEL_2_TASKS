import React, { useState } from "react";
import Heading from "../HeaderFooter/Heading";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { api } from "../../Utils/Api";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setAdmin({ ...admin, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${api}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin),
      });

      const data = await res.json();
      if (data.success && data.user?.user?.admin) {
        toast.success("LoggedIn Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.setItem("travel-book-admin", JSON.stringify(data.user));
        navigate("/");
      } else if (!data.user?.user?.admin) {
        toast.error("You are not allowed to login.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="container">
      <Container maxWidth="sm">
        <Heading title={"Travel Booking App - Admin Panel"} />
        <Box>
          <Heading title={"Login"} />
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                type="email"
                label="Email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>
          <div className="input-group">
            <FormControl fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>
          <Grid alignItems="center" container>
            <Grid item md={6} xs={4}>
              <Button variant="contained" onClick={handleSubmit}>
                Sign In
              </Button>
            </Grid>
            <Grid item md={6} xs={8} textAlign="end">
              <Link className="link" to="../register">
                Don't have an account? <span>Register</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
