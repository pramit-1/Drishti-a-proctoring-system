"use client";
import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ExamPage = () => {
  const router = useRouter();

  return (
    <Box style={{ marginTop: 80, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Take Exam
      </Typography>
      <Typography variant="body1" style={{ marginTop: 16, marginBottom: 32 }}>
        This is the exam taking page where students can take their exams with proctoring.
      </Typography>
      <Button 
        variant="outlined" 
        color="secondary"
        onClick={() => router.push("/")}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default ExamPage;