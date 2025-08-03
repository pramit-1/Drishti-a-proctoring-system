"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";

const Examlist = ({ onSelectExam }) => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const storedExams = localStorage.getItem("examsList");
    if (storedExams) {
      setExams(JSON.parse(storedExams));
    }
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <AppBar position="static" elevation={6} sx={{ bgcolor: "#564aa3" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            DRISTHI Proctoring Dashboard
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 500, fontStyle: "italic" }}>
            Role: Attendee
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Available Exams
        </Typography>

        {exams.length === 0 ? (
          <Typography variant="body1" color="text.secondary" textAlign="center" mt={4}>
            No exams available at the moment. Please check back later.
          </Typography>
        ) : (
          <Stack spacing={3}>
            {exams.map((exam, index) => (
              <Card key={index} variant="outlined" sx={{ bgcolor: "white" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {exam.title}
                  </Typography>
                  <Typography>Subject: {exam.subject}</Typography>
                  <Typography>Duration: {exam.duration} minutes</Typography>
                  <Typography>Access Code: <code>{exam.code}</code></Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onSelectExam && onSelectExam(exam)}
                    >
                      Take Exam
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default Examlist;
