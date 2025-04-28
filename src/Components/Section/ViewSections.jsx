import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import "./ViewSections.css";

const ViewSections = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      name: "B Tech 1st Year - SEM 1",
      description: "B Tech 1st Year - SEM 1",
      semester: 1,
    },
    {
      id: 2,
      name: "B Tech 1st Year - SEM 2",
      description: "B Tech 1st Year - SEM 2",
      semester: 2,
    },
    {
      id: 3,
      name: "B Tech 2nd Year - SEM 1",
      description: "B Tech 2nd Year - SEM 1",
      semester: 1,
    },
  ]);

  const handleUpdate = (id) => {
    alert(`Update section with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
  };

  const handleTimetable = (name) => {
    alert(`Upload timetable for: ${name}`);
  };

  return (
    <Container maxWidth="lg" className="section-container">
      <Paper className="section-paper" elevation={6}>
        <Typography variant="h4" className="section-title">
          🧾 All Sections
        </Typography>
        <Typography variant="subtitle1" className="section-subtitle">
          List of available sections with uploadable timetables
        </Typography>

        <Box sx={{ overflowX: "auto", marginTop: 2 }}>
          <Table className="section-table">
            <TableHead>
              <TableRow className="section-header">
                <TableCell><strong>Section ID</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Semester</strong></TableCell>
                <TableCell><strong>Timetable</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sections.map((section, index) => (
                <TableRow
                  key={section.id}
                  className={index % 2 === 0 ? "section-row" : "section-row-alt"}
                >
                  <TableCell>{section.id}</TableCell>
                  <TableCell>{section.name}</TableCell>
                  <TableCell>{section.description}</TableCell>
                  <TableCell>{section.semester}</TableCell>
                  <TableCell>Not Uploaded</TableCell>
                  <TableCell align="center">
                    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<UploadIcon />}
                        className="action-btn upload"
                        onClick={() => handleTimetable(section.name)}
                      >
                        Upload Timetable
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        className="action-btn update"
                        onClick={() => handleUpdate(section.id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DeleteIcon />}
                        className="action-btn delete"
                        onClick={() => handleDelete(section.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewSections;
