import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import image from "../../images/auth-image.jpeg";
import styled from "@emotion/styled";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { toast } from "react-toastify";
import { api } from "../../Utils/Api";
import { useNavigate } from "react-router-dom";
import ForgotModal from "./ForgotModal";

const MainHeading = styled(Typography)`
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
  color: #f86f03;
  font-weight: bold;
`;

const Heading = styled(Typography)`
  text-align: center;
  font-size: 28px;
  line-height: 1.6rem;
  margin-bottom: 20px;
  color: #525fe1;
`;

const Link = styled(Typography)`
  color: #497174;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #191919;
  }

  @media (max-width: 890px) {
    font-size: 14px;
  }
`;

const initialState = {
  name: "",
  email: "",
  password: "",
  address: "",
  cpassword: "",
  phone: "",
  passportNumber: "",
};

const Login = () => {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(true);
  const [auth, setAuth] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setAuth({ ...auth, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    setLoading(true);
    if (auth.password !== auth.cpassword) {
      setLoading(false);
      return toast.error("Mismatch Passwords!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      const res = await fetch(`${api}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auth),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Registration Successful", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setLogin(true);
        setAuth(initialState);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${api}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: auth.email, password: auth.password }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Loggedin Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.setItem("travel-book-app-user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
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
    <Box>
      <Grid container alignItems="center">
        <Grid item md={8} xs={12}>
          <img src={image} alt="auth-image" className="auth-image" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Box>
            <MainHeading>Online Airline Booking</MainHeading>
            <Heading>{login ? "Login" : "Register"}</Heading>
            <div className={`auth-form ${!login && "reg-form"}`}>
              {!login && (
                <div className="input-group">
                  <Grid container alignItems="center">
                    <Grid item xs={2}>
                      <PersonIcon className="icon" />
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        type="text"
                        label="Name"
                        name="name"
                        value={auth.name}
                        onChange={handleChange}
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                </div>
              )}
              <div className="input-group">
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    <EmailIcon className="icon" />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      type="email"
                      label="Email"
                      name="email"
                      value={auth.email}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </div>
              <div className="input-group">
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    {show ? (
                      <VisibilityIcon
                        className="icon icon-pass"
                        onClick={() => setShow(!show)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        className="icon icon-pass"
                        onClick={() => setShow(!show)}
                      />
                    )}
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      type={show ? "text" : "password"}
                      label="Password"
                      name="password"
                      value={auth.password}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </div>
              {!login && (
                <>
                  <div className="input-group">
                    <Grid container alignItems="center">
                      <Grid item xs={2}>
                        {show ? (
                          <VisibilityIcon
                            className="icon icon-pass"
                            onClick={() => setShow(!show)}
                          />
                        ) : (
                          <VisibilityOffIcon
                            className="icon icon-pass"
                            onClick={() => setShow(!show)}
                          />
                        )}
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          type={show ? "text" : "password"}
                          label="Confirm Password"
                          name="cpassword"
                          value={auth.cpassword}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className="input-group">
                    <Grid container alignItems="center">
                      <Grid item xs={2}>
                        <PhoneAndroidIcon className="icon" />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          type="tel"
                          label="Phone No"
                          name="phone"
                          value={auth.phone}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className="input-group">
                    <Grid container alignItems="center">
                      <Grid item xs={2}>
                        <AirplanemodeActiveIcon className="icon" />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          type="text"
                          label="Passport Number"
                          name="passportNumber"
                          value={auth.passportNumber}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className="input-group">
                    <Grid container alignItems="center">
                      <Grid item xs={2}>
                        <HomeIcon className="icon" />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          type="text"
                          multiline
                          rows={4}
                          label="Address"
                          name="address"
                          value={auth.address}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>
                  </div>
                </>
              )}
              <Grid container alignItems="center" marginTop={5}>
                <Grid item xs={4}>
                  <Button
                    color="secondary"
                    variant="contained"
                    disabled={loading}
                    onClick={login ? handleLogin : handleRegister}
                  >
                    Sign {login ? "In" : "Up"}
                  </Button>
                </Grid>
                <Grid item xs={8} textAlign="end">
                  <Link onClick={() => setLogin(!login)}>
                    {login
                      ? "Don't have an account? Register"
                      : "Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
              <Grid container alignItems="center" marginTop={5}>
                <ForgotModal />
              </Grid>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
