"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const ResultsPage = () => {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const res = await axios.get(
        "http://localhost:8000/api/exam/result/view",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <Box maxWidth="900px" mx="auto" mt={6} px={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        color="primary"
      >
        Your Exam Results
      </Typography>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              {["Title", "Subject", "Date", "Score"].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "common.white",
                    fontWeight: "bold",
                    fontSize: 16,
                    borderBottom: "none",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {results.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ py: 5, fontStyle: "italic", color: "text.secondary" }}
                >
                  No results available.
                </TableCell>
              </TableRow>
            ) : (
              results.map(({ exam_title, subject, date, score }, idx) => (
                <TableRow
                  key={`${exam_title}-${idx}`}
                  sx={{
                    bgcolor: idx % 2 === 0 ? "grey.50" : "common.white",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{exam_title}</TableCell>
                  <TableCell>{subject}</TableCell>
                  <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "bold",
                        color: "success.main",
                      }}
                    >
                      {score}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ResultsPage;
