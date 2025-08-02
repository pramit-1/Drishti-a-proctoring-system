"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/authContext";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isProctor, setIsProctor] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const { auth, setAuth } = useAuth();
  const token = auth?.token;

  const isTokenValid = () => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      return decoded.exp > now;
    } catch {
      return false;
    }
  };

  const isLoggedIn = isTokenValid();

  useEffect(() => {
    if (isLoggedIn) {
      setIsProctor(auth.role === "proctor");
    }
  }, [auth]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    setAuth({ token: null, role: null });
  };

  const navItems = isLoggedIn
    ? isProctor
      ? [
          { text: "Create Exam", href: "/create-exam" },
          { text: "Exams", href: "/exams" },
          { text: "Results", href: "/results" },
          { text: "Logout", action: handleLogout, icon: <LogoutIcon /> },
        ]
      : [
          { text: "Exams", href: "/exams" },
          { text: "Results", href: "/results" },
          { text: "Logout", action: handleLogout, icon: <LogoutIcon /> },
        ]
    : [
        { text: "Login", href: "/login" },
        { text: "Signup", href: "/signup" },
      ];

  const renderButtons = () => (
    <Box sx={{ display: "flex", gap: 2 }}>
      {navItems.map((item, idx) =>
        item.action ? (
          <Button key={idx} color="inherit" onClick={item.action}>
            {item.text}
          </Button>
        ) : (
          <Button key={idx} color="inherit" href={item.href}>
            {item.text}
          </Button>
        )
      )}
    </Box>
  );

  const renderDrawer = () => (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <Box sx={{ width: 250, mt: 2 }}>
        <List>
          {navItems.map((item, idx) => (
            <ListItem
              button
              key={idx}
              onClick={() => {
                if (item.action) item.action();
                else window.location.href = item.href;
                setDrawerOpen(false);
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 30, height: 30 }} />
            <Typography variant="h6">ExamProctor</Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              {renderDrawer()}
            </>
          ) : (
            renderButtons()
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
