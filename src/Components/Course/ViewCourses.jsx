import React, { useEffect, useState } from "react";
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
  Snackbar,
  Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import "./ViewCourses.css";

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [semNames, setSemNames] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({
    cid: "",
    courseName: "",
    courseDescription: "",
    semName: ""
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/course/all-courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchSemesters = async () => {
    try {
      const response = await axios.get("http://localhost:8080/semester/all-semesters");
      const semesterNames = response.data.map(sem => sem.semName);
      setSemNames(semesterNames);
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchSemesters();
  }, []);

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setSelectedCourse({ ...selectedCourse, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!semNames.includes(selectedCourse.semName)) {
      showSnackbar("Invalid semester name. Please select a valid one.", "error");
      return;
    }

    try {
      await axios.put("http://localhost:8080/course/update-course", selectedCourse);
      fetchCourses();
      setOpen(false);
      showSnackbar("Course updated successfully!", "success");
    } catch (error) {
      console.error("Error updating course:", error);
      showSnackbar("Failed to update course.", "error");
    }
  };

  const handleDelete = async (cid) => {
    try {
      await axios.delete(`http://localhost:8080/course/courses/${cid}`);
      fetchCourses();
      showSnackbar("Course deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting course:", error);
      showSnackbar("Failed to delete course.", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMsg(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" className="course-container">
      <Paper className="course-paper" elevation={6}>
        <Typography variant="h4" className="course-title">
          📚 All Courses
        </Typography>
        <Typography variant="subtitle1" className="course-subtitle">
          Manage, edit, and review available course offerings.
        </Typography>

        <Box sx={{ overflowX: "auto", marginTop: 2 }}>
          <Table className="course-table">
            <TableHead>
              <TableRow className="course-header">
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Semester</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course, index) => (
                <TableRow key={course.cid} className={index % 2 === 0 ? "course-row" : "course-row-alt"}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.courseDescription}</TableCell>
                  <TableCell>{course.semName}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={1}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        className="action-btn update"
                        onClick={() => handleOpenModal(course)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DeleteIcon />}
                        className="action-btn delete"
                        onClick={() => handleDelete(course.cid)}
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

      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography variant="h6" sx={{color: 'black', fontWeight: 'bold'}} mb={4}>Update Course</Typography>
          <TextField
            fullWidth
            label="Name"
            name="courseName"
            margin="normal"
            value={selectedCourse.courseName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Description"
            name="courseDescription"
            margin="normal"
            value={selectedCourse.courseDescription}
            onChange={handleChange}
          />
          <TextField
            select
            fullWidth
            label="Semester"
            name="semName"
            margin="normal"
            value={selectedCourse.semName}
            onChange={handleChange}
            SelectProps={{ native: true }}
          >
            <option value="">Select Semester</option>
            {semNames.map((name, idx) => (
              <option key={idx} value={name}>{name}</option>
            ))}
          </TextField>
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button sx={{ backgroundColor: '#4f46e5', color: '#ffffff' }} onClick={handleCloseModal}>Cancel</Button>
            <Button sx={{ backgroundColor: '#4f46e5', color: '#ffffff' }} variant="contained" onClick={handleUpdate}>Save</Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose} sx={{ width: "100%" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ViewCourses;