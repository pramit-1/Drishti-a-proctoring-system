"use client";
import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        mt: 10, 
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to the Proctoring Dashboard
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ m: 2, minWidth: 200 }}
          onClick={() => navigate("/manage-exam")}
        >
          Manage Exams
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ m: 2, minWidth: 200 }}
          onClick={() => navigate("/exam")}
        >
          Take Exam
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;