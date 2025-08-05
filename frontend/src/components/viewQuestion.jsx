import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const ViewQuestion = ({ question, qidx, onDelete, onEdit }) => {
  return (
    <>
      <Card
        key={idx}
        variant="outlined"
        sx={{ mb: 2, backgroundColor: "white" }}
      >
        <CardContent>
          <Typography fontWeight="bold">
            {idx + 1}. {q.text}
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 1 }}>
            {q.options.map((opt, i) => (
              <li
                key={i}
                style={{
                  fontWeight: opt === q.correctOption ? "bold" : "normal",
                  color: opt === q.correctOption ? "green" : "inherit",
                }}
              >
                {opt}
                {opt === q.correctOption && " (Correct)"}
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
              onClick={() => onEdit(idx)}
              sx={{ textTransform: "none", minWidth: 0 }}
            >
              Edit
            </Button>
            <Button
              variant="text"
              color="error"
              onClick={() => onDelete(idx)}
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
