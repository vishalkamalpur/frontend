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
  Modal,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ViewStudents.css";

const ViewStudentFaculty = () => {
  const [students, setStudents] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/student/all-students")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          console.error("Expected an array, got:", data);
          setStudents([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setStudents([]);
      });
  }, []);

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setOpenUpdateModal(true);
  };

  const handleModalClose = () => {
    setOpenUpdateModal(false);
    setSelectedStudent(null);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    fetch(`http://localhost:8080/student/update-student`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedStudent),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((message) => {
            throw new Error(message || "Error updating student");
          });
        }
        return res.text(); // <-- CHANGE THIS LINE from res.json() to res.text()
      })
      .then((message) => {
        alert(message || "Student updated successfully!");
        setStudents((prevStudents) =>
          prevStudents.map((s) =>
            s.studentid === selectedStudent.studentid ? selectedStudent : s
          )
        );
        handleModalClose();
      })
      .catch((err) => {
        console.error("Error updating student:", err);
        alert("Failed to update student: " + err.message);
      });
  };
  

  const handleDelete = (studentid) => {
    fetch(`http://localhost:8080/student/delete/${studentid}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((message) => {
            throw new Error(message || "Error deleting student");
          });
        }
        return res.text();
      })
      .then((message) => {
        alert(message || "Student deleted successfully");
        setStudents((prev) => prev.filter((s) => s.studentid !== studentid));
      })
      .catch((err) => {
        console.error("Error deleting student:", err);
        alert("Failed to delete student: " + err.message);
      });
  };

  return (
    <Container maxWidth="lg" className="student-container">
      <Paper className="student-paper" elevation={6}>
        <Typography variant="h4" className="student-title">
          🎓 All Students
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
              {students.length > 0 ? (
                students.map((student, index) => (
                  <TableRow
                    key={student.studentid}
                    className={index % 2 === 0 ? "student-row" : "student-row-alt"}
                  >
                    <TableCell>{student.studentFirstname || "N/A"}</TableCell>
                    <TableCell>{student.studentLastname || "N/A"}</TableCell>
                    <TableCell>{student.studentEmailId || "N/A"}</TableCell>
                    <TableCell>{student.studentPhoneNo || "N/A"}</TableCell>
                    <TableCell>{student.studentAddress || "N/A"}</TableCell>
                    <TableCell>{student.studentSemester || "N/A"}</TableCell>
                    <TableCell>{student.studentSection || "N/A"}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={1}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<EditIcon />}
                          className="action-btn update"
                          onClick={() => handleUpdate(student)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<DeleteIcon />}
                          className="action-btn delete"
                          onClick={() => handleDelete(student.studentid)}
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
                    No students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      {/* Update Student Modal */}
      <Modal open={openUpdateModal} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            ✏️ Update Student
          </Typography>
          {selectedStudent && (
            <>
              <TextField
                fullWidth
                label="First Name"
                name="studentFirstname"
                value={selectedStudent.studentFirstname}
                onChange={handleFieldChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Last Name"
                name="studentLastname"
                value={selectedStudent.studentLastname}
                onChange={handleFieldChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="studentEmailId"
                value={selectedStudent.studentEmailId}
                onChange={handleFieldChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone No"
                name="studentPhoneNo"
                value={selectedStudent.studentPhoneNo}
                onChange={handleFieldChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Address"
                name="studentAddress"
                value={selectedStudent.studentAddress}
                onChange={handleFieldChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Semester"
                name="studentSemester"
                value={selectedStudent.studentSemester}
                onChange={handleFieldChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Section"
                name="studentSection"
                value={selectedStudent.studentSection}
                onChange={handleFieldChange}
                margin="normal"
              />

              <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleModalClose}>
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default ViewStudentFaculty;
