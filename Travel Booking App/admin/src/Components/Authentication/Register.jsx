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
  ThemeProvider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { api } from "../../Utils/Api";
import { toast } from "react-toastify";

const state = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  admin: true,
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [admin, setAdmin] = useState(state);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setAdmin({ ...admin, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (admin.password !== admin.confirmPassword) {
      toast.error("Mismatch Password and Confirm Password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const res = await fetch(`${api}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Registration Successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("../login");
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
          <Heading title={"Register"} />
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                type="text"
                label="Name"
                name="name"
                value={admin.name}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>
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
          <div className="input-group">
            <FormControl fullWidth>
              <InputLabel htmlFor="confirm-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirm-password"
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
                label="Confirm Password"
                name="confirmPassword"
                value={admin.confirmPassword}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>
          <Grid alignItems="center" container>
            <Grid item md={6} xs={4}>
              <Button type="button" variant="contained" onClick={handleSubmit}>
                Sign Up
              </Button>
            </Grid>
            <Grid item md={6} xs={8} textAlign="end">
              <Link className="link" to="../login">
                Already have an account? <span>Login</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
