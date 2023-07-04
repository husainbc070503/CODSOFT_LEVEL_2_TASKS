import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormControl, FormLabel, Grid, TextField } from "@mui/material";
import styled from "@emotion/styled";
import TokenIcon from "@mui/icons-material/Token";
import { toast } from "react-toastify";
import { api } from "../../Utils/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  maxWidth: "96%",
  bgcolor: "#fff",
  p: 4,
  borderRadius: "8px",
};

const initialState = {
  email: "",
  otp: "",
  password: "",
  cpassword: "",
};

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const Label = styled(FormLabel)`
  margin-bottom: 16px;
  font-size: 18px;
  color: #243763;
  font-weight: bold;
`;

const ForgotModal = () => {
  const [open, setOpen] = React.useState(false);
  const [passModal, setPassModal] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [auth, setAuth] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) =>
    setAuth({ ...auth, [e.target.name]: e.target.value });

  const sendOtp = async () => {
    setLoading(true);

    if (!auth.email) {
      setLoading(false);
      return toast.error("Please enter email", {
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
      const res = await fetch(`${api}/api/user/sendOTP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: auth.email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("OTP send via Mail", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setPassModal(true);
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
      toast.error(error.message, {
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

  const updatePassword = async () => {
    setLoading(true);

    if (!auth.otp || !auth.password || !auth.cpassword) {
      setLoading(false);
      return toast.error("All fields are mandatory to be filled.", {
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

    if (auth.password !== auth.cpassword) {
      setLoading(false);
      return toast.error("Mismatch Passwords", {
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
      const res = await fetch(`${api}/api/user/changePassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auth),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Password Updated. Please Login", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setPassModal(false);
        setOpen(false);
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
      toast.error(error.message, {
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
    <div>
      <Button onClick={() => setOpen(true)} color="inherit">
        Forgot Password
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!passModal ? (
            <>
              <FormControl fullWidth>
                <Label>Email</Label>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={auth.email}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <StyledButton
                color="secondary"
                variant="contained"
                onClick={sendOtp}
                disabled={loading}
              >
                Send Otp
              </StyledButton>
            </>
          ) : (
            <>
              <div className="input-group">
                <Grid container spacing={1} alignItems="center">
                  <Grid item md={2} xs={2}>
                    <TokenIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <TextField
                      label="OTP"
                      type="number"
                      name="otp"
                      value={auth.otp}
                      onChange={handleChange}
                      required
                      fullWidth
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
              <Button
                color="secondary"
                disabled={loading}
                variant="contained"
                onClick={updatePassword}
              >
                Save Password
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ForgotModal;
