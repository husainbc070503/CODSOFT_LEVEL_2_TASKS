import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Contexts/Context";
import { toast } from "react-toastify";
import { api } from "../../Utils/Api";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState();

  const handleChange = (e) =>
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${api}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updateUser),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile Updated", {
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
    } catch (error) {
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

  useEffect(() => {
    setUpdateUser(user?.user);
  }, [user]);

  return (
    <Container maxWidth="md">
      <div className="container update-container">
        <section className="sections">
          <Typography className="Typography section-heading">
            Update Profile
          </Typography>
          <Box>
            <div className="input-group">
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">Name</FormLabel>
                <TextField
                  type="text"
                  value={updateUser?.name}
                  name="name"
                  onChange={handleChange}
                />
              </FormControl>
            </div>
            <div className="input-group">
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">Email</FormLabel>
                <TextField
                  type="email"
                  value={updateUser?.email}
                  name="email"
                  onChange={handleChange}
                />
              </FormControl>
            </div>
            <div className="input-group">
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">
                  Passport Number
                </FormLabel>
                <TextField
                  type="text"
                  value={updateUser?.passportNumber}
                  name="passportNumber"
                  onChange={handleChange}
                />
              </FormControl>
            </div>
            <div className="input-group">
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">Phone No.</FormLabel>
                <TextField
                  type="tel"
                  value={updateUser?.phone}
                  name="phone"
                  onChange={handleChange}
                />
              </FormControl>
            </div>
            <div className="input-group">
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">Address</FormLabel>
                <TextField
                  type="text"
                  multiline
                  rows={4}
                  value={updateUser?.address}
                  name="address"
                  onChange={handleChange}
                />
              </FormControl>
            </div>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </section>
      </div>
    </Container>
  );
};

export default UpdateProfile;
