import React, { useState, useEffect } from "react";
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
import "./ViewTeachers.css";

const Viewfacultys = () => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/faculty/all-faculty")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch faculties");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setFaculties(data);
        } else {
          console.error("Expected an array, got:", data);
          setFaculties([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching faculties:", err);
        setFaculties([]);
      });
  }, []);

  const handleUpdate = (faculty) => {
    alert(`Update faculty with ID: ${faculty.facultyid}`);
    // You can navigate to update form or open modal here
  };

  const handleDelete = (facultyid) => {
    fetch(`http://localhost:8080/faculty/delete/${facultyid}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((message) => {
            throw new Error(message || "Error deleting faculty");
          });
        }
        return res.text();
      })
      .then((message) => {
        alert(message || "Faculty deleted successfully");
        setFaculties((prev) => prev.filter((f) => f.facultyid !== facultyid));
      })
      .catch((err) => {
        console.error("Error deleting faculty:", err);
        alert("Failed to delete faculty: " + err.message);
      });
  };

  return (
    <Container maxWidth="lg" className="faculty-container">
      <Paper className="faculty-paper" elevation={6}>
        <Typography variant="h4" className="faculty-title">
          👨‍🏫 All Faculties
        </Typography>

        <Box sx={{ overflowX: "auto", marginTop: 2 }}>
          <Table className="faculty-table">
            <TableHead>
              <TableRow className="faculty-header">
                <TableCell><strong>First Name</strong></TableCell>
                <TableCell><strong>Last Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Phone No</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>Semester</strong></TableCell>
                <TableCell><strong>Section</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faculties.length > 0 ? (
                faculties.map((faculty, index) => (
                  <TableRow
                    key={faculty.facultyid}
                    className={index % 2 === 0 ? "faculty-row" : "faculty-row-alt"}
                  >
                    <TableCell>{faculty.facultyFirstname || "N/A"}</TableCell>
                  <TableCell>{faculty.facultyLastname || "N/A"}</TableCell>
                  <TableCell>{faculty.facultyEmailId || "N/A"}</TableCell>
                  <TableCell>{faculty.facultyPhoneNo || "N/A"}</TableCell>
                  <TableCell>{faculty.facultyAddress || "N/A"}</TableCell>
                  <TableCell>{faculty.facultySemester || "N/A"}</TableCell>
                  <TableCell>{faculty.facultySection || "N/A"}</TableCell>

                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={1}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<EditIcon />}
                          className="action-btn update"
                          onClick={() => handleUpdate(faculty)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<DeleteIcon />}
                          className="action-btn delete"
                          onClick={() => handleDelete(faculty.facultyid)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No faculties found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Container>
  );
};

export default Viewfacultys;
