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
import "./AddStudentFaculty.css"; // New CSS file for students

const AddStudentFaculty = () => {
  const [studentFirstname, setFirstname] = useState("");
  const [studentLastname, setLastname] = useState("");
  const [studentEmailId, setEmail] = useState("");
  const [studentPhoneNo, setPhoneNo] = useState("");
  const [studentAddress, setAddress] = useState("");
  const [studentSemester, setSemester] = useState("");
  const [studentSection, setSection] = useState("");
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
        studentFirstname,
        studentLastname,
        studentEmailId,
        studentPhoneNo,
        studentAddress,
        studentSemester,
        studentSection,
      };
  
      const response = await axios.post(
        "http://localhost:8080/student/create-student",
        payload
      );
  
      setSnackbar({
        open: true,
        message: "Student registered successfully!",
        severity: "success",
      });
  
      console.log(response.data);
  
      
      setFirstname("");
      setLastname("");
      setEmail("");
      setPhoneNo("");
      setAddress("");
      setSemester("");
      setSection("");
      
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Failed to register student.",
        severity: "error",
      });
      console.error(e);
    }
  };
  
  return (
    <>
      <Container maxWidth="sm" className="register-student-container">
        <Paper elevation={6} className="register-student-paper">
          <Typography variant="h4" className="form-title">
            🎓 Register New Student
          </Typography>
          <Typography variant="subtitle1" className="form-subtitle">
            Fill in the details to register a new student
          </Typography>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  margin="normal"
                  value={studentFirstname}
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
                  value={studentLastname}
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
                  value={studentEmailId}
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
                  value={studentPhoneNo}
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
                  value={studentAddress}
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
                  value={studentSemester}
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
                  value={studentSection}
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
                Register Student
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

export default AddStudentFaculty;
