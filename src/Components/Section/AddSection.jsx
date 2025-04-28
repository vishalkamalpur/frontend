import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";
import "./AddSection.css";

const AddSection = () => {
  const [section, setSection] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");

  const handleAddSection = () => {
    // Handle your section add logic here (e.g., API call)
    console.log("Section:", section);
    console.log("Description:", description);
    console.log("Semester:", semester);
  };

  return (
    <Container maxWidth="sm" className="add-section-container">
      <Paper elevation={6} className="add-section-paper">
        <Typography variant="h4" className="form-title">
          🎓 Add New Section
        </Typography>
        <Typography variant="subtitle1" className="form-subtitle">
          Plan your academic year with ease!
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddSection();
          }}
        >
          <TextField
            fullWidth
            label="Enter section"
            variant="outlined"
            margin="normal"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="input-field"
          />
          <TextField
            fullWidth
            label="Enter section Description"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
          <TextField
            fullWidth
            label="Enter Semester"
            variant="outlined"
            margin="normal"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="input-field"
          />
          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className="add-btn"
            >
              Add Section
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddSection;
