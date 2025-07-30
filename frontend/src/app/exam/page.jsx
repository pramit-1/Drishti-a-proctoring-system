"use client";
import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const TakeExam = () => {
  const router = useRouter();

  return (
    <Box mt={4} textAlign="center" sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Take Exam
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Select an exam to begin your proctored test session.
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
        color="secondary"
      >
        Start Exam
      </Button>
    </Box>
  );
};

export default TakeExam;