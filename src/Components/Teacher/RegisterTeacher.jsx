import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import "./RegisterTeacher.css";

const RegisterTeacher = () => {
  const [facultyFirstname, setFirstname] = useState("");
  const [facultyLastname, setLastname] = useState("");
  const [facultyEmailId, setEmail] = useState("");
  const [facultyPhoneNo, setPhoneNo] = useState("");
  const [facultyAddress, setAddress] = useState("");
  const [facultySemester, setSemester] = useState("");
  const [facultySection, setSection] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleRegister = async () => {
    try {
      const payload = {
        facultyFirstname,
        facultyLastname,
        facultyEmailId,
        facultyPhoneNo,
        facultyAddress,
        facultySemester,
        facultySection,
      };

      const response = await axios.post(
        "http://localhost:8080/faculty/register",
        payload
      );

      setSnackbar({
        open: true,
        message: "Teacher registered successfully!",
        severity: "success",
      });

      console.log(response.data);
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Failed to register teacher.",
        severity: "error",
      });
      console.error(e);
    }
  };

  return (
    <>
      <Container maxWidth="sm" className="register-teacher-container">
        <Paper elevation={6} className="register-teacher-paper">
          <Typography variant="h4" className="form-title">
            🎓 Register New Teacher
          </Typography>
          <Typography variant="subtitle1" className="form-subtitle">
            Fill in the details to register a new teacher
          </Typography>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  margin="normal"
                  value={facultyFirstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="input-field"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  margin="normal"
                  value={facultyLastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="input-field"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email ID"
                  variant="outlined"
                  margin="normal"
                  value={facultyEmailId}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  margin="normal"
                  value={facultyPhoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className="input-field"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  margin="normal"
                  value={facultyAddress}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-field"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Semester"
                  variant="outlined"
                  margin="normal"
                  value={facultySemester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="input-field"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Section"
                  variant="outlined"
                  margin="normal"
                  value={facultySection}
                  onChange={(e) => setSection(e.target.value)}
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
                Register Teacher
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterTeacher;
