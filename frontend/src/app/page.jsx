"use client";
import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  return (
    <Box mt={10} textAlign="center">
      <Typography variant="h3" gutterBottom>
        Welcome to the Proctoring Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ m: 2 }}
        onClick={() => router.push("/manage-exam")}
      >
        Manage Exams
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ m: 2 }}
        onClick={() => router.push("/exam")}
      >
        Take Exam
      </Button>
    </Box>
  );
};

export default Dashboard;
