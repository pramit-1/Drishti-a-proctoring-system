import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const stickyColors = [
  "#FFFACD", // LemonChiffon
  "#E6E6FA", // Lavender
  "#F0FFF0", // Honeydew
  "#FFEFD5", // PapayaWhip
  "#F5F5DC", // Beige
  "#FFF0F5", // LavenderBlush
];

const ExamCard = ({ exams, isProctor }) => {
  if (!exams || !Array.isArray(exams)) return null;
  const router = useRouter();
  return (
    <Grid container spacing={3}>
      {exams.map((exam, index) => (
        <Grid item xs={12} sm={6} md={4} key={exam.exam_id}>
          <Card
            elevation={5}
            sx={{
              backgroundColor: stickyColors[index % stickyColors.length],
              transform: `rotate(${(Math.random() * 4 - 2).toFixed(2)}deg)`,
              borderRadius: "10px",
              padding: 2,
              boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: `rotate(0deg) scale(1.03)`,
              },
              fontFamily: `"Shadows Into Light", "Comic Sans MS", cursive`,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {exam.title}
              </Typography>
              <Typography variant="body2">
                <strong>Subject:</strong> {exam.subject}
              </Typography>
              <Typography variant="body2">
                <strong>Duration:</strong> {exam.duration} mins
              </Typography>
              <Typography variant="body2">
                <strong>Date:</strong>{" "}
                {new Date(exam.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Status:</strong> {exam.status || "Scheduled"}
              </Typography>
            </CardContent>
            {isProctor ? (
              <>
                <Button
                  variant="text"
                  color="success"
                  onClick={() => router.push(`/exams/${exam.exam_id}`)}
                  sx={{ textTransform: "none", minWidth: 0 }}
                >
                  view
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => onEdit(qidx)}
                  sx={{ textTransform: "none", minWidth: 0 }}
                >
                  Edit
                </Button>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => onDelete(qidx)}
                  sx={{ textTransform: "none", minWidth: 0 }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained" // solid style
                color="success"
                onClick={() => router.push(`/exams/live/${exam.exam_id}`)}
                sx={{ textTransform: "none" }}
              >
                Take Exam
              </Button>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ExamCard;
