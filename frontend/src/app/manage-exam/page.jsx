"use client";
import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ManageExamPage = () => {
  const router = useRouter();

  return (
    <Box style={{ marginTop: 80, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Manage Exams
      </Typography>
      <Typography variant="body1" style={{ marginTop: 16, marginBottom: 32 }}>
        This is the exam management page where you can create, edit, and manage exams.
      </Typography>
      <Button 
        variant="outlined" 
        color="primary"
        onClick={() => router.push("/")}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default ManageExamPage;