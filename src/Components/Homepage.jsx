import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <Box className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        {/* Title */}
        <Typography
          variant="h2"
          className="text-blue-600 font-bold text-center mb-6"
          sx={{
            fontSize: { xs: "1.8rem", md: "3rem" },
          }}
        >
          🎉 Welcome to weChat! 🌐
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          className="text-gray-700 text-center max-w-lg mb-8"
          sx={{
            fontSize: { xs: "0.9rem", md: "1.2rem" },
          }}
        >
          Where conversations flow effortlessly, and connections spark joy! 🚀
          💬 Jump in, share your thoughts, and let the chats begin! 🗨️✨
        </Typography>

        {/* Buttons */}
        <Box
          className="flex space-x-4"
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 2, sm: 4 },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleGetStarted}
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className="hover:text-blue-500 hover:border-blue-500"
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
