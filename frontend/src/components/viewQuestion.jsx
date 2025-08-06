import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const ViewQuestion = ({ question, qidx, onDelete, onEdit }) => {
  return (
    <>
      <Card variant="outlined" sx={{ mb: 2, backgroundColor: "white" }}>
        <CardContent>
          <Typography fontWeight="bold">
            {qidx}. {question.question}
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 1 }}>
            {question.options.map((opt, i) => (
              <li
                key={i}
                style={{
                  fontWeight: opt === question.correct_ans ? "bold" : "normal",
                  color: opt === question.correct_ans ? "green" : "inherit",
                }}
              >
                {opt}
                {opt === question.correct_ans && " (Correct)"}
              </li>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
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
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ViewQuestion;
