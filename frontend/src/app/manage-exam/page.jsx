"use client";
import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const ManageExam = () => {
  const router = useRouter();

  return (
    <Box mt={4} textAlign="center" sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Exams
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Create, edit, and manage your exams here.
      </Typography>
      <Button
        variant="outlined"
        onClick={() => router.push("/")}
        sx={{ mr: 2 }}
      >
        Back to Dashboard
      </Button>
      <Button
        variant="contained"
        color="primary"
      >
        Create New Exam
      </Button>
    </Box>
  );
};

export default ManageExam;