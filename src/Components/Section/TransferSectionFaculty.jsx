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
import "./TransferSectionFaculty.css"; // your custom CSS

const TransferSectionFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState("");
  const [newSection, setNewSection] = useState("");

  const sections = ["A", "B", "C", "D", "E"];

  useEffect(() => {
    fetch("http://localhost:8080/faculty/all-faculty")
      .then((res) => res.json())
      .then((data) => setFaculties(data))
      .catch((err) => console.error("Error fetching faculties:", err));
  }, []);

  const handleTransfer = () => {
    if (!selectedFacultyId || !newSection) {
      alert("Please select faculty and new section!");
      return;
    }

    fetch(`http://localhost:8080/faculty/transfer-section`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ facultyId: selectedFacultyId, newSection }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((message) => {
            throw new Error(message || "Failed to transfer section");
          });
        }
        return res.text();
      })
      .then((message) => {
        alert(message || "Faculty section transferred successfully!");
        setSelectedFacultyId("");
        setNewSection("");
      })
      .catch((err) => {
        console.error("Error transferring section:", err);
        alert("Failed to transfer: " + err.message);
      });
  };

  const selectedFaculty = faculties.find(
    (faculty) => faculty.facultyid === Number(selectedFacultyId)
  );

  return (
    <Container maxWidth="sm" className="transfer-section-container">
      <Paper elevation={6} className="transfer-section-paper">
        <Typography variant="h4" className="form-title">
          🔄 Transfer Faculty Section
        </Typography>
        <Typography variant="subtitle1" className="form-subtitle">
          Quickly reassign faculty to a different section!
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleTransfer();
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
                {faculty.facultyFirstname} {faculty.facultyLastname} — {faculty.facultyEmailId} — 📞 {faculty.facultyPhoneNo} — Section: {faculty.facultySection}
              </MenuItem>
            ))}
          </TextField>

          {selectedFaculty && (
            <Box mt={2} mb={2}>
              <Typography variant="body1"><strong>Name:</strong> {selectedFaculty.facultyFirstname} {selectedFaculty.facultyLastname}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {selectedFaculty.facultyEmailId}</Typography>
              <Typography variant="body1"><strong>Phone:</strong> {selectedFaculty.facultyPhoneNo}</Typography>
              <Typography variant="body1"><strong>Address:</strong> {selectedFaculty.facultyAddress}</Typography>
              <Typography variant="body1"><strong>Current Section:</strong> {selectedFaculty.facultySection || "N/A"}</Typography>
            </Box>
          )}

          <TextField
            select
            fullWidth
            label="Select New Section"
            variant="outlined"
            margin="normal"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            className="input-field"
          >
            {sections.map((sec) => (
              <MenuItem key={sec} value={sec}>
                {sec}
              </MenuItem>
            ))}
          </TextField>

          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="transfer-btn"
            >
              Transfer Section
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default TransferSectionFaculty;
