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
import "./ViewStudents.css";

const ViewStudents = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      firstname: "Suhas",
      lastname: "H",
      email: "suhas@gmail.com",
      phoneno: "9876543210",
      address: "Bangalore",
      semester: 2,
      section: "A",
    },
    {
      id: 2,
      firstname: "Rajesh",
      lastname: "Kumar",
      email: "rajesh@gmail.com",
      phoneno: "9123456780",
      address: "Hyderabad",
      semester: 3,
      section: "B",
    },
    // Add more student data if needed
  ]);

  const handleUpdate = (id) => {
    alert(`Update student with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <Container maxWidth="lg" className="student-container">
      <Paper className="student-paper" elevation={6}>
        <Typography variant="h4" className="student-title">
          📘 All Students
        </Typography>
        <Typography variant="subtitle1" className="student-subtitle">
          List of registered students
        </Typography>

        <Box sx={{ overflowX: "auto", marginTop: 2 }}>
          <Table className="student-table">
            <TableHead>
              <TableRow className="student-header">
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
              {students.map((student, index) => (
                <TableRow
                  key={student.id}
                  className={index % 2 === 0 ? "student-row" : "student-row-alt"}
                >
                  <TableCell>{student.firstname}</TableCell>
                  <TableCell>{student.lastname}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phoneno}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={1}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        className="action-btn update"
                        onClick={() => handleUpdate(student.id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DeleteIcon />}
                        className="action-btn delete"
                        onClick={() => handleDelete(student.id)}
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

export default ViewStudents;
