"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [isProctor, setIsProctor] = useState(false);
  const [user, setUser] = useState({ id: 0, name: "", email: "", role: "" });
  const [stats, setStats] = useState([0, 0]);
  const [data, setData] = useState([]);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found");

      const response = await axios.get("http://localhost:8000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data); // user info object
      setIsProctor(response.data.role === "proctor");
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      throw error;
    }
  };

  const getData = async () => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("userRole");
    try {
      const res = await axios.get("http://localhost:8000/api/exam/view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data.exams);
    } catch (error) {
      console.error("Error fetching exams:", error);

      // if (role === "proctor") {
    }
  };

  useEffect(() => {
    getData();
    fetchUserInfo();
  }, []);

  return (
    <Box display="flex" height="100vh" bgcolor="#f9fafb">
      {/* Sidebar */}
      <Box
        width={280}
        sx={{
          //   background: "linear-gradient(180deg, #e0f7fa, #ffffff)",
          boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
        }}
        p={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            border: "3px solid #80deea",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
          src="/profile-placeholder.png"
        />
        <Typography variant="h6" fontWeight="bold">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isProctor ? "Proctor" : "Attendee"}
        </Typography>

        <Divider sx={{ my: 3, width: "100%" }} />

        <Box textAlign="center">
          {isProctor ? (
            <>
              <Typography variant="subtitle1" fontWeight="bold">
                {stats[0]}
              </Typography>
              <Typography variant="caption" display="block" mb={2}>
                Exams Scheduled
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                {stats[1]}
              </Typography>
              <Typography variant="caption" display="block">
                Upcoming Exams
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="subtitle1" fontWeight="bold">
                {stats[0]}
              </Typography>
              <Typography variant="caption" display="block" mb={2}>
                Exams Given
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                {stats[1]}
              </Typography>
              <Typography variant="caption" display="block">
                Upcoming Exams
              </Typography>
            </>
          )}
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={4}>
        <Typography variant="h5" mb={3} fontWeight="bold">
          {isProctor ? "Recently Scheduled Exams" : "Live Exams"}
        </Typography>

        <Grid container spacing={3}>
          {data.slice(0, 3).map((item, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  backgroundColor: "#ffffff",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardHeader
                  title={item.title}
                  subheader={item.date}
                  //   titleTypographyProps={{ fontWeight: "bold" }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Subject: {item.subject}
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    Duration: {item.duration} mins
                  </Typography>
                  {isProctor ? (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#26c6da",
                        "&:hover": { backgroundColor: "#00acc1" },
                      }}
                    >
                      View Details
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#66bb6a",
                        "&:hover": { backgroundColor: "#43a047" },
                      }}
                    >
                      Join Exam
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Extra Section */}
        {isProctor ? (
          <Box mt={5}>
            <Typography variant="h6" mb={2} fontWeight="bold">
              Quick Actions
            </Typography>
            <Button
              variant="outlined"
              sx={{
                mr: 2,
                borderColor: "#26c6da",
                color: "#26c6da",
                "&:hover": { borderColor: "#00acc1", color: "#00acc1" },
              }}
            >
              Create Exam
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#26c6da",
                color: "#26c6da",
                "&:hover": { borderColor: "#00acc1", color: "#00acc1" },
              }}
            >
              Manage Students
            </Button>
          </Box>
        ) : (
          <Box mt={5}>
            <Typography variant="h6" mb={2} fontWeight="bold">
              Recommended Exams
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore upcoming exams that match your interests.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
