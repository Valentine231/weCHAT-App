import React from "react";
import { Box, Typography } from "@mui/material";

const ChatHistory = ({ messages }) => {
  return (
    <Box className="bg-white p-4 max-h-80 overflow-y-scroll">
      {messages.map((message, index) => (
        <Box key={index} className={`p-2 ${message.type === "sent" ? "text-right" : ""}`}>
          <Typography
            variant="body1"
            className={message.type === "sent" ? "text-blue-500" : "text-gray-700"}
          >
            {message.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ChatHistory;
