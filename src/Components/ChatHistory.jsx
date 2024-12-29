import React from "react";
import { Box, Typography } from "@mui/material";

const ChatHistory = ({ messages }) => {
  return (
    <Box
      className="bg-white"
      sx={{
        padding: { xs: 1, sm: 4 }, // Adjust padding for smaller screens
        maxHeight: '80vh', // Ensures the chat window height is responsive
        overflowY: 'scroll', // Allows scrolling for messages
      }}
    >
      {messages.map((message, index) => (
        <Box
          key={index}
          sx={{
            padding: 1,
            display: 'flex',
            justifyContent: message.type === 'sent' ? 'flex-end' : 'flex-start',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: message.type === "sent" ? "primary.main" : "text.secondary", // Color for sent and received messages
              maxWidth: '80%', // Limiting the width of the message bubble
              wordWrap: 'break-word', // Ensures long messages wrap correctly
            }}
          >
            {message.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ChatHistory;
