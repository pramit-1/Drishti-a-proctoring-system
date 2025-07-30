"use client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Typography, Box } from "@mui/material";

// Placeholder components for the routes
const ManageExam = () => (
  <Box sx={{ mt: 10, textAlign: "center" }}>
    <Typography variant="h3">Manage Exams</Typography>
    <Typography variant="body1" sx={{ mt: 2 }}>
      This is the exam management page.
    </Typography>
  </Box>
);

const TakeExam = () => (
  <Box sx={{ mt: 10, textAlign: "center" }}>
    <Typography variant="h3">Take Exam</Typography>
    <Typography variant="body1" sx={{ mt: 2 }}>
      This is the exam taking page.
    </Typography>
  </Box>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage-exam" element={<ManageExam />} />
        <Route path="/exam" element={<TakeExam />} />
      </Routes>
    </Router>
  );
};

export default App;