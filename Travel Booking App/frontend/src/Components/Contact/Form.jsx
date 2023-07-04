import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useGlobalContext } from "../../Contexts/Context";
import { Button, TextField } from "@mui/material";

const ContactForm = ({ user }) => {
  return (
    <form
      action="https://formspree.io/f/mbjevwel"
      method="POST"
      className="form"
    >
      <TextField
        type="name"
        name="username"
        variant="outlined"
        value={user?.user?.name}
        className="Textfield input"
        fullWidth
        required
        label="Name"
      />
      <TextField
        name="email"
        type="email"
        variant="outlined"
        value={user?.user?.email}
        className="Textfield input"
        required
        fullWidth
        label="Email"
      />
      <TextField
        name="message"
        label="Message"
        className="Textfield input"
        multiline
        rows={4}
        required
        fullWidth
      ></TextField>
      <Button type="submit" className="Button submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

const Form = () => {
  const { user } = useGlobalContext();
  return <ContactForm user={user} />;
};
export default Form;
