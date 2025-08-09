"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import CreateExamModal from "@/components/create_exam";
import ExamCard from "@/components/examCard";

const ExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateExam, setOpenCreateExam] = useState(false);

  const fetchExams = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get("http://localhost:8000/api/exam/view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setExams(res.data.exams || []);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <>
      <CreateExamModal
        open={openCreateExam}
        onClose={() => setOpenCreateExam(false)}
      />
      <Container sx={{ mt: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4">All Exams</Typography>
          {typeof window !== "undefined" &&
            localStorage.getItem("userRole") === "proctor" && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenCreateExam(true)}
              >
                Create Exam
              </Button>
            )}
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : exams.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary">
            No exams available.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {exams.map((exam) => (
              <Grid item xs={12} sm={6} md={4} key={exam.exam_id}>
                <ExamCard
                  exam={exam}
                  isProctor={localStorage.getItem("userRole") === "proctor"}
                  index={exam.exam_id}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ExamsPage;
