"use client";
import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const DashboardNextJS = () => {
  const router = useRouter();

  return (
    <Box 
      style={{ 
        marginTop: 80, 
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
      <Box style={{ marginTop: 32 }}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 16, minWidth: 200 }}
          onClick={() => router.push("/manage-exam")}
        >
          Manage Exams
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: 16, minWidth: 200 }}
          onClick={() => router.push("/exam")}
        >
          Take Exam
        </Button>
      </Box>
    </Box>
  );
};

export default DashboardNextJS;