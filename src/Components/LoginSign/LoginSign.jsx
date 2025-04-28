import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import "./LoginSign.css";

const LoginSign = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setRole("student");
    setEmail("");
    setPassword("");
    setFullName("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("userRole", role);

    if (!isLogin && password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      if (role === "admin") {
        const response = await axios.post("http://localhost:8080/admin/login", {
          adminEmail: email,
          adminPassword: password,
        });

        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem("jwtToken", token);
          setSnackbarMessage("Admin login successful");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          setTimeout(() => {
            navigate("/admin-dashboard");
          }, 3000);
        }
      } 
      else if (role === "faculty") {
        if (isLogin) {
          const response = await axios.post("http://localhost:8080/facultyUserLogin/login", {
            facultyEmail: email,
            facultyPassword: password,
          });

          if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem("jwtToken", token);
            setSnackbarMessage("Faculty login successful");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            setTimeout(() => {
              navigate("/faculty-dashboard");
            }, 3000);
          }
        } else {
          const response = await axios.post("http://localhost:8080/facultyUserLogin/register", {
            facultyName: fullName,
            facultyEmail: email,
            facultyPassword: password,
          });

          if (response.status === 201) {
            setSnackbarMessage("Faculty registered successfully. Please login.");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            setTimeout(() => {
              setIsLogin(true);
            }, 3000);
          }
        }
      }
      else if (role === "student") {
        navigate("/student-dashboard");
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Login/Register failed. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="login-container">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div className="login-left">
        <img src="/loginTTMS.png" alt="Timetable illustration" className="full-illustration" />
      </div>

      <div className="login-right">
        <div className="form-box">
          <h1 className="title">Timetable Management System</h1>
          <p className="subtitle">Effortless planning for academic excellence</p>

          <h2>{isLogin ? "Login" : "Register"}</h2>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth style={{ marginBottom: "15px" }}>
              <InputLabel>User Role</InputLabel>
              <Select value={role} label="User Role" onChange={(e) => setRole(e.target.value)} required>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="faculty">Faculty</MenuItem>
                {isLogin && <MenuItem value="admin">Admin</MenuItem>}
              </Select>
            </FormControl>

            {!isLogin && role !== "admin" && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}

            <button type="submit">{isLogin ? "Login" : "Register"}</button>
          </form>

          <p className="toggle-link" onClick={toggleMode}>
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSign;
