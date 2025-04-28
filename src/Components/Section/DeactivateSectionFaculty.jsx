import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Paper,
  MenuItem,
} from "@mui/material";
import "./DeactivateSectionFaculty.css"; // your custom styles

const DeactivateSectionFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/faculty/all-faculty") // ✅ corrected endpoint
      .then((res) => res.json())
      .then((data) => setFaculties(data))
      .catch((err) => console.error("Error fetching faculties:", err));
  }, []);

  const handleDeactivate = () => {
    if (!selectedFacultyId) {
      alert("Please select a faculty to deactivate!");
      return;
    }

    fetch(`http://localhost:8080/faculty/deactivate-section`, { // ✅ corrected endpoint
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ facultyId: selectedFacultyId }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((message) => {
            throw new Error(message || "Failed to deactivate section");
          });
        }
        return res.text();
      })
      .then((message) => {
        alert(message || "Faculty section deactivated successfully!");
        setSelectedFacultyId("");
      })
      .catch((err) => {
        console.error("Error deactivating section:", err);
        alert("Failed to deactivate: " + err.message);
      });
  };

  return (
    <Container maxWidth="sm" className="deactivate-section-container">
      <Paper elevation={6} className="deactivate-section-paper">
        <Typography variant="h4" className="form-title">
          🚫 Deactivate Faculty Section
        </Typography>
        <Typography variant="subtitle1" className="form-subtitle">
          Quickly deactivate a faculty's section.
        </Typography>

        <form
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleDeactivate();
          }}
        >
          <TextField
            select
            fullWidth
            label="Select Faculty"
            variant="outlined"
            margin="normal"
            value={selectedFacultyId}
            onChange={(e) => setSelectedFacultyId(e.target.value)}
            className="input-field"
          >
            {faculties.map((faculty) => (
              <MenuItem key={faculty.facultyid} value={faculty.facultyid}>
                {faculty.facultyFirstname} {faculty.facultyLastname}
              </MenuItem>
            ))}
          </TextField>

          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="error"
              type="submit"
              className="deactivate-btn"
            >
              Deactivate Section
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default DeactivateSectionFaculty;
