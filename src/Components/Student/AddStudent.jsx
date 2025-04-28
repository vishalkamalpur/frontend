import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import "./AddStudent.css";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    contactNo: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    console.log("Form Data:", formData);
    // Backend integration goes here
  };

  return (
    <Container maxWidth="sm" className="register-student-container">
      <Paper elevation={6} className="register-student-paper">
        <Typography variant="h4" className="form-title">
          🎓 Register New Student
        </Typography>
        <Typography variant="subtitle1" className="form-subtitle">
          Fill in the details to register a new student
        </Typography>
        <form noValidate autoComplete="off">
          {/* First Name and Last Name */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="normal"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                margin="normal"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
          </Grid>

          {/* Email and Password */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email ID"
                variant="outlined"
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
          </Grid>

          {/* Contact No and Street */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact No"
                variant="outlined"
                margin="normal"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Street"
                variant="outlined"
                margin="normal"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
          </Grid>

          {/* City and Pincode */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                margin="normal"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                variant="outlined"
                margin="normal"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="input-field"
              />
            </Grid>
          </Grid>

          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
              className="register-btn"
            >
              Register Student
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddStudent;