import React, { useState } from "react";
import "./AddTimetableFaculty.css";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Grid,
  Snackbar,
  Alert,
  Box,
  MenuItem,
} from "@mui/material";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
];

const AddTimetableFaculty = () => {
  const [day, setDay] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [course, setCourse] = useState("");
  const [teacher, setTeacher] = useState("");
  const [timetableData, setTimetableData] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAdd = () => {
    if (!day || !timeSlot || !course || !teacher) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields!",
        severity: "error",
      });
      return;
    }

    setTimetableData((prev) => ({
      ...prev,
      [timeSlot]: {
        ...prev[timeSlot],
        [day]: `${course} (${teacher})`,
      },
    }));

    setDay("");
    setTimeSlot("");
    setCourse("");
    setTeacher("");

    setSnackbar({
      open: true,
      message: "Timetable entry added!",
      severity: "success",
    });
  };

  return (
    <>
      <Container maxWidth="md" className="timetable-container">
        <Paper elevation={6} className="form-box">
          <Typography variant="h5" align="center" className="form-header">
            🗓️ Add Faculty Timetable
          </Typography>

          <Grid container spacing={2} className="form-fields">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                label="Select Day"
                variant="outlined"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                sx={{
                  '& label.Mui-focused': { color: '#1976D2' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: "10px",
                  },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#1976D2',
                  },
                }}
              >
                {days.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                label="Time Slot"
                variant="outlined"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                sx={{
                  '& label.Mui-focused': { color: '#1976D2' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: "10px",
                  },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#1976D2',
                  },
                }}
              >
                {timeSlots.map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Course"
                variant="outlined"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                sx={{
                  '& label.Mui-focused': { color: '#1976D2' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: "10px",
                  },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#1976D2',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Teacher"
                variant="outlined"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                sx={{
                  '& label.Mui-focused': { color: '#1976D2' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: "10px",
                  },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#1976D2',
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              onClick={handleAdd}
              sx={{
                backgroundColor: '#1976D2',
                '&:hover': { backgroundColor: '#1565C0' },
                borderRadius: "10px",
                paddingX: 5,
                paddingY: 1.5,
                fontWeight: "bold",
              }}
            >
              Add to Timetable
            </Button>
          </Box>
        </Paper>

        <Paper elevation={6} className="timetable-box" sx={{ marginTop: 4 }}>
          <Typography variant="h5" align="center" className="timetable-header">
            📋 Faculty Timetable
          </Typography>

          <div style={{ overflowX: "auto" }}>
            <table className="timetable-table">
              <thead>
                <tr>
                  <th>Time Slot \ Day</th>
                  {days.map((dayName) => (
                    <th key={dayName}>{dayName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot}>
                    <td><strong>{slot}</strong></td>
                    {days.map((dayName) => (
                      <td key={dayName + slot}>
                        {timetableData[slot]?.[dayName] || "NA"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                borderRadius: "10px",
                paddingX: 4,
                paddingY: 1.2,
                fontWeight: "bold",
              }}
            >
              Upload Timetable
            </Button>
          </div>
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddTimetableFaculty;
